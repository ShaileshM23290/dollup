import Link from 'next/link';
import Image from 'next/image';
import { getAboutImages } from '@/lib/images';
import { 
  Award, 
  Clock, 
  Users, 
  Heart, 
  Star, 
  ArrowRight,
  Sparkles,
  Camera,
  Crown,
  Palette,
  BookOpen,
  Trophy,
  MapPin,
  Calendar
} from 'lucide-react';

export default async function AboutPage() {
  const aboutImages = await getAboutImages();
  const achievements = [
    { icon: Award, title: 'Licensed Professional', description: 'Certified makeup artist with state licensing' },
    { icon: Clock, title: '5+ Years Experience', description: 'Over 500 successful makeup applications' },
    { icon: Users, title: '100+ Happy Brides', description: 'Specializing in bridal makeup artistry' },
    { icon: Camera, title: 'Editorial Work', description: 'Featured in major fashion magazines' }
  ];

  const certifications = [
    { name: 'Professional Makeup Artistry Certification', institution: 'Makeup Academy NYC', year: '2019' },
    { name: 'Bridal Makeup Specialist', institution: 'International Beauty Institute', year: '2020' },
    { name: 'Airbrush Makeup Certification', institution: 'Temptu Pro', year: '2021' },
    { name: 'Color Theory & Application', institution: 'Fashion Institute', year: '2022' }
  ];

  const experience = [
    {
      role: 'Lead Makeup Artist',
      company: 'Elite Beauty Studio',
      period: '2022 - Present',
      description: 'Leading a team of makeup artists for high-end weddings and events'
    },
    {
      role: 'Freelance Makeup Artist',
      company: 'Various Fashion Magazines',
      period: '2020 - Present',
      description: 'Editorial makeup for Vogue, Harper\'s Bazaar, and Elle Magazine'
    },
    {
      role: 'Bridal Makeup Specialist',
      company: 'Luxury Wedding Collective',
      period: '2019 - 2022',
      description: 'Specialized in bridal makeup for luxury destination weddings'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Beauty',
      description: 'Every face tells a unique story, and I\'m passionate about enhancing your natural beauty while honoring your individuality.'
    },
    {
      icon: Star,
      title: 'Excellence in Service',
      description: 'I believe in providing exceptional service that goes beyond makeup application - creating an experience you\'ll cherish forever.'
    },
    {
      icon: Sparkles,
      title: 'Continuous Learning',
      description: 'The beauty industry evolves constantly, and I stay current with the latest techniques, trends, and products.'
    },
    {
      icon: Crown,
      title: 'Making Dreams Reality',
      description: 'Your special day deserves perfection. I work tirelessly to bring your vision to life and exceed your expectations.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Bride',
      content: 'Working with the Dollup team was an absolute dream. They understood my vision perfectly and made me feel like the most beautiful version of myself.',
      rating: 5
    },
    {
      name: 'Emily Chen',
      role: 'Fashion Model',
      content: 'Professional, talented, and incredibly skilled. The makeup looked flawless both in person and on camera. Highly recommend!',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Event Client',
      content: 'The attention to detail and personalized service was outstanding. I felt confident and beautiful throughout my entire event.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-soft overflow-hidden">
        <div className="absolute inset-0 bg-[url('/about-pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 text-[#4e4528]">
                Meet Your <span className="text-gradient">Artist</span>
              </h1>
              
              <p className="text-xl text-[#404040] mb-8 leading-relaxed">
                Hi, I&apos;m the creative force behind Dollup! With over 5 years of experience in professional makeup artistry, 
                I specialize in creating stunning looks that enhance your natural beauty and boost your confidence.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4e4528] mb-2">500+</div>
                  <div className="text-[#404040] font-medium">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4e4528] mb-2">5+</div>
                  <div className="text-[#404040] font-medium">Years Experience</div>
                </div>
              </div>

              <Link href="/book" className="btn-primary inline-flex items-center space-x-2">
                <span>Work With Me</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl shadow-elegant overflow-hidden relative">
                <Image
                  src={aboutImages.artist.url}
                  alt={aboutImages.artist.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Palette className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#2c2c2c]">
              My <span className="text-gradient">Story</span>
            </h2>
            
            <div className="space-y-6 text-lg text-[#6b6b6b] leading-relaxed">
              <p>
                My journey into makeup artistry began during my college years when I discovered my passion for enhancing natural beauty. 
                What started as helping friends get ready for special occasions quickly evolved into a calling that would shape my career.
              </p>
              
              <p>
                After completing my formal training at the prestigious Makeup Academy NYC, I dove headfirst into the world of professional makeup artistry. 
                I've had the privilege of working with brides on their most important day, collaborating with photographers on editorial shoots, 
                and helping countless individuals feel confident and beautiful.
              </p>
              
              <p>
                My approach to makeup is rooted in the belief that beauty is personal and unique to each individual. 
                I don&apos;t believe in one-size-fits-all solutions. Instead, I take the time to understand your style, preferences, 
                and the occasion to create a look that's authentically you.
              </p>
              
              <p>
                When I&apos;m not behind the makeup brush, you can find me staying current with the latest beauty trends, 
                experimenting with new techniques, or teaching makeup workshops to aspiring artists. 
                I believe in giving back to the community that has given me so much.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2c2c2c]">
              Professional <span className="text-gradient">Achievements</span>
            </h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Recognition and milestones that reflect my commitment to excellence in makeup artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-[#2c2c2c]">{achievement.title}</h3>
                  <p className="text-[#6b6b6b] leading-relaxed">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Education */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2c2c2c]">
                Education & <span className="text-gradient">Certifications</span>
              </h2>
              
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="card-elegant">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-elegant rounded-xl flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-[#2c2c2c]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-[#2c2c2c]">{cert.name}</h3>
                        <p className="text-[#6b6b6b] mb-1">{cert.institution}</p>
                        <p className="text-sm text-[#d4a574] font-medium">{cert.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2c2c2c]">
                Professional <span className="text-gradient">Experience</span>
              </h2>
              
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="card-elegant">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 text-[#2c2c2c]">{exp.role}</h3>
                        <p className="text-[#d4a574] font-medium mb-2">{exp.company}</p>
                        <p className="text-sm text-[#6b6b6b] mb-3">{exp.period}</p>
                        <p className="text-[#6b6b6b] leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-24 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2c2c2c]">
              My <span className="text-gradient">Philosophy</span>
            </h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              The core values and beliefs that guide my approach to makeup artistry and client service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card-elegant">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-elegant rounded-xl flex items-center justify-center">
                        <Icon className="h-6 w-6 text-[#2c2c2c]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-4 text-[#2c2c2c]">{value.title}</h3>
                      <p className="text-[#6b6b6b] leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2c2c2c]">
              What Clients <span className="text-gradient">Say</span>
            </h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Real feedback from real clients who have experienced the Dollup difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elegant text-center">
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#d4a574] fill-current" />
                  ))}
                </div>
                
                <p className="text-[#2c2c2c] mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div>
                  <div className="font-semibold text-[#2c2c2c]">{testimonial.name}</div>
                  <div className="text-[#6b6b6b] text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Let&apos;s Create Something Beautiful Together
              </h2>
              
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Ready to experience the Dollup difference? I'd love to hear about your vision and help bring it to life. 
                Every consultation is personalized to your unique needs and style.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span>Serving India City & Surrounding Areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5" />
                  <span>Available 7 Days a Week</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5" />
                  <span>Flexible Scheduling Available</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="bg-white text-[#2c2c2c] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 text-center">
                  Book Consultation
                </Link>
                
                <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-[#2c2c2c] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 text-center">
                  Get In Touch
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-3xl backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="h-16 w-16 text-white mx-auto mb-4" />
                  <p className="text-lg font-medium">Your Beauty Journey Starts Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 