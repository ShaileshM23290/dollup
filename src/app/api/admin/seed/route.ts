import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST() {
  try {
    await connectToDatabase();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@dollup.com' });
    
    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin user already exists',
        admin: {
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role
        }
      });
    }

    // Create admin user
    const admin = new Admin({
      email: 'admin@dollup.com',
      password: 'dollup123',
      name: 'Dollup Admin',
      role: 'super_admin'
    });

    await admin.save();

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin seed error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
} 