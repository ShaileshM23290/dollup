import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'dollup-admin-secret-key-2024';

export interface AdminPayload {
  adminId: string;
  email: string;
  role: string;
}

export async function verifyAdminToken(request: NextRequest): Promise<AdminPayload | null> {
  try {
    await connectToDatabase();

    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      return null;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;

    // Verify admin still exists and is active
    const admin = await Admin.findById(decoded.adminId);
    if (!admin || !admin.isActive) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Admin token verification error:', error);
    return null;
  }
}

export function requireAdminAuth() {
  return async (request: NextRequest) => {
    const adminPayload = await verifyAdminToken(request);
    if (!adminPayload) {
      throw new Error('Unauthorized access');
    }
    return adminPayload;
  };
}