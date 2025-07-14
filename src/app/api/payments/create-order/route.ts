import { NextRequest, NextResponse } from 'next/server';
import { verifyCustomerTokenFromRequest } from '@/lib/customerAuth';
import { createPaymentOrder } from '@/lib/razorpay';
import connectToDatabase from '@/lib/mongodb';
import Payment from '@/models/Payment';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
  try {
    // Verify customer authentication
    const customerPayload = await verifyCustomerTokenFromRequest(request);
    if (!customerPayload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const { bookingId, amount, currency = 'INR' } = body;

    // Validate required fields
    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: 'Booking ID and amount are required' },
        { status: 400 }
      );
    }

    // Verify booking exists and belongs to customer
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if booking belongs to the authenticated customer
    if (booking.customerEmail !== customerPayload.email) {
      return NextResponse.json(
        { error: 'Unauthorized access to booking' },
        { status: 403 }
      );
    }

    // Check if payment already exists for this booking
    const existingPayment = await Payment.findOne({ 
      bookingId, 
      status: { $in: ['created', 'paid'] } 
    });

    if (existingPayment) {
      return NextResponse.json(
        { error: 'Payment already exists for this booking' },
        { status: 409 }
      );
    }

    // Create Razorpay order
    const receipt = `booking_${bookingId}_${Date.now()}`;
    const orderData = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt,
      notes: {
        bookingId: bookingId.toString(),
        customerId: customerPayload.customerId,
        service: booking.service,
        customerEmail: customerPayload.email
      }
    };

    const orderResult = await createPaymentOrder(orderData);

    if (!orderResult.success) {
      return NextResponse.json(
        { error: orderResult.error || 'Failed to create payment order' },
        { status: 500 }
      );
    }

    // Save payment record in database
    const payment = await Payment.create({
      bookingId,
      customerId: customerPayload.customerId,
      razorpayOrderId: orderResult.order.id,
      amount: amount,
      currency,
      status: 'created',
      metadata: {
        receipt,
        service: booking.service,
        bookingDate: booking.date,
        bookingTime: booking.time
      }
    });

    return NextResponse.json({
      success: true,
      order: {
        id: orderResult.order.id,
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        receipt: orderResult.order.receipt
      },
      paymentId: payment._id,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Create payment order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 