'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter,
  Heart,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'Bridal Makeup',
    'Special Events',
    'Photoshoot Makeup',
    'Makeup Lessons',
    'Group Bookings'
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative ">
                <Image
                  src="/logo.png"
                  alt="Dollup Logo"
                  width={50}
                  height={50}
                  className="h-10 w-auto object-contain rounded-lg"
                />
              </div>
              <div className="ml-4">
                <div className="text-xl font-bold text-gradient">DOLLUP</div>
                <div className="text-xs font-medium tracking-[0.15em] text-gray-300 uppercase">
                  Makeup Artistry
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your beauty with professional makeup artistry. Creating stunning looks for every occasion with passion and precision.
            </p>
            <div className="flex items-center space-x-2 text-[#d4a574]">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Licensed & Insured Professional</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                                      <Link 
                      href="/services" 
                      className="text-gray-300 hover:text-[#a8956b] transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-[#a8956b] rounded-full mr-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-[#a8956b] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#a8956b] rounded-full mr-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-[#a8956b] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-400">Call or Text</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-[#a8956b] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">hello@dollup.com</p>
                  <p className="text-sm text-gray-400">Email Us</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#a8956b] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">India, IN</p>
                  <p className="text-sm text-gray-400">Service Area</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-[#a8956b] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mon-Sat: 9AM-7PM</p>
                  <p className="text-sm text-gray-400">Sunday: By Appointment</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-4 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="p-3 rounded-xl bg-gradient-elegant hover:bg-gradient-primary transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5 text-[#4e4528] group-hover:text-white transition-colors duration-300" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} Dollup Makeup Artistry. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-[#a8956b] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#a8956b] transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-[#a8956b]" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 