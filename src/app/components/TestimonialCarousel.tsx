"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { TestimonialImage } from '@/lib/images';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  testimonialImages: TestimonialImage[];
}

export default function TestimonialCarousel({ testimonials, testimonialImages }: TestimonialCarouselProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getTestimonialImage = (clientName: string) => {
    return testimonialImages.find(img => img.clientName === clientName);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-elegant text-center">
        <Quote className="h-12 w-12 text-[#a8956b] mx-auto mb-8" />
        
        <p className="text-xl md:text-2xl text-[#4e4528] mb-8 leading-relaxed italic">
          &ldquo;{testimonials[currentTestimonial].content}&rdquo;
        </p>
        
        <div className="flex items-center justify-center space-x-1 mb-6">
          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-[#a8956b] fill-current" />
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          {(() => {
            const testimonialImage = getTestimonialImage(testimonials[currentTestimonial].name);
            return testimonialImage ? (
              <div className="w-16 h-16 rounded-full overflow-hidden relative">
                <Image
                  src={testimonialImage.url}
                  alt={testimonialImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gradient-elegant rounded-full"></div>
            );
          })()}
          <div className="text-left">
            <div className="font-semibold text-[#4e4528]">{testimonials[currentTestimonial].name}</div>
            <div className="text-[#404040]">{testimonials[currentTestimonial].role}</div>
          </div>
        </div>
      </div>

      {/* Testimonial Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentTestimonial ? 'bg-[#a8956b]' : 'bg-[#e8dcc6]'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 