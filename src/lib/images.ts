// Image configuration for the app
// This file manages all images used throughout the application
// Switch between static (Unsplash) and dynamic (database) modes

// Configuration
const USE_DYNAMIC_IMAGES = false; // Set to true when switching to database images

// Types
export interface ImageData {
  id: string;
  url: string;
  alt: string;
  title?: string;
  category?: string;
}

export interface ServiceImage extends ImageData {
  serviceType: string;
}

export interface PortfolioImage extends ImageData {
  category: 'bridal' | 'party' | 'editorial' | 'natural' | 'glam';
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export interface TestimonialImage extends ImageData {
  clientName: string;
}

// Static Unsplash Images
const UNSPLASH_IMAGES = {
  // Hero/Banner Images
  hero: {
    id: 'hero-1',
    url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=800&fit=crop&crop=face',
    alt: 'Professional makeup artist applying makeup',
    title: 'Professional Makeup Artistry'
  },

  // Service Images
  services: [
    {
      id: 'service-bridal',
      serviceType: 'bridal',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=face',
      alt: 'Beautiful bridal makeup',
      title: 'Bridal Makeup'
    },
    {
      id: 'service-party',
      serviceType: 'party',
      url: 'https://images.unsplash.com/photo-1742749361168-8f420822951c?w=600&h=400&fit=crop&crop=face',
      alt: 'Glamorous party makeup',
      title: 'Party Makeup'
    },
    {
      id: 'service-editorial',
      serviceType: 'editorial',
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&crop=face',
      alt: 'Editorial makeup look',
      title: 'Editorial Makeup'
    },
    {
      id: 'service-natural',
      serviceType: 'natural',
      url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop&crop=face',
      alt: 'Natural everyday makeup',
      title: 'Natural Makeup'
    }
  ] as ServiceImage[],

  // Portfolio Images
  portfolio: [
    // Bridal
    {
      id: 'portfolio-bridal-1',
      category: 'bridal' as const,
      url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&h=600&fit=crop&crop=face',
      alt: 'Elegant bridal makeup look',
      title: 'Classic Bridal Elegance'
    },
    {
      id: 'portfolio-bridal-2',
      category: 'bridal' as const,
      url: 'https://images.unsplash.com/photo-1684868265714-fd2300637c23?w=500&h=600&fit=crop&crop=face',
      alt: 'Romantic bridal makeup',
      title: 'Romantic Bridal Look'
    },
    {
      id: 'portfolio-bridal-3',
      category: 'bridal' as const,
      url: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=500&h=600&fit=crop&crop=face',
      alt: 'Modern bridal makeup',
      title: 'Modern Bridal Style'
    },

    // Party/Glam
    {
      id: 'portfolio-glam-1',
      category: 'glam' as const,
      url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&h=600&fit=crop&crop=face',
      alt: 'Glamorous evening makeup',
      title: 'Evening Glamour'
    },
    {
      id: 'portfolio-glam-2',
      category: 'glam' as const,
      url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=500&h=600&fit=crop&crop=face',
      alt: 'Bold party makeup',
      title: 'Bold & Beautiful'
    },
    {
      id: 'portfolio-party-1',
      category: 'party' as const,
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop&crop=face',
      alt: 'Festive party makeup',
      title: 'Party Perfect'
    },

    // Editorial
    {
      id: 'portfolio-editorial-1',
      category: 'editorial' as const,
      url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=600&fit=crop&crop=face',
      alt: 'Artistic editorial makeup',
      title: 'Editorial Artistry'
    },
    {
      id: 'portfolio-editorial-2',
      category: 'editorial' as const,
      url: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=500&h=600&fit=crop&crop=face',
      alt: 'Creative editorial look',
      title: 'Creative Expression'
    },

    // Natural
    {
      id: 'portfolio-natural-1',
      category: 'natural' as const,
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop&crop=face',
      alt: 'Natural glowing makeup',
      title: 'Natural Glow'
    },
    {
      id: 'portfolio-natural-2',
      category: 'natural' as const,
      url: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=500&h=600&fit=crop&crop=face',
      alt: 'Fresh natural makeup',
      title: 'Fresh & Natural'
    }
  ] as PortfolioImage[],

  // Testimonial Images (Client Photos)
  testimonials: [
    {
      id: 'client-1',
      clientName: 'Sarah Johnson',
      url: 'https://images.unsplash.com/photo-1637009981125-89e30d29a627?w=100&h=100&fit=crop&crop=face',
      alt: 'Sarah Johnson client photo',
      title: 'Happy Client'
    },
    {
      id: 'client-2',
      clientName: 'Emily Chen',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      alt: 'Emily Chen client photo',
      title: 'Satisfied Customer'
    },
    {
      id: 'client-3',
      clientName: 'Maria Rodriguez',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      alt: 'Maria Rodriguez client photo',
      title: 'Delighted Client'
    },
    {
      id: 'client-4',
      clientName: 'Jessica Williams',
      url: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      alt: 'Jessica Williams client photo',
      title: 'Happy Bride'
    }
  ] as TestimonialImage[],

  // About Page Images
  about: {
    artist: {
      id: 'artist-main',
      url: 'https://images.unsplash.com/photo-1623266234129-85502dd54c95?w=400&h=500&fit=crop&crop=face',
      alt: 'Professional makeup artist at work',
      title: 'Dollup Makeup Artist'
    },
    workspace: {
      id: 'workspace',
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      alt: 'Professional makeup studio workspace',
      title: 'Our Professional Studio'
    },
    process: {
      id: 'process',
      url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
      alt: 'Makeup application process',
      title: 'Professional Application Process'
    }
  },

  // Contact Page Images
  contact: {
    hero: {
      id: 'contact-hero',
      url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&h=600&fit=crop&crop=face',
      alt: 'Beautiful makeup consultation',
      title: 'Contact Us for Consultation'
    },
    consultation: {
      id: 'consultation',
      url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&h=400&fit=crop',
      alt: 'Makeup consultation session',
      title: 'Personal Consultation'
    }
  }
};

// Dynamic image fetching function (for future database integration)
async function fetchDynamicImages() {
  // This function will be implemented when switching to database
  // For now, return empty objects
  return {
    hero: null,
    services: [],
    portfolio: [],
    testimonials: [],
    about: { artist: null, workspace: null, process: null },
    contact: { hero: null, consultation: null }
  };
}

// Main image getter functions
export const getHeroImage = async (): Promise<ImageData> => {
  if (USE_DYNAMIC_IMAGES) {
    const dynamic = await fetchDynamicImages();
    return dynamic.hero || UNSPLASH_IMAGES.hero;
  }
  return UNSPLASH_IMAGES.hero;
};

export const getServiceImages = async (): Promise<ServiceImage[]> => {
  if (USE_DYNAMIC_IMAGES) {
    const dynamic = await fetchDynamicImages();
    return dynamic.services.length > 0 ? dynamic.services : UNSPLASH_IMAGES.services;
  }
  return UNSPLASH_IMAGES.services;
};

export const getPortfolioImages = async (category?: string): Promise<PortfolioImage[]> => {
  if (USE_DYNAMIC_IMAGES) {
    const dynamic = await fetchDynamicImages();
    const images = dynamic.portfolio.length > 0 ? dynamic.portfolio : UNSPLASH_IMAGES.portfolio;
    return category ? images.filter(img => img.category === category) : images;
  }
  
  const images = UNSPLASH_IMAGES.portfolio;
  return category ? images.filter(img => img.category === category) : images;
};

export const getTestimonialImages = async (): Promise<TestimonialImage[]> => {
  if (USE_DYNAMIC_IMAGES) {
    const dynamic = await fetchDynamicImages();
    return dynamic.testimonials.length > 0 ? dynamic.testimonials : UNSPLASH_IMAGES.testimonials;
  }
  return UNSPLASH_IMAGES.testimonials;
};

export const getAboutImages = async () => {
  if (USE_DYNAMIC_IMAGES) {
    const dynamic = await fetchDynamicImages();
    return {
      artist: dynamic.about.artist || UNSPLASH_IMAGES.about.artist,
      workspace: dynamic.about.workspace || UNSPLASH_IMAGES.about.workspace,
      process: dynamic.about.process || UNSPLASH_IMAGES.about.process
    };
  }
  return UNSPLASH_IMAGES.about;
};

export const getContactImages = async () => {
  if (USE_DYNAMIC_IMAGES) {
    const dynamic = await fetchDynamicImages();
    return {
      hero: dynamic.contact?.hero || UNSPLASH_IMAGES.contact.hero,
      consultation: dynamic.contact?.consultation || UNSPLASH_IMAGES.contact.consultation
    };
  }
  return UNSPLASH_IMAGES.contact;
};

// Utility functions
export const getImageByServiceType = async (serviceType: string): Promise<ServiceImage | undefined> => {
  const services = await getServiceImages();
  return services.find(service => service.serviceType === serviceType);
};

export const getTestimonialImageByClient = async (clientName: string): Promise<TestimonialImage | undefined> => {
  const testimonials = await getTestimonialImages();
  return testimonials.find(testimonial => testimonial.clientName === clientName);
};

// Export static data for direct access (useful for development)
export const STATIC_IMAGES = UNSPLASH_IMAGES;

// Configuration export
export { USE_DYNAMIC_IMAGES };