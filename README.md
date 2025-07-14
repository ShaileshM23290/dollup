# Dollup - Professional Makeup Artist Website

A complete makeup artist business website with a comprehensive admin management system.

## Features

- **Client Website**: Portfolio showcase, service listings, booking system, contact forms
- **Admin Panel**: Complete business management with dashboard, bookings, messages, portfolio, and analytics
- **Database**: MongoDB with Mongoose ODM for data persistence
- **Authentication**: Secure admin authentication with JWT tokens

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd dollup
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file with:
```env
MONGODB_URI=mongodb://localhost:27017/dollup
JWT_SECRET=your-jwt-secret-key
```

3. **Seed the database:**
```bash
npm run seed
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Access the website:**
- **Client Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  - Email: `admin@dollup.com`
  - Password: `dollup123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## Admin System

The admin system provides complete business management capabilities:

- **Dashboard**: Overview statistics and recent activity
- **Bookings**: Manage client appointments and status
- **Messages**: Handle contact form submissions
- **Portfolio**: Dynamic portfolio management
- **Services**: Service offerings and pricing
- **Analytics**: Business insights and trends

For detailed admin documentation, see [ADMIN_SETUP.md](./ADMIN_SETUP.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
