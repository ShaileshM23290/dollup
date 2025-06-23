'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Twitter,
  CheckCircle,
  ArrowRight,
  Calendar,
  Heart,
  Star,
  HelpCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    eventDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.service} Inquiry`,
          message: `Service: ${formData.service}\nEvent Date: ${formData.eventDate}\n\nMessage:\n${formData.message}`
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert('Failed to submit form. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call or Text',
      description: 'Quick questions or immediate booking',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      href: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Detailed inquiries and consultations',
      contact: 'hello@dollup.com',
      action: 'Send Email',
      href: 'mailto:hello@dollup.com'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant support during business hours',
      contact: 'Available Mon-Sat 9AM-7PM',
      action: 'Start Chat',
      href: '#'
    },
    {
      icon: Instagram,
      title: 'Social Media',
      description: 'Follow our latest work and updates',
      contact: '@dollup_makeup',
      action: 'Follow Us',
      href: '#'
    }
  ];

  const faqs = [
    {
      question: 'How far in advance should I book?',
      answer: 'For bridal makeup, we recommend booking 3-6 months in advance. For other services, 2-4 weeks notice is usually sufficient, though we can often accommodate last-minute requests.'
    },
    {
      question: 'Do you travel to my location?',
      answer: 'Yes! We offer on-location services within 25 miles of NYC. A travel fee may apply depending on the distance and time requirements.'
    },
    {
      question: 'What products do you use?',
      answer: 'We use only professional-grade, high-quality cosmetics from brands like MAC, NARS, Charlotte Tilbury, and Fenty Beauty. All products are hypoallergenic and photo-ready.'
    },
    {
      question: 'Do you offer makeup trials?',
      answer: 'Absolutely! Bridal trials are included in our bridal packages. For other services, trials can be arranged for an additional fee.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We require 48 hours notice for cancellations. Cancellations within 24 hours may incur a fee. We understand emergencies happen and will work with you when possible.'
    },
    {
      question: 'Can you accommodate allergies or sensitive skin?',
      answer: 'Yes! Please inform us of any allergies or skin sensitivities during booking. We have hypoallergenic and sensitive skin-friendly product options available.'
    }
  ];

  const businessHours = [
    { day: 'Monday', hours: '9:00 AM - 7:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 7:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 7:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 7:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 8:00 PM' },
    { day: 'Sunday', hours: 'By Appointment Only' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-soft overflow-hidden">
        <div className="absolute inset-0 bg-[url('/contact-pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[#2c2c2c]">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#6b6b6b] mb-12 max-w-4xl mx-auto leading-relaxed">
            Ready to create your perfect look? We'd love to hear from you! 
            Reach out for consultations, bookings, or any questions about our services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Phone className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-[#2c2c2c]">Quick Response</h3>
              <p className="text-[#6b6b6b]">We respond to all inquiries within 24 hours</p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-[#2c2c2c]">Flexible Scheduling</h3>
              <p className="text-[#6b6b6b]">Available 7 days a week to fit your needs</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-[#2c2c2c]">Personal Service</h3>
              <p className="text-[#6b6b6b]">Every consultation is tailored to you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2c2c2c]">
              Ways to <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Choose the method that works best for you. We're here to help in whatever way is most convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="card-elegant text-center group hover:shadow-elegant-hover">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-elegant rounded-2xl mb-6 group-hover:bg-gradient-primary transition-all duration-300">
                    <Icon className="h-8 w-8 text-[#2c2c2c] group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-[#2c2c2c]">{method.title}</h3>
                  <p className="text-[#6b6b6b] mb-4 leading-relaxed">{method.description}</p>
                  <p className="text-[#d4a574] font-medium mb-6">{method.contact}</p>
                  
                  <Link 
                    href={method.href}
                    className="btn-secondary w-full text-center"
                  >
                    {method.action}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2c2c2c]">
                Send Us a <span className="text-gradient">Message</span>
              </h2>
              
              {isSubmitted ? (
                <div className="card-elegant text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-4 text-[#2c2c2c]">Message Sent!</h3>
                  <p className="text-[#6b6b6b] mb-6">
                    Thank you for reaching out! We'll get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: '',
                        eventDate: '',
                        message: ''
                      });
                    }}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-elegant">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#2c2c2c] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#2c2c2c] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#2c2c2c] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all duration-300"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-[#2c2c2c] mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        <option value="bridal">Bridal Makeup</option>
                        <option value="photoshoot">Photoshoot Makeup</option>
                        <option value="events">Special Events</option>
                        <option value="lessons">Makeup Lessons</option>
                        <option value="group">Group Bookings</option>
                        <option value="consultation">Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="eventDate" className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Event Date (if applicable)
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your vision, event details, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info & Hours */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="card-elegant">
                <h3 className="text-2xl font-semibold mb-6 text-[#2c2c2c] flex items-center">
                  <Clock className="h-6 w-6 text-[#d4a574] mr-3" />
                  Business Hours
                </h3>
                
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-[#e8d5b7]/30 last:border-b-0">
                      <span className="font-medium text-[#2c2c2c]">{schedule.day}</span>
                      <span className="text-[#6b6b6b]">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-soft rounded-xl">
                  <p className="text-sm text-[#6b6b6b]">
                    <strong>Note:</strong> Weekend and evening appointments available by request. 
                    Emergency bookings may be accommodated with additional fees.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="card-elegant">
                <h3 className="text-2xl font-semibold mb-6 text-[#2c2c2c] flex items-center">
                  <MapPin className="h-6 w-6 text-[#d4a574] mr-3" />
                  Service Area
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-[#2c2c2c] mb-2">Primary Service Area</h4>
                    <p className="text-[#6b6b6b]">India City & Manhattan</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-[#2c2c2c] mb-2">Extended Service Area</h4>
                    <p className="text-[#6b6b6b]">Brooklyn, Queens, Bronx, Staten Island</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-[#2c2c2c] mb-2">Travel Services</h4>
                    <p className="text-[#6b6b6b]">Available within 50 miles of NYC (travel fees apply)</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-elegant">
                <h3 className="text-2xl font-semibold mb-6 text-[#2c2c2c]">Quick Actions</h3>
                
                <div className="space-y-4">
                  <Link href="/book" className="btn-primary w-full text-center">
                    Book Appointment
                  </Link>
                  
                  <Link href="/services" className="btn-secondary w-full text-center">
                    View Services & Pricing
                  </Link>
                  
                  <Link href="/portfolio" className="btn-secondary w-full text-center">
                    Browse Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2c2c2c]">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Find answers to common questions about our services, booking process, and policies.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card-elegant">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-elegant rounded-full flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-[#2c2c2c]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-[#2c2c2c]">{faq.question}</h3>
                    <p className="text-[#6b6b6b] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#6b6b6b] mb-6">
              Don't see your question answered? We'd love to help!
            </p>
            <Link href="#" className="btn-primary inline-flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Ask a Question</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Your perfect look is just a conversation away. Let's discuss your vision and create something beautiful together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/book" className="bg-white text-[#2c2c2c] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Book Now</span>
            </Link>
            
            <a href="tel:+15551234567" className="border-2 border-white text-white hover:bg-white hover:text-[#2c2c2c] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 