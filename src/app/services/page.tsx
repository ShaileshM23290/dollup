'use client';

import Link from 'next/link';
import { 
  Crown, 
  Camera, 
  Sparkles, 
  Gift, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Star,
  Heart,
  Palette,
  Award
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 'bridal',
      icon: Crown,
      title: 'Bridal Makeup',
      subtitle: 'Your Perfect Wedding Day Look',
      description: 'Create the wedding look of your dreams with our comprehensive bridal makeup services. From the initial consultation to your special day, we ensure you look absolutely radiant.',
      price: 'Starting at₹350',
      duration: '3-4 hours',
      includes: [
        'Pre-wedding consultation',
        'Trial makeup session',
        'Wedding day application',
        'Touch-up kit for the day',
        'False lashes included',
        'Long-lasting, photo-ready formula',
        'Stress-free experience'
      ],
      process: [
        'Initial consultation to discuss your vision',
        'Trial session 4-6 weeks before wedding',
        'Final adjustments and product selection',
        'Wedding day application at your venue'
      ],
      image: '/services/bridal.jpg'
    },
    {
      id: 'photoshoot',
      icon: Camera,
      title: 'Photoshoot Makeup',
      subtitle: 'Camera-Ready Perfection',
      description: 'Professional makeup designed specifically for photography and videography. Whether it\'s for headshots, fashion shoots, or special projects, we create looks that translate beautifully on camera.',
      price: 'Starting at ₹200',
      duration: '2-3 hours',
      includes: [
        'HD makeup application',
        'Multiple look options',
        'Quick touch-ups between shots',
        'Collaboration with photographer',
        'Professional-grade products',
        'Contouring and highlighting',
        'False lashes if needed'
      ],
      process: [
        'Discuss concept with photographer',
        'Prepare skin for camera',
        'Apply HD makeup techniques',
        'Provide touch-ups during shoot'
      ],
      image: '/services/photoshoot.jpg'
    },
    {
      id: 'events',
      icon: Sparkles,
      title: 'Special Events',
      subtitle: 'Glamorous Looks for Every Occasion',
      description: 'From galas and parties to anniversaries and celebrations, we create stunning looks that make you feel confident and beautiful for any special occasion.',
      price: 'Starting at ₹150',
      duration: '1.5-2 hours',
      includes: [
        'Custom consultation',
        'Event-appropriate styling',
        'Premium product application',
        'Contouring and highlighting',
        'Eye makeup artistry',
        'Lip color coordination',
        'Setting spray for longevity'
      ],
      process: [
        'Discuss event details and dress code',
        'Choose appropriate makeup style',
        'Professional application',
        'Final touches and setting'
      ],
      image: '/services/events.jpg'
    },
    {
      id: 'lessons',
      icon: Gift,
      title: 'Makeup Lessons',
      subtitle: 'Learn Professional Techniques',
      description: 'Discover the secrets of professional makeup application with personalized one-on-one lessons. Perfect for beginners or those looking to enhance their skills.',
      price: 'Starting at ₹120',
      duration: '2 hours',
      includes: [
        'Personalized tutorial',
        'Technique demonstrations',
        'Product recommendations',
        'Take-home instruction guide',
        'Practice time with guidance',
        'Color matching advice',
        'Tool and brush education'
      ],
      process: [
        'Assess current skill level',
        'Demonstrate techniques step-by-step',
        'Hands-on practice session',
        'Provide personalized tips and guide'
      ],
      image: '/services/lessons.jpg'
    },
    {
      id: 'group',
      icon: Users,
      title: 'Group Bookings',
      subtitle: 'Perfect for Parties & Events',
      description: 'Ideal for bridal parties, birthday celebrations, or girls\' nights out. We bring the salon experience to you with group makeup sessions.',
      price: 'Starting at ₹100/person',
      duration: '1 hour per person',
      includes: [
        'On-location service',
        'Individual consultations',
        'Coordinated group looks',
        'Professional application',
        'Group photos opportunity',
        'Fun and relaxing experience',
        'Flexible scheduling'
      ],
      process: [
        'Plan group session details',
        'Coordinate individual looks',
        'Set up mobile makeup station',
        'Apply makeup for each person'
      ],
      image: '/services/group.jpg'
    },
    {
      id: 'consultation',
      icon: Palette,
      title: 'Color Consultation',
      subtitle: 'Discover Your Perfect Palette',
      description: 'Find the colors that enhance your natural beauty with our comprehensive color analysis and consultation service.',
      price: 'Starting at₹80',
      duration: '1 hour',
      includes: [
        'Skin tone analysis',
        'Color palette creation',
        'Product recommendations',
        'Seasonal color guide',
        'Shopping assistance',
        'Digital color chart',
        'Follow-up support'
      ],
      process: [
        'Analyze skin undertones',
        'Test various color families',
        'Create personalized palette',
        'Provide recommendations and guide'
      ],
      image: '/services/consultation.jpg'
    }
  ];

  const addOns = [
    { name: 'False Lashes', price: '₹25' },
    { name: 'Airbrush Makeup', price: '$50' },
    { name: 'Contouring & Highlighting', price: '$30' },
    { name: 'Travel Fee (within 25 miles)', price: '$50' },
    { name: 'Early Morning Fee (before 7 AM)', price: '$75' },
    { name: 'Additional Touch-up Kit', price: '$40' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-soft overflow-hidden">
        <div className="absolute inset-0 bg-[url('/services-pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[#2c2c2c]">
            Our <span className="text-gradient">Services</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#6b6b6b] mb-12 max-w-4xl mx-auto leading-relaxed">
            Professional makeup artistry services tailored to enhance your natural beauty 
            and make you feel confident for every occasion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Award className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-[#2c2c2c]">Licensed Professional</h3>
              <p className="text-[#6b6b6b]">Certified makeup artist with years of experience</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-[#2c2c2c]">Flexible Scheduling</h3>
              <p className="text-[#6b6b6b]">Available 7 days a week to fit your schedule</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-[#2c2c2c]">Premium Products</h3>
              <p className="text-[#6b6b6b]">Only the finest professional-grade cosmetics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Content */}
                  <div className={isEven ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-elegant rounded-2xl mb-6">
                      <Icon className="h-8 w-8 text-[#2c2c2c]" />
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2c2c2c]">{service.title}</h2>
                    <h3 className="text-xl text-gradient mb-6 font-medium">{service.subtitle}</h3>
                    
                    <p className="text-lg text-[#6b6b6b] mb-8 leading-relaxed">{service.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-soft p-6 rounded-2xl">
                        <h4 className="font-semibold text-[#2c2c2c] mb-2">Pricing</h4>
                        <p className="text-2xl font-bold text-gradient">{service.price}</p>
                      </div>
                      <div className="bg-gradient-soft p-6 rounded-2xl">
                        <h4 className="font-semibold text-[#2c2c2c] mb-2">Duration</h4>
                        <p className="text-lg text-[#6b6b6b]">{service.duration}</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="font-semibold text-[#2c2c2c] mb-4">What's Included:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.includes.map((item, idx) => (
                          <li key={idx} className="flex items-center text-[#6b6b6b]">
                            <CheckCircle className="h-4 w-4 text-[#d4a574] mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link href="/book" className="btn-primary inline-flex items-center space-x-2">
                      <span>Book This Service</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                  
                  {/* Image Placeholder */}
                  <div className={`${!isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="aspect-[4/3] bg-gradient-elegant rounded-3xl shadow-elegant"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2c2c2c]">
              Add-On <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Enhance your makeup experience with our additional services and upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="card-elegant text-center">
                <h3 className="text-lg font-semibold mb-2 text-[#2c2c2c]">{addon.name}</h3>
                <p className="text-2xl font-bold text-gradient">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2c2c2c]">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              From consultation to final application, we ensure a seamless and enjoyable experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We discuss your vision, preferences, and event details to create the perfect plan.' },
              { step: '02', title: 'Preparation', description: 'Skin prep and color matching to ensure the best foundation for your makeup.' },
              { step: '03', title: 'Application', description: 'Professional makeup application using premium products and expert techniques.' },
              { step: '04', title: 'Final Touches', description: 'Setting spray, final adjustments, and touch-up kit for lasting beauty.' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#2c2c2c]">{item.title}</h3>
                <p className="text-[#6b6b6b] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Book Your Service?
          </h2>
          
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Let's create the perfect look for your special occasion. Book your consultation today!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/book" className="bg-white text-[#2c2c2c] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Book Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-[#2c2c2c] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center space-x-2">
              <span>Ask Questions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 