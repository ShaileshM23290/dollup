'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-elegant border-b border-[#e8d5b7]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="hidden md:flex items-center space-x-6 text-[#6b6b6b]">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>India, IN</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Sat: 9AM-7PM</span>
              </div>
            </div>
            <div className="text-[#6b6b6b] text-xs md:text-sm">
              ✨ Book your dream look today - Limited slots available!
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-elegant border-b border-[#e8d5b7]/20' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-elegant rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative rounded-2xl bg-white shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300">
                    <Image
                      src="/logo.png"
                      alt="Dollup - Professional Makeup Artist"
                      width={120}
                      height={120}
                      className={`w-auto rounded-2xl object-contain group-hover:scale-105 transition-all duration-300 ease-in-out ${
                        isScrolled ? 'h-16' : 'h-auto'
                      }`}
                      priority
                    />
                  </div>
                </div>
                <div className="ml-4 hidden sm:block">
                  <div className="text-2xl font-bold text-gradient">DOLLUP</div>
                  <div className="text-xs font-medium tracking-[0.15em] text-[#6b6b6b] uppercase">
                    Makeup Artistry
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-[#2c2c2c] font-medium hover:text-[#d4a574] transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Link
                href="/book"
                className="hidden md:inline-flex btn-primary text-sm px-6 py-3"
              >
                Book Now
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gradient-elegant hover:bg-gradient-primary hover:text-white transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#e8d5b7]/20 shadow-elegant">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-[#2c2c2c] font-medium hover:text-[#d4a574] transition-colors duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-[#e8d5b7]/20">
                  <Link
                    href="/book"
                    className="block btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Appointment
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
} 