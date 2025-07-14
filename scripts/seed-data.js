const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dollup';

const sampleData = {
  artists: [
    {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: '$2b$12$LQv3c1yqBwEHxv5sOzVAuOmm.xRjTU6MWOFHaOHZJQQfPcWnLUXW2', // password123
      phone: '9876543210',
      specialization: ['Bridal', 'Party'],
      experience: 5,
      bio: 'Professional makeup artist with 5 years of experience specializing in bridal and party makeup.',
      isApproved: true,
      isActive: true,
      portfolio: [
        {
          title: 'Elegant Bridal Look',
          imageUrl: '/api/placeholder/400/300',
          category: 'bridal',
          description: 'A stunning bridal makeup look with natural glow',
          isFeatured: true
        },
        {
          title: 'Glamorous Party Makeup',
          imageUrl: '/api/placeholder/400/300',
          category: 'party',
          description: 'Bold and glamorous party makeup',
          isFeatured: true
        }
      ],
      services: [
        {
          name: 'Bridal Makeup',
          price: 15000,
          duration: '3 hours',
          description: 'Complete bridal makeup with trial session',
          category: 'bridal',
          isPopular: true
        },
        {
          name: 'Party Makeup',
          price: 5000,
          duration: '1.5 hours',
          description: 'Glamorous party makeup for special occasions',
          category: 'party',
          isPopular: true
        }
      ],
      availability: {
        monday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] },
        tuesday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] },
        wednesday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] },
        thursday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] },
        friday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] },
        saturday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] },
        sunday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] }
      },
      rating: 4.8,
      totalBookings: 150,
      totalEarnings: 750000
    },
    {
      name: 'Anita Patel',
      email: 'anita@example.com',
      password: '$2b$12$LQv3c1yqBwEHxv5sOzVAuOmm.xRjTU6MWOFHaOHZJQQfPcWnLUXW2', // password123
      phone: '9876543211',
      specialization: ['Editorial', 'Natural'],
      experience: 3,
      bio: 'Creative makeup artist specializing in editorial and natural looks.',
      isApproved: true,
      isActive: true,
      portfolio: [
        {
          title: 'Natural Glow Makeup',
          imageUrl: '/api/placeholder/400/300',
          category: 'natural',
          description: 'Fresh and natural makeup look',
          isFeatured: true
        },
        {
          title: 'Editorial Fashion Look',
          imageUrl: '/api/placeholder/400/300',
          category: 'editorial',
          description: 'Creative editorial makeup for fashion shoots',
          isFeatured: false
        }
      ],
      services: [
        {
          name: 'Natural Makeup',
          price: 3000,
          duration: '1 hour',
          description: 'Fresh and natural makeup for everyday occasions',
          category: 'natural',
          isPopular: false
        },
        {
          name: 'Editorial Makeup',
          price: 8000,
          duration: '2 hours',
          description: 'Creative editorial makeup for photoshoots',
          category: 'editorial',
          isPopular: false
        }
      ],
      availability: {
        monday: { isAvailable: true, slots: ['11:00', '15:00'] },
        tuesday: { isAvailable: true, slots: ['11:00', '15:00'] },
        wednesday: { isAvailable: false, slots: [] },
        thursday: { isAvailable: true, slots: ['11:00', '15:00'] },
        friday: { isAvailable: true, slots: ['11:00', '15:00'] },
        saturday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] },
        sunday: { isAvailable: true, slots: ['10:00', '14:00', '18:00'] }
      },
      rating: 4.6,
      totalBookings: 80,
      totalEarnings: 320000
    }
  ],
  users: [
    {
      name: 'Kavya Reddy',
      email: 'kavya@example.com',
      password: '$2b$12$LQv3c1yqBwEHxv5sOzVAuOmm.xRjTU6MWOFHaOHZJQQfPcWnLUXW2', // password123
      phone: '9876543212',
      isVerified: true,
      preferences: {
        favoriteServices: ['Bridal Makeup', 'Party Makeup'],
        preferredArtists: []
      }
    },
    {
      name: 'Riya Singh',
      email: 'riya@example.com',
      password: '$2b$12$LQv3c1yqBwEHxv5sOzVAuOmm.xRjTU6MWOFHaOHZJQQfPcWnLUXW2', // password123
      phone: '9876543213',
      isVerified: true,
      preferences: {
        favoriteServices: ['Natural Makeup'],
        preferredArtists: []
      }
    }
  ],
  bookings: [
    {
      customerName: 'Kavya Reddy',
      customerEmail: 'kavya@example.com',
      customerPhone: '9876543212',
      service: 'Bridal Makeup',
      date: '2024-02-15',
      time: '10:00',
      amount: 15000,
      status: 'confirmed',
      paymentStatus: 'completed',
      paymentId: 'pay_sample123',
      notes: 'Wedding makeup for morning ceremony'
    },
    {
      customerName: 'Riya Singh',
      customerEmail: 'riya@example.com',
      customerPhone: '9876543213',
      service: 'Party Makeup',
      date: '2024-02-20',
      time: '18:00',
      amount: 5000,
      status: 'confirmed',
      paymentStatus: 'completed',
      paymentId: 'pay_sample124',
      notes: 'Birthday party makeup'
    }
  ],
  payments: [
    {
      bookingId: null, // Will be set after booking creation
      amount: 15000,
      currency: 'INR',
      status: 'completed',
      paymentMethod: 'card',
      razorpayOrderId: 'order_sample123',
      razorpayPaymentId: 'pay_sample123',
      customerEmail: 'kavya@example.com'
    },
    {
      bookingId: null, // Will be set after booking creation
      amount: 5000,
      currency: 'INR',
      status: 'completed',
      paymentMethod: 'upi',
      razorpayOrderId: 'order_sample124',
      razorpayPaymentId: 'pay_sample124',
      customerEmail: 'riya@example.com'
    }
  ]
};

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing data
    console.log('Clearing existing data...');
    await db.collection('artists').deleteMany({});
    await db.collection('users').deleteMany({});
    await db.collection('bookings').deleteMany({});
    await db.collection('payments').deleteMany({});
    
    // Insert artists
    console.log('Inserting artists...');
    const artistsResult = await db.collection('artists').insertMany(sampleData.artists);
    console.log(`Inserted ${artistsResult.insertedCount} artists`);
    
    // Insert users
    console.log('Inserting users...');
    const usersResult = await db.collection('users').insertMany(sampleData.users);
    console.log(`Inserted ${usersResult.insertedCount} users`);
    
    // Insert bookings
    console.log('Inserting bookings...');
    const bookingsResult = await db.collection('bookings').insertMany(sampleData.bookings);
    console.log(`Inserted ${bookingsResult.insertedCount} bookings`);
    
    // Update payments with booking IDs
    const bookingIds = Object.values(bookingsResult.insertedIds);
    sampleData.payments[0].bookingId = bookingIds[0];
    sampleData.payments[1].bookingId = bookingIds[1];
    
    // Insert payments
    console.log('Inserting payments...');
    const paymentsResult = await db.collection('payments').insertMany(sampleData.payments);
    console.log(`Inserted ${paymentsResult.insertedCount} payments`);
    
    console.log('Database seeding completed successfully!');
    
    // Display summary
    console.log('\n--- SEEDING SUMMARY ---');
    console.log(`Artists: ${artistsResult.insertedCount}`);
    console.log(`Users: ${usersResult.insertedCount}`);
    console.log(`Bookings: ${bookingsResult.insertedCount}`);
    console.log(`Payments: ${paymentsResult.insertedCount}`);
    
    console.log('\n--- SAMPLE CREDENTIALS ---');
    console.log('Artist Login:');
    console.log('  Email: priya@example.com');
    console.log('  Password: password123');
    console.log('');
    console.log('Customer Login:');
    console.log('  Email: kavya@example.com');
    console.log('  Password: password123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

// Run the seeding script
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleData }; 