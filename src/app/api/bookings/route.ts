import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      eventDate,
      eventTime,
      serviceType,
      eventType,
      location,
      numberOfPeople,
      additionalServices,
      specialRequests,
      howDidYouHear,
      budget
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !eventDate || !serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create user if doesn't exist
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        firstName,
        lastName,
        phone
      });
    }

    // Create booking
    const booking = await Booking.create({
      userId: user._id,
      eventDate: new Date(eventDate),
      eventTime,
      serviceType,
      eventType,
      location,
      numberOfPeople: parseInt(numberOfPeople) || 1,
      additionalServices: additionalServices || [],
      specialRequests,
      howDidYouHear,
      budget: budget ? parseFloat(budget) : null,
      status: 'PENDING'
    });

    return NextResponse.json({ 
      message: 'Booking created successfully',
      bookingId: booking._id 
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const bookings = await Booking.find({ userId: user._id })
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings });

  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
} 