import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create contact inquiry
    const inquiry = await Contact.create({
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message,
      status: 'NEW'
    });

    return NextResponse.json({ 
      message: 'Contact inquiry submitted successfully',
      inquiryId: inquiry._id 
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact inquiry' },
      { status: 500 }
    );
  }
} 