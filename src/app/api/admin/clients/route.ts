import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Booking from '@/models/Booking';
import { verifyAdminToken } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const adminPayload = await verifyAdminToken(request);
    if (!adminPayload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Get all users with their booking statistics
    const clients = await User.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'userId',
          as: 'bookings'
        }
      },
      {
        $addFields: {
          bookingStats: {
            totalBookings: { $size: '$bookings' },
            totalSpent: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: '$bookings',
                      cond: { $in: ['$$this.status', ['confirmed', 'completed']] }
                    }
                  },
                  as: 'booking',
                  in: '$$booking.totalAmount'
                }
              }
            },
            lastBooking: {
              $max: '$bookings.eventDate'
            },
            completedBookings: {
              $size: {
                $filter: {
                  input: '$bookings',
                  cond: { $eq: ['$$this.status', 'completed'] }
                }
              }
            },
            pendingBookings: {
              $size: {
                $filter: {
                  input: '$bookings',
                  cond: { $eq: ['$$this.status', 'pending'] }
                }
              }
            },
            cancelledBookings: {
              $size: {
                $filter: {
                  input: '$bookings',
                  cond: { $eq: ['$$this.status', 'cancelled'] }
                }
              }
            }
          }
        }
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          createdAt: 1,
          updatedAt: 1,
          bookingStats: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    return NextResponse.json({ clients });

  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
} 