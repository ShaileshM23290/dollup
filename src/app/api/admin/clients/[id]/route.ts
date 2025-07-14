import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Booking from '@/models/Booking';
import { verifyAdminToken } from '@/lib/adminAuth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminPayload = await verifyAdminToken(request);
    if (!adminPayload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = await params;

    // Get user with detailed booking information
    const clientData = await User.aggregate([
      {
        $match: { _id: id }
      },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'userId',
          as: 'allBookings'
        }
      },
      {
        $addFields: {
          bookingStats: {
            totalBookings: { $size: '$allBookings' },
            totalSpent: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: '$allBookings',
                      cond: { $in: ['$$this.status', ['confirmed', 'completed']] }
                    }
                  },
                  as: 'booking',
                  in: '$$booking.totalAmount'
                }
              }
            },
            lastBooking: {
              $max: '$allBookings.eventDate'
            },
            completedBookings: {
              $size: {
                $filter: {
                  input: '$allBookings',
                  cond: { $eq: ['$$this.status', 'completed'] }
                }
              }
            },
            pendingBookings: {
              $size: {
                $filter: {
                  input: '$allBookings',
                  cond: { $eq: ['$$this.status', 'pending'] }
                }
              }
            },
            cancelledBookings: {
              $size: {
                $filter: {
                  input: '$allBookings',
                  cond: { $eq: ['$$this.status', 'cancelled'] }
                }
              }
            }
          },
          recentBookings: {
            $slice: [
              {
                $sortArray: {
                  input: {
                    $map: {
                      input: '$allBookings',
                      as: 'booking',
                      in: {
                        _id: '$$booking._id',
                        eventDate: '$$booking.eventDate',
                        serviceType: '$$booking.serviceType',
                        status: '$$booking.status',
                        totalAmount: '$$booking.totalAmount',
                        createdAt: '$$booking.createdAt'
                      }
                    }
                  },
                  sortBy: { eventDate: -1 }
                }
              },
              10
            ]
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
          bookingStats: 1,
          recentBookings: 1
        }
      }
    ]);

    if (!clientData || clientData.length === 0) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ client: clientData[0] });

  } catch (error) {
    console.error('Error fetching client details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client details' },
      { status: 500 }
    );
  }
} 