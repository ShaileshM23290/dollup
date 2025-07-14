import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Artist } from '@/models/Artist';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get all approved artists and their services
    const artists = await Artist.find({ 
      isApproved: true,
      'services.0': { $exists: true } // Only artists with services
    }).select('services name');

    // Flatten all services from all artists
    const allServices = artists.flatMap(artist => 
      artist.services.map(service => ({
        _id: service._id,
        name: service.name,
        price: service.price,
        duration: service.duration,
        description: service.description,
        category: service.category,
        isPopular: service.isPopular || false,
        artistName: artist.name,
        artistId: artist._id
      }))
    );

    // Remove duplicates based on service name and get unique services
    const uniqueServices = allServices.reduce((acc, current) => {
      const existingService = acc.find(service => 
        service.name.toLowerCase() === current.name.toLowerCase()
      );
      
      if (!existingService) {
        acc.push(current);
      } else {
        // If service exists, keep the one with lower price
        if (current.price < existingService.price) {
          const index = acc.findIndex(service => 
            service.name.toLowerCase() === current.name.toLowerCase()
          );
          acc[index] = current;
        }
      }
      
      return acc;
    }, [] as typeof allServices);

    // Sort by popularity and price
    uniqueServices.sort((a, b) => {
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return a.price - b.price;
    });

    return NextResponse.json({
      success: true,
      services: uniqueServices
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
} 