import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface ArtistPayload {
  artistId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'artist';
}

export function generateArtistToken(payload: ArtistPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyArtistToken(token: string): ArtistPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as ArtistPayload;
    return decoded;
  } catch (error) {
    console.error('Artist token verification failed:', error);
    return null;
  }
}

export async function verifyArtistTokenFromRequest(request: NextRequest): Promise<ArtistPayload | null> {
  try {
    // Try to get token from Authorization header first
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      return verifyArtistToken(token);
    }

    // Fallback to cookie
    const token = request.cookies.get('artist-token')?.value;
    if (!token) {
      return null;
    }

    return verifyArtistToken(token);
  } catch (error) {
    console.error('Artist token verification from request failed:', error);
    return null;
  }
} 