import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get all portfolio items
    const portfolioItems = await Portfolio.find({ 
      isActive: true 
    }).sort({ featured: -1, order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      portfolio: portfolioItems
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
} 