# Dollup - Makeup Artist Website Setup Guide

## Overview
Dollup is a comprehensive makeup artist booking platform built with Next.js, MongoDB, and Razorpay integration. This guide will help you set up the application for development and production.

## Features Implemented
- ✅ Customer authentication and dashboard
- ✅ Artist authentication and dashboard  
- ✅ Razorpay payment integration
- ✅ Email notification system
- ✅ Booking management system
- ✅ Portfolio and services management
- ✅ Chatbot integration
- ✅ Admin panel functionality
- ✅ Responsive design with Tailwind CSS

## Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Razorpay account for payment processing
- Email account for SMTP (Gmail recommended)

## Installation

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd dollup
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/dollup

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development

# Admin Configuration
ADMIN_EMAIL=admin@dollup.com
ADMIN_PASSWORD=admin123
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use the connection string: `mongodb://localhost:27017/dollup`

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env.local`

### 4. Razorpay Setup
1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API keys from the dashboard
3. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env.local`

### 5. Email Configuration
For Gmail SMTP:
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password
3. Use your email and app password in the environment variables

### 6. Seed Sample Data (Optional)
To populate the database with sample data for testing:

```bash
node scripts/seed-data.js
```

This will create sample artists, customers, bookings, and payments.

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Sample Credentials (After Seeding)

### Artist Login
- Email: `priya@example.com`
- Password: `password123`

### Customer Login
- Email: `kavya@example.com`
- Password: `password123`

### Admin Access
- Email: `admin@dollup.com`
- Password: `admin123`

## Application Structure

```
dollup/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Customer dashboard
│   │   ├── artist/            # Artist pages
│   │   └── components/        # Shared components
│   ├── components/            # Reusable components
│   ├── lib/                   # Utility functions
│   └── models/                # Database models
├── scripts/                   # Database seeding scripts
└── public/                    # Static assets
```

## Key Features

### Customer Features
- User registration and authentication
- Service browsing and selection
- Appointment booking with payment
- Dashboard with booking history
- Profile management

### Artist Features
- Artist registration and profile setup
- Portfolio management
- Service and pricing configuration
- Booking management
- Earnings tracking
- Availability management

### Admin Features
- Artist approval system
- Booking oversight
- Payment tracking
- User management

### Payment Integration
- Razorpay payment gateway
- Secure payment processing
- Payment status tracking
- Refund management

### Email Notifications
- Booking confirmations
- Artist notifications
- Account approvals
- Contact form responses

### Chatbot
- Automated customer support
- Service information
- Booking assistance
- Contact details

## API Endpoints

### Authentication
- `POST /api/auth/register` - Customer registration
- `POST /api/auth/login` - Customer login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/artist/register` - Artist registration
- `POST /api/auth/artist/login` - Artist login

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/[id]` - Update booking

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment

### Services & Portfolio
- `GET /api/services` - Get all services
- `GET /api/portfolio` - Get portfolio items

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MongoDB is running
   - Verify connection string in `.env.local`
   - Ensure network access for MongoDB Atlas

2. **Payment Integration Issues**
   - Verify Razorpay credentials
   - Check webhook configuration
   - Ensure proper error handling

3. **Email Not Sending**
   - Check SMTP credentials
   - Verify app password for Gmail
   - Check firewall settings

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear browser cookies

## Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment
1. Build the application: `npm run build`
2. Upload to your server
3. Set up environment variables
4. Start with PM2 or similar process manager

## Security Considerations

- Use strong JWT secrets
- Enable HTTPS in production
- Validate all user inputs
- Use environment variables for sensitive data
- Regular security updates

## Support

For issues and questions:
- Email: i.priyanka.m.16@gmail.com
- Phone: +91 77096 16260

## License

This project is proprietary to Dollup Makeup Artist Website.
© 2024 All Rights Reserved 