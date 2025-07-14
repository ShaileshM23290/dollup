import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface CustomerPayload {
  customerId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer';
}

export function generateCustomerToken(payload: CustomerPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyCustomerToken(token: string): CustomerPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CustomerPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function verifyCustomerTokenFromRequest(request: NextRequest): Promise<CustomerPayload | null> {
  try {
    // Try to get token from Authorization header first
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      return verifyCustomerToken(token);
    }

    // Fallback to cookie
    const token = request.cookies.get('customer-token')?.value;
    if (!token) {
      return null;
    }

    return verifyCustomerToken(token);
  } catch (error) {
    console.error('Token verification from request failed:', error);
    return null;
  }
} 