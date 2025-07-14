'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/DOLLUP-LOgo-6.png"
                alt="Dollup"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <h3 className="text-2xl font-bold">Dollup</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Professional makeup artistry that transforms your natural beauty into stunning looks 
              for every occasion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#d4a574] transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#d4a574] transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#d4a574] transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Bridal Makeup</span></li>
              <li><span className="text-gray-300">Photoshoot Makeup</span></li>
              <li><span className="text-gray-300">Special Events</span></li>
              <li><span className="text-gray-300">Makeup Lessons</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-[#d4a574] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-[#d4a574] transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-gray-300 hover:text-[#d4a574] transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#d4a574] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#d4a574]" />
                <span className="text-gray-300">+91 7709 616 260</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#d4a574]" />
                <span className="text-gray-300">i.priyanka.m.16@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#d4a574]" />
                <span className="text-gray-300">Bhopal, MP</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Dollup Makeup Artistry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 