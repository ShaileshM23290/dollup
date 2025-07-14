import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Artist from '@/models/Artist';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get token from Authorization header or cookies
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7)
      : request.cookies.get('artist-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Find artist by ID
    const artist = await Artist.findById(decoded.artistId);
    
    if (!artist) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    // Check if artist is active
    if (!artist.isActive) {
      return NextResponse.json(
        { error: 'Account deactivated' },
        { status: 401 }
      );
    }

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

    return NextResponse.json({
      valid: true,
      artist: artistData
    });

  } catch (error) {
    console.error('Artist verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during verification' },
      { status: 500 }
    );
  }
} 