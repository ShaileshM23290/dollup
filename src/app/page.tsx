'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  Calendar, 
  Users, 
  Award,
  ArrowRight,
  Play,
  Quote,
  Sparkles
} from 'lucide-react';

interface PortfolioItem {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  description?: string;
  isFeatured: boolean;
}

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: string;
  isPopular: boolean;
}

export default function HomePage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch portfolio items
        const portfolioResponse = await fetch('/api/portfolio');
        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json();
          setPortfolioItems(portfolioData.portfolio.filter((item: PortfolioItem) => item.isFeatured).slice(0, 6));
        }

        // Fetch services
        const servicesResponse = await fetch('/api/services');
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData.services.slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Award, value: '5+', label: 'Years Experience' },
    { icon: Calendar, value: '100+', label: 'Makeup' },
    { icon: Star, value: '24/7', label: 'Support' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'Professional, talented, and so easy to work with. My photos came out incredible thanks to the flawless makeup application.',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Anita Patel',
      rating: 5,
      text: 'Professional, talented, and so easy to work with. My photos came out incredible thanks to the flawless makeup application.',
      image: '/api/placeholder/60/60'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f8f6f0] to-[#e8d5b7] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#2c2c2c] leading-tight mb-6">
            Transform
            <br />
            <span className="text-[#d4a574]">Your Beauty</span>
          </h1>
          <p className="text-xl text-[#6b6b6b] mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional makeup artistry for your most important moments. 
            From bridal elegance to editorial glamour, we create looks that 
            capture your unique beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-[#2c2c2c] text-white px-8 py-4 rounded-xl hover:bg-[#404040] transition-all duration-300 font-medium flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Your Session</span>
            </Link>
            <Link
              href="/portfolio"
              className="border-2 border-[#2c2c2c] text-[#2c2c2c] px-8 py-4 rounded-xl hover:bg-[#2c2c2c] hover:text-white transition-all duration-300 font-medium flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#d4a574] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-[#2c2c2c] mb-2">{stat.value}</div>
                <div className="text-[#8b7355] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#f8f6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2c2c2c] mb-4">Our <span className="text-[#d4a574]">Services</span></h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Discover our range of professional makeup services, each tailored to enhance 
              your natural beauty and confidence.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div key={service._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-16 h-16 bg-[#d4a574] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2c2c2c] mb-2">{service.name}</h3>
                  <p className="text-[#6b6b6b] mb-4 text-sm">{service.description}</p>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-[#d4a574]">₹{service.price.toLocaleString()}</span>
                    <div className="text-[#8b7355] text-sm">{service.duration}</div>
                  </div>
                  <Link
                    href="/book"
                    className="w-full bg-[#2c2c2c] text-white py-2 rounded-lg hover:bg-[#404040] transition-colors inline-block"
                  >
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 text-[#d4a574] hover:text-[#c4956a] font-medium"
            >
              <span>View All Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2c2c2c] mb-4">Our <span className="text-[#d4a574]">Portfolio</span></h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Explore our stunning collection of makeup artistry showcasing diverse styles and 
              techniques.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <div key={item._id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={item.imageUrl || '/api/placeholder/400/300'}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <span className="text-sm capitalize">{item.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center space-x-2 bg-[#d4a574] text-white px-8 py-3 rounded-lg hover:bg-[#c4956a] transition-colors font-medium"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Client Love Section */}
      <section className="py-20 bg-[#f8f6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2c2c2c] mb-4">Client <span className="text-[#d4a574]">Love</span></h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Don&apos;t just take our word for it - here&apos;s what our amazing clients have to say about 
              their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-[#2c2c2c] text-lg">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-[#d4a574] mb-4" />
                <p className="text-[#6b6b6b] italic leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2c2c2c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                      <h2 className="text-4xl font-bold mb-4">Ready to Look <span className="text-[#d4a574]">Absolutely Stunning?</span></h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Book your makeup session today and let us create a look that&apos;s 
              uniquely you. Your beauty transformation awaits!
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-[#d4a574] text-white px-8 py-4 rounded-xl hover:bg-[#c4956a] transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Your Session</span>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#d4a574] text-[#d4a574] px-8 py-4 rounded-xl hover:bg-[#d4a574] hover:text-white transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <span>📞</span>
              <span>Call Us Now</span>
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-[#d4a574] mb-2">Special Offer: 10% off your first booking!</p>
            <p className="text-sm text-white/70">*Use code FIRST10 when booking</p>
          </div>
        </div>
      </section>


    </div>
  );
}
