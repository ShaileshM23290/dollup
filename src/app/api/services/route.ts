import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get all active services
    const services = await Service.find({ 
      isActive: true 
    }).sort({ isPopular: -1, order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      services: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
} 