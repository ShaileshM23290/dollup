import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
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
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: 'NEW'
      }
    });

    return NextResponse.json({ 
      message: 'Contact inquiry submitted successfully',
      inquiryId: inquiry.id 
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact inquiry' },
      { status: 500 }
    );
  }
} 