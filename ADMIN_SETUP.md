# Dollup Admin System Setup

## Overview
The Dollup admin system provides complete management capabilities for the makeup artist website including bookings, messages, portfolio, services, and analytics.

## Admin Credentials
- **Email**: `admin@dollup.com`
- **Password**: `dollup123`

## Setup Instructions

### 1. Seed Initial Data
Before using the admin system, you need to seed the database with the admin user and sample data:

**Option 1: Using the seed command (Recommended)**
```bash
npm run seed
```

**Option 2: Using the admin interface (after logging in)**
1. Start the development server: `npm run dev`
2. Login to admin panel: `/admin/login`
3. Navigate to the admin settings: `/admin/settings`
4. Go to the "Data Management" tab
5. Click "Seed Sample Data" to populate the database

### 2. Admin Features

#### Dashboard (`/admin/dashboard`)
- Overview statistics and metrics
- Recent bookings and messages
- Quick action buttons
- Revenue tracking

#### Bookings Management (`/admin/bookings`)
- View all bookings with pagination
- Filter by status (pending, confirmed, completed, cancelled)
- Update booking status
- View detailed booking information
- Delete bookings

#### Messages Management (`/admin/messages`)
- View contact form submissions
- Mark messages as read/replied
- Filter by status
- Reply via email integration
- Delete messages

#### Portfolio Management (`/admin/portfolio`)
- Add new portfolio items
- Edit existing portfolio pieces
- Organize by categories
- Set featured items
- Manage image galleries

#### Services Management (`/admin/services`)
- Create and edit service offerings
- Set pricing and duration
- Manage service categories
- Add service features and add-ons
- Mark popular services

#### Analytics (`/admin/analytics`)
- Revenue analytics and trends
- Service popularity metrics
- Customer acquisition data
- Booking conversion rates
- Monthly/yearly comparisons

#### Settings (`/admin/settings`)
- General business settings
- Admin profile management
- Website configuration
- Data management tools

## Database Models

### Admin Authentication
- JWT-based authentication with HTTP-only cookies
- BCrypt password hashing
- Role-based access control

### Core Models
- **Admin**: Admin user accounts
- **Portfolio**: Portfolio image management
- **Service**: Service offerings and pricing
- **Booking**: Customer booking requests
- **Contact**: Contact form submissions
- **User**: Customer profiles

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `GET /api/admin/auth/verify` - Verify admin session

### Management APIs
- `/api/admin/bookings` - Booking CRUD operations
- `/api/admin/messages` - Message management
- `/api/admin/portfolio` - Portfolio management
- `/api/admin/services` - Service management
- `/api/admin/analytics` - Business analytics

### Utilities
- `POST /api/admin/seed-data` - Seed sample data

## Security Features
- Protected routes with admin authentication
- JWT tokens with expiration
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Input validation and sanitization

## Technology Stack
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **UI Components**: Lucide React icons, custom components

## Getting Started
1. Ensure MongoDB is running
2. Install dependencies: `npm install`
3. Seed the database: `npm run seed`
4. Start development server: `npm run dev`
5. Navigate to `/admin/login`
6. Use the provided credentials to log in
7. Explore all admin features

The admin system is fully functional and ready for production use with proper environment configuration. 