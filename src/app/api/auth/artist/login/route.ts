import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Artist from '@/models/Artist';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find artist by email and include password for verification
    const artist = await Artist.findOne({ email }).select('+password');
    
    if (!artist) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if artist is active
    if (!artist.isActive) {
      return NextResponse.json(
        { error: 'Your account has been deactivated. Please contact support.' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, artist.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    artist.lastLogin = new Date();
    await artist.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        artistId: artist._id,
        email: artist.email,
        role: artist.role,
        isApproved: artist.isApproved
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Prepare artist data (exclude password)
    const artistData = {
      _id: artist._id,
      email: artist.email,
      firstName: artist.firstName,
      lastName: artist.lastName,
      phone: artist.phone,
      role: artist.role,
      isActive: artist.isActive,
      isApproved: artist.isApproved,
      profileImage: artist.profileImage,
      bio: artist.bio,
      experience: artist.experience,
      specializations: artist.specializations,
      location: artist.location,
      averageRating: artist.averageRating,
      totalBookings: artist.totalBookings,
      totalEarnings: artist.totalEarnings,
      createdAt: artist.createdAt,
      updatedAt: artist.updatedAt
    };

    const response = NextResponse.json({
      message: 'Login successful',
      artist: artistData,
      token
    });

    // Set HTTP-only cookie
    response.cookies.set('artist-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Artist login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 