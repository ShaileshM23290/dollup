import Link from 'next/link';
import Image from 'next/image';
import { getPortfolioImages, getTestimonialImages } from '@/lib/images';
import { 
  Sparkles, 
  Heart, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Camera,
  Crown,
  Gift,
  Phone,
  Calendar,
  Play
} from 'lucide-react';
import TestimonialCarousel from './components/TestimonialCarousel';

export default async function HomePage() {
  // Fetch all images
  const portfolioImages = await getPortfolioImages();
  const testimonialImages = await getTestimonialImages();

  const services = [
    {
      icon: Crown,
      title: 'Bridal Makeup',
      description: 'Your perfect wedding day look, designed to last from ceremony to celebration.',
      price: 'Starting at ₹350',
      features: ['Trial session included', 'Touch-up kit', 'Long-lasting formula']
    },
    {
      icon: Camera,
      title: 'Photoshoot Makeup',
      description: 'Professional makeup for photography, ensuring you look flawless on camera.',
      price: 'Starting at ₹200',
      features: ['HD makeup', 'Multiple looks', 'Quick touch-ups']
    },
    {
      icon: Sparkles,
      title: 'Special Events',
      description: 'Glamorous looks for galas, parties, and special occasions.',
      price: 'Starting at ₹150',
      features: ['Custom consultation', 'Premium products', 'Travel available']
    },
    {
      icon: Gift,
      title: 'Makeup Lessons',
      description: 'Learn professional techniques and discover your signature look.',
      price: 'Starting at ₹120',
      features: ['Personalized tutorial', 'Product recommendations', 'Take-home guide']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Bride',
      content: 'Absolutely stunning work! I felt like a princess on my wedding day. The makeup lasted perfectly through tears of joy and hours of dancing.',
      rating: 5,
      image: '/testimonial1.jpg'
    },
    {
      name: 'Emily Chen',
      role: 'Model',
      content: 'Professional, talented, and so easy to work with. My photos came out incredible thanks to the flawless makeup application.',
      rating: 5,
      image: '/testimonial2.jpg'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Event Attendee',
      content: 'I received so many compliments! The makeup was exactly what I envisioned and more. Highly recommend for any special occasion.',
      rating: 5,
      image: '/testimonial3.jpg'
    }
  ];

  // Get first 6 portfolio images for preview
  const portfolioPreview = portfolioImages.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f7] via-[#f5f1ea] to-[#e8dcc6]"></div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 float">
          <Sparkles className="h-8 w-8 text-[#a8956b] opacity-60" />
        </div>
        <div className="absolute top-40 right-20 float" style={{ animationDelay: '2s' }}>
          <Heart className="h-6 w-6 text-[#4e4528] opacity-40" />
        </div>
        <div className="absolute bottom-40 left-20 float" style={{ animationDelay: '4s' }}>
          <Star className="h-10 w-10 text-[#a8956b] opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-gradient">Transform</span>
              <br />
              <span className="text-[#4e4528]">Your Beauty</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#404040] mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional makeup artistry for your most important moments. 
              From bridal elegance to editorial glamour, we create looks that capture your unique beauty.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/book" className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Book Your Session</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link href="/portfolio" className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>View Portfolio</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4e4528] mb-2">500+</div>
                <div className="text-[#404040] font-medium">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4e4528] mb-2">5+</div>
                <div className="text-[#404040] font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4e4528] mb-2">100+</div>
                <div className="text-[#404040] font-medium">Weddings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4e4528] mb-2">24/7</div>
                <div className="text-[#404040] font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#2a2a2a]">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-[#404040] max-w-3xl mx-auto">
              Discover our range of professional makeup services, each tailored to enhance your natural beauty and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="card-elegant group cursor-pointer">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-elegant rounded-2xl mb-6 group-hover:bg-gradient-primary transition-all duration-300">
                      <Icon className="h-8 w-8 text-[#2c2c2c] group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-[#4e4528]">{service.title}</h3>
                    <p className="text-[#404040] mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="text-2xl font-bold text-[#4e4528] mb-6">{service.price}</div>
                    
                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-[#404040]">
                          <CheckCircle className="h-4 w-4 text-[#a8956b] mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link href="/book" className="btn-primary w-full text-center">
                      Book Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#4e4528]">
              Our <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="text-xl text-[#404040] max-w-3xl mx-auto mb-8">
              Explore our stunning collection of makeup artistry showcasing diverse styles and techniques.
            </p>
            <Link href="/portfolio" className="btn-secondary inline-flex items-center space-x-2">
              <span>View Full Portfolio</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {portfolioPreview.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl shadow-elegant hover:shadow-elegant-hover transition-all duration-300">
                <div className="aspect-square relative">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-semibold">{image.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#4e4528]">
              Client <span className="text-gradient">Love</span>
            </h2>
            <p className="text-xl text-[#404040] max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our amazing clients have to say about their experience.
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} testimonialImages={testimonialImages} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-pattern.svg')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Look <br />Absolutely Stunning?
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Book your makeup session today and let us create a look that&apos;s uniquely you. 
            Your beauty transformation awaits!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/book" className="bg-white text-[#4e4528] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Book Your Session</span>
            </Link>
            
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-[#4e4528] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Call Us Now</span>
            </Link>
          </div>

          <div className="text-center opacity-90 text-white font-bold">
            <p className="text-lg mb-2"> Special Offer: 15% off your first booking!</p>
            <p className="text-sm">Use code: FIRST15 | Valid until end of month</p>
          </div>
        </div>
      </section>
    </div>
  );
}
