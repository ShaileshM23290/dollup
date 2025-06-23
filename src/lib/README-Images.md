# Image Management System

This file documents the global image management system for the Dollup makeup artist website.

## Overview

The image system is designed to easily switch between static (Unsplash) images and dynamic (database) images without changing component code throughout the application.

## Configuration

### Static Mode (Current)
```typescript
const USE_DYNAMIC_IMAGES = false; // In src/lib/images.ts
```

### Dynamic Mode (Future)
```typescript
const USE_DYNAMIC_IMAGES = true; // In src/lib/images.ts
```

## Available Functions

### Main Image Getters
- `getHeroImage()` - Get main hero/banner image
- `getServiceImages()` - Get all service-related images
- `getPortfolioImages(category?)` - Get portfolio images, optionally filtered by category
- `getTestimonialImages()` - Get client testimonial images
- `getAboutImages()` - Get about page images (artist profile, workspace)

### Utility Functions
- `getImageByServiceType(serviceType)` - Find service image by type
- `getTestimonialImageByClient(clientName)` - Find testimonial image by client name

## Usage Examples

### In Server Components
```typescript
import { getPortfolioImages, getServiceImages } from '@/lib/images';

export default async function MyPage() {
  const portfolioImages = await getPortfolioImages();
  const serviceImages = await getServiceImages();
  
  return (
    <div>
      {portfolioImages.map(image => (
        <Image key={image.id} src={image.url} alt={image.alt} />
      ))}
    </div>
  );
}
```

### In Client Components
```typescript
"use client";
import { useEffect, useState } from 'react';
import { getPortfolioImages, PortfolioImage } from '@/lib/images';

export default function MyClientComponent() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  
  useEffect(() => {
    getPortfolioImages().then(setImages);
  }, []);
  
  return (
    <div>
      {images.map(image => (
        <Image key={image.id} src={image.url} alt={image.alt} />
      ))}
    </div>
  );
}
```

## Image Categories

### Portfolio Categories
- `bridal` - Wedding and bridal makeup
- `party` - Party and celebration makeup
- `editorial` - Fashion and editorial shoots
- `natural` - Natural and everyday looks
- `glam` - Glamorous evening makeup

### Service Types
- `bridal` - Bridal makeup services
- `party` - Party makeup services
- `editorial` - Editorial makeup services
- `natural` - Natural makeup services

## Current Static Images (Unsplash)

All current images are sourced from Unsplash with appropriate makeup/beauty themes:

- **Hero Image**: Professional makeup application
- **Service Images**: Category-specific makeup looks
- **Portfolio Images**: Diverse makeup styles and categories
- **Testimonial Images**: Professional headshots for client testimonials
- **About Images**: Artist workspace and professional photos

## Switching to Dynamic Images

### 1. Database Setup
First, create image tables in your database with these fields:
```sql
CREATE TABLE images (
  id VARCHAR PRIMARY KEY,
  url VARCHAR NOT NULL,
  alt VARCHAR NOT NULL,
  title VARCHAR,
  category VARCHAR,
  image_type ENUM('hero', 'service', 'portfolio', 'testimonial', 'about'),
  service_type VARCHAR, -- for service images
  client_name VARCHAR, -- for testimonial images
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Update fetchDynamicImages Function
Modify the `fetchDynamicImages()` function in `src/lib/images.ts`:

```typescript
async function fetchDynamicImages() {
  // Connect to your database and fetch images
  const images = await db.images.findMany();
  
  return {
    hero: images.find(img => img.image_type === 'hero'),
    services: images.filter(img => img.image_type === 'service'),
    portfolio: images.filter(img => img.image_type === 'portfolio'),
    testimonials: images.filter(img => img.image_type === 'testimonial'),
    about: {
      artist: images.find(img => img.image_type === 'about' && img.category === 'artist'),
      workspace: images.find(img => img.image_type === 'about' && img.category === 'workspace')
    }
  };
}
```

### 3. Enable Dynamic Mode
Change the configuration:
```typescript
const USE_DYNAMIC_IMAGES = true;
```

### 4. Add Image Management
Create admin interface to:
- Upload new images
- Categorize images
- Manage image metadata
- Organize portfolio collections

## File Structure

```
src/lib/
├── images.ts              # Main image configuration
└── README-Images.md       # This documentation

Components using images:
├── src/app/page.tsx       # Homepage with portfolio preview
├── src/app/portfolio/     # Portfolio page
├── src/app/services/      # Services page
├── src/app/about/         # About page
└── src/app/components/    # Shared components
```

## Best Practices

1. **Always use the getter functions** instead of accessing `STATIC_IMAGES` directly
2. **Include proper alt text** for accessibility
3. **Use appropriate image sizes** with Unsplash URL parameters
4. **Cache images** when possible to improve performance
5. **Test both static and dynamic modes** before deployment
6. **Maintain fallbacks** - dynamic functions fall back to static if no dynamic images available

## Migration Checklist

When switching to dynamic images:

- [ ] Set up database tables
- [ ] Implement `fetchDynamicImages()` function
- [ ] Upload initial image set to database
- [ ] Test all pages with dynamic images
- [ ] Create image management interface
- [ ] Set `USE_DYNAMIC_IMAGES = true`
- [ ] Deploy and verify all images load correctly
- [ ] Remove Unsplash dependencies if desired

## TypeScript Interfaces

```typescript
interface ImageData {
  id: string;
  url: string;
  alt: string;
  title?: string;
  category?: string;
}

interface ServiceImage extends ImageData {
  serviceType: string;
}

interface PortfolioImage extends ImageData {
  category: 'bridal' | 'party' | 'editorial' | 'natural' | 'glam';
  beforeAfter?: {
    before: string;
    after: string;
  };
}

interface TestimonialImage extends ImageData {
  clientName: string;
}
```

This system provides a clean separation between static mock data and dynamic database content, making it easy to develop with mock data and switch to real data when ready.