require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const connectToDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dollup';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  name: { type: String, required: true, trim: true },
  role: { type: String, enum: ['admin', 'super_admin'], default: 'admin' },
  lastLogin: { type: Date, default: null },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['bridal', 'party', 'editorial', 'natural', 'special-events'] },
  imageUrl: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  tags: [{ type: String, trim: true }],
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  metadata: {
    client: String,
    location: String,
    photographer: String,
    date: Date
  }
}, { timestamps: true });

// Service Schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['bridal', 'party', 'editorial', 'natural', 'special-events'] },
  price: { type: Number, required: true, min: 0 },
  duration: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  features: [{ type: String, trim: true }],
  addOns: [{
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true }
  }],
  isPopular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true }
}, { timestamps: true });

// Booking Schema
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  serviceType: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  totalAmount: { type: Number, required: true, min: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  adminNotes: { type: String, default: '' }
}, { timestamps: true });

// Create models
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

const seedData = async () => {
  try {
    console.log('🌱 Starting data seeding...');

    // Create admin user
    const existingAdmin = await Admin.findOne({ email: 'admin@dollup.com' });
    if (!existingAdmin) {
      const admin = new Admin({
        email: 'admin@dollup.com',
        password: 'dollup123',
        name: 'Dollup Admin',
        role: 'super_admin'
      });
      await admin.save();
      console.log('✅ Admin user created (admin@dollup.com / dollup123)');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Seed Services
    const existingServices = await Service.countDocuments();
    if (existingServices === 0) {
      const services = [
        {
          name: 'Bridal Makeup',
          description: 'Complete bridal makeup with trial session, including airbrush foundation, contouring, highlighting, and long-lasting finish.',
          shortDescription: 'Perfect bridal look with trial session',
          category: 'bridal',
          price: 15000,
          duration: '3-4 hours',
          imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0d8e1e8a6e9?w=500',
          features: ['Trial session included', 'Airbrush foundation', 'Long-lasting', 'Touch-up kit'],
          addOns: [
            { name: 'Hair styling', price: 5000, description: 'Professional bridal hair styling' },
            { name: 'Saree draping', price: 2000, description: 'Traditional saree draping' }
          ],
          isPopular: true,
          order: 1
        },
        {
          name: 'Party Makeup',
          description: 'Glamorous party makeup perfect for special occasions and celebrations.',
          shortDescription: 'Glamorous look for parties and events',
          category: 'party',
          price: 8000,
          duration: '2-3 hours',
          imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=500',
          features: ['HD makeup', 'Smokey eyes', 'Contouring', 'Highlighting'],
          addOns: [
            { name: 'Eyelashes', price: 1000, description: 'Premium false eyelashes' }
          ],
          isPopular: true,
          order: 2
        },
        {
          name: 'Photoshoot Makeup',
          description: 'Professional makeup designed specifically for photography and camera work.',
          shortDescription: 'Camera-ready professional makeup',
          category: 'editorial',
          price: 12000,
          duration: '2-3 hours',
          imageUrl: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=500',
          features: ['HD makeup', 'Camera-ready', 'Professional products', 'Touch-ups included'],
          addOns: [],
          isPopular: false,
          order: 3
        },
        {
          name: 'Natural Everyday Look',
          description: 'Subtle and natural makeup for everyday wear or casual events.',
          shortDescription: 'Fresh and natural everyday makeup',
          category: 'natural',
          price: 5000,
          duration: '1-2 hours',
          imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
          features: ['Natural finish', 'Skin-friendly products', 'Long-lasting', 'Subtle enhancement'],
          addOns: [],
          isPopular: false,
          order: 4
        }
      ];

      await Service.insertMany(services);
      console.log('✅ Services seeded (4 services)');
    } else {
      console.log('ℹ️  Services already exist');
    }

    // Seed Portfolio Items
    const existingPortfolio = await Portfolio.countDocuments();
    if (existingPortfolio === 0) {
      const portfolioItems = [
        {
          title: 'Elegant Bridal Look',
          description: 'Classic bridal makeup with traditional elements and modern techniques.',
          category: 'bridal',
          imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0d8e1e8a6e9?w=800',
          tags: ['bridal', 'traditional', 'elegant'],
          featured: true,
          order: 1,
          metadata: {
            client: 'Priya Sharma',
            location: 'Mumbai',
            photographer: 'Wedding Stories',
            date: new Date('2024-01-15')
          }
        },
        {
          title: 'Glamorous Party Makeup',
          description: 'Bold and glamorous makeup perfect for evening parties and celebrations.',
          category: 'party',
          imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800',
          tags: ['party', 'glamorous', 'bold'],
          featured: true,
          order: 2,
          metadata: {
            client: 'Anita Desai',
            location: 'Delhi',
            date: new Date('2024-01-20')
          }
        },
        {
          title: 'Editorial Fashion Shoot',
          description: 'High-fashion editorial makeup for magazine photography.',
          category: 'editorial',
          imageUrl: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=800',
          tags: ['editorial', 'fashion', 'magazine'],
          featured: false,
          order: 3,
          metadata: {
            photographer: 'Fashion Focus',
            location: 'Studio, Bangalore',
            date: new Date('2024-01-25')
          }
        },
        {
          title: 'Natural Glow Look',
          description: 'Fresh and natural makeup enhancing natural beauty.',
          category: 'natural',
          imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
          tags: ['natural', 'fresh', 'minimal'],
          featured: false,
          order: 4,
          metadata: {
            client: 'Kavya Patel',
            location: 'Pune',
            date: new Date('2024-02-01')
          }
        }
      ];

      await Portfolio.insertMany(portfolioItems);
      console.log('✅ Portfolio items seeded (4 items)');
    } else {
      console.log('ℹ️  Portfolio items already exist');
    }

    // Seed Sample Users
    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
      const users = [
        {
          firstName: 'Priya',
          lastName: 'Sharma',
          email: 'priya.sharma@example.com',
          phone: '+91 9876543210'
        },
        {
          firstName: 'Anita',
          lastName: 'Desai',
          email: 'anita.desai@example.com',
          phone: '+91 9876543211'
        },
        {
          firstName: 'Kavya',
          lastName: 'Patel',
          email: 'kavya.patel@example.com',
          phone: '+91 9876543212'
        },
        {
          firstName: 'Sneha',
          lastName: 'Reddy',
          email: 'sneha.reddy@example.com',
          phone: '+91 9876543213'
        }
      ];

      const savedUsers = await User.insertMany(users);
      console.log('✅ Users seeded (4 users)');

      // Seed Sample Bookings
      const bookings = [
        {
          userId: savedUsers[0]._id,
          eventDate: new Date('2024-02-15'),
          eventTime: '10:00 AM',
          serviceType: 'Bridal Makeup',
          location: 'Client Home, Mumbai',
          status: 'confirmed',
          totalAmount: 15000,
          notes: 'Traditional Indian bridal look requested'
        },
        {
          userId: savedUsers[1]._id,
          eventDate: new Date('2024-02-20'),
          eventTime: '6:00 PM',
          serviceType: 'Party Makeup',
          location: 'Hotel Taj, Delhi',
          status: 'pending',
          totalAmount: 8000,
          notes: 'Anniversary party, gold theme'
        },
        {
          userId: savedUsers[2]._id,
          eventDate: new Date('2024-01-28'),
          eventTime: '2:00 PM',
          serviceType: 'Natural Everyday Look',
          location: 'Office, Pune',
          status: 'completed',
          totalAmount: 5000,
          notes: 'Corporate headshots'
        }
      ];

      await Booking.insertMany(bookings);
      console.log('✅ Bookings seeded (3 bookings)');
    } else {
      console.log('ℹ️  Users and bookings already exist');
    }

    // Seed Sample Contact Messages
    const existingContacts = await Contact.countDocuments();
    if (existingContacts === 0) {
      const contacts = [
        {
          name: 'Riya Agarwal',
          email: 'riya.agarwal@example.com',
          subject: 'Bridal makeup inquiry',
          message: 'Hi, I am getting married in March and would like to book a bridal makeup session. Can you please share your availability?',
          status: 'unread'
        },
        {
          name: 'Meera Singh',
          email: 'meera.singh@example.com',
          subject: 'Thank you!',
          message: 'Thank you so much for the amazing makeup you did for my sister\'s wedding. Everyone was asking about you!',
          status: 'read'
        },
        {
          name: 'Divya Kumar',
          email: 'divya.kumar@example.com',
          subject: 'Party makeup booking',
          message: 'I need party makeup for my birthday celebration next weekend. Are you available?',
          status: 'replied'
        }
      ];

      await Contact.insertMany(contacts);
      console.log('✅ Contact messages seeded (3 messages)');
    } else {
      console.log('ℹ️  Contact messages already exist');
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   👤 Admin: admin@dollup.com / dollup123');
    console.log('   💼 Services: 4 makeup services');
    console.log('   🎨 Portfolio: 4 portfolio items');
    console.log('   👥 Users: 4 sample users');
    console.log('   📅 Bookings: 3 sample bookings');
    console.log('   💬 Messages: 3 contact messages');
    console.log('\n🚀 You can now access the admin panel at: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  }
};

const main = async () => {
  await connectToDatabase();
  await seedData();
};

main().catch(console.error); 