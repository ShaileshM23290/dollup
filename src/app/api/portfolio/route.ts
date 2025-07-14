import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Artist } from '@/models/Artist';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get all approved artists and their portfolio items
    const artists = await Artist.find({ 
      isApproved: true,
      'portfolio.0': { $exists: true } // Only artists with portfolio items
    }).select('portfolio name');

    // Flatten all portfolio items from all artists
    const allPortfolioItems = artists.flatMap(artist => 
      artist.portfolio.map(item => ({
        _id: item._id,
        title: item.title,
        imageUrl: item.imageUrl,
        category: item.category,
        description: item.description,
        isFeatured: item.isFeatured || false,
        artistName: artist.name,
        artistId: artist._id
      }))
    );

    return NextResponse.json({
      success: true,
      portfolio: allPortfolioItems
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
} 