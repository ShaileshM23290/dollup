import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Service from '@/models/Service';
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
    const popular = searchParams.get('popular');
    const sortBy = searchParams.get('sortBy') || 'order';
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? -1 : 1;

    // Build filter
    const filter: Record<string, string | boolean> = { isActive: true };
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (popular === 'true') {
      filter.isPopular = true;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get services with pagination
    const services = await Service.find(filter)
      .sort({ [sortBy]: sortOrder, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Service.countDocuments(filter);

    // Calculate summary stats
    const stats = await Service.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          popular: { $sum: { $cond: ['$isPopular', 1, 0] } },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);

    return NextResponse.json({
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats
    });

  } catch (error) {
    console.error('Admin services fetch error:', error);
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
      name,
      description,
      shortDescription,
      category,
      price,
      duration,
      imageUrl,
      imageAlt,
      features,
      addOns,
      isPopular,
      order
    } = body;

    if (!name || !description || !shortDescription || !category || !price || !duration || !imageUrl) {
      return NextResponse.json(
        { error: 'Name, description, short description, category, price, duration, and image URL are required' },
        { status: 400 }
      );
    }

    const service = new Service({
      name,
      description,
      shortDescription,
      category,
      price,
      duration,
      imageUrl,
      imageAlt: imageAlt || '',
      features: features || [],
      addOns: addOns || [],
      isPopular: isPopular || false,
      order: order || 0
    });

    await service.save();

    return NextResponse.json({
      success: true,
      service
    });

  } catch (error) {
    console.error('Admin service create error:', error);
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
    const { serviceId, ...updateData } = body;

    if (!serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      );
    }

    const service = await Service.findByIdAndUpdate(
      serviceId,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service
    });

  } catch (error) {
    console.error('Admin service update error:', error);
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
    const serviceId = searchParams.get('id');

    if (!serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      );
    }

    // Soft delete by setting isActive to false
    const service = await Service.findByIdAndUpdate(
      serviceId,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('Admin service delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 