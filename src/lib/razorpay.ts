import Razorpay from 'razorpay';
import crypto from 'crypto';

// Lazy initialize Razorpay instance
let razorpay: Razorpay | null = null;

function getRazorpayInstance(): Razorpay {
  if (!razorpay) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay configuration is missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
    }
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
}

export interface PaymentOrderData {
  amount: number; // in paise (multiply by 100)
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function createPaymentOrder(orderData: PaymentOrderData) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const order = await razorpayInstance.orders.create({
      amount: orderData.amount,
      currency: orderData.currency,
      receipt: orderData.receipt,
      notes: orderData.notes,
    });

    return {
      success: true,
      order,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create payment order',
    };
  }
}

export function verifyPaymentSignature(verificationData: PaymentVerificationData): boolean {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verificationData;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest('hex');

    return expectedSignature === razorpay_signature;
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    return false;
  }
}

export async function fetchPaymentDetails(paymentId: string) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const payment = await razorpayInstance.payments.fetch(paymentId);
    return {
      success: true,
      payment,
    };
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch payment details',
    };
  }
}

export async function refundPayment(paymentId: string, amount?: number) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const refund = await razorpayInstance.payments.refund(paymentId, {
      amount: amount, // If amount is not provided, full refund
    });

    return {
      success: true,
      refund,
    };
  } catch (error) {
    console.error('Error processing refund:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process refund',
    };
  }
}

export default getRazorpayInstance; 