import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { verifyAdminToken } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const adminPayload = await verifyAdminToken(request);
    if (!adminPayload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const sortBy = searchParams.get('sortBy') || 'order';
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? -1 : 1;

    // Build filter
    const filter: Record<string, string | boolean> = { isActive: true };
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.featured = true;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get portfolio items with pagination
    const portfolioItems = await Portfolio.find(filter)
      .sort({ [sortBy]: sortOrder, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Portfolio.countDocuments(filter);

    // Calculate summary stats
    const stats = await Portfolio.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          featured: { $sum: { $cond: ['$featured', 1, 0] } }
        }
      }
    ]);

    return NextResponse.json({
      portfolioItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats
    });

  } catch (error) {
    console.error('Admin portfolio fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminPayload = await verifyAdminToken(request);
    if (!adminPayload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const {
      title,
      description,
      category,
      imageUrl,
      imageAlt,
      tags,
      featured,
      order,
      metadata
    } = body;

    if (!title || !description || !category || !imageUrl) {
      return NextResponse.json(
        { error: 'Title, description, category, and image URL are required' },
        { status: 400 }
      );
    }

    const portfolioItem = new Portfolio({
      title,
      description,
      category,
      imageUrl,
      imageAlt: imageAlt || '',
      tags: tags || [],
      featured: featured || false,
      order: order || 0,
      metadata: metadata || {}
    });

    await portfolioItem.save();

    return NextResponse.json({
      success: true,
      portfolioItem
    });

  } catch (error) {
    console.error('Admin portfolio create error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminPayload = await verifyAdminToken(request);
    if (!adminPayload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { portfolioId, ...updateData } = body;

    if (!portfolioId) {
      return NextResponse.json(
        { error: 'Portfolio ID is required' },
        { status: 400 }
      );
    }

    const portfolioItem = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      portfolioItem
    });

  } catch (error) {
    console.error('Admin portfolio update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const adminPayload = await verifyAdminToken(request);
    if (!adminPayload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get('id');

    if (!portfolioId) {
      return NextResponse.json(
        { error: 'Portfolio ID is required' },
        { status: 400 }
      );
    }

    // Soft delete by setting isActive to false
    const portfolioItem = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });

  } catch (error) {
    console.error('Admin portfolio delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 