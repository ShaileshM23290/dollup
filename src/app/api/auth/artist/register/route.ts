import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import Artist from '@/models/Artist';
import { generateArtistToken } from '@/lib/artistAuth';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      password, 
      bio, 
      experience, 
      specializations, 
      location 
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if artist already exists
    const existingArtist = await Artist.findOne({ email: email.toLowerCase() });
    if (existingArtist) {
      return NextResponse.json(
        { error: 'Artist already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new artist
    const newArtist = await Artist.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      password: hashedPassword,
      bio: bio?.trim() || '',
      experience: experience || 0,
      specializations: specializations || [],
      location: location?.trim() || '',
      role: 'artist',
      isActive: true,
      isApproved: false // Artists need admin approval
    });

    // Generate JWT token
    const tokenPayload = {
      artistId: newArtist._id.toString(),
      email: newArtist.email,
      firstName: newArtist.firstName,
      lastName: newArtist.lastName,
      role: 'artist' as const
    };

    const token = generateArtistToken(tokenPayload);

    // Create response with artist data (excluding password)
    const artistData = {
      id: newArtist._id,
      firstName: newArtist.firstName,
      lastName: newArtist.lastName,
      email: newArtist.email,
      phone: newArtist.phone,
      bio: newArtist.bio,
      experience: newArtist.experience,
      specializations: newArtist.specializations,
      location: newArtist.location,
      role: newArtist.role,
      isActive: newArtist.isActive,
      isApproved: newArtist.isApproved,
      createdAt: newArtist.createdAt
    };

    // Set HTTP-only cookie
    const response = NextResponse.json({
      message: 'Artist registration successful. Your account is pending approval.',
      artist: artistData,
      token
    }, { status: 201 });

    response.cookies.set('artist-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Artist registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 