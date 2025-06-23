'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-soft overflow-hidden">
        <div className="absolute inset-0 bg-[url('/privacy-pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 text-[#4e4528] hover:text-[#a8956b] transition-colors duration-300 mb-8">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[#4e4528]">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#404040] mb-12 max-w-4xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
            </p>

            <div className="text-sm text-[#404040]">
              Last updated: January 2024
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Information We Collect */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-[#a8956b]" />
              <h2 className="text-3xl font-bold text-[#4e4528]">Information We Collect</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, book a service, 
                contact us, or otherwise communicate with us.
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Contact Information:</strong> Name, email address, phone number, and address</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Service Information:</strong> Booking details, service preferences, and special requests</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Payment Information:</strong> Billing details and payment method information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Communication Records:</strong> Messages, feedback, and support inquiries</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="h-8 w-8 text-[#a8956b]" />
              <h2 className="text-3xl font-bold text-[#4e4528]">How We Use Your Information</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                We use the information we collect for various purposes, including:
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Providing and improving our makeup artistry services</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Processing bookings and managing appointments</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Communicating with you about services and appointments</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Sending marketing communications (with your consent)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Complying with legal obligations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Information Protection */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-8 w-8 text-[#a8956b]" />
              <h2 className="text-3xl font-bold text-[#4e4528]">How We Protect Your Information</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction.
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Secure data encryption for sensitive information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Limited access to personal information by authorized personnel only</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Secure payment processing through trusted providers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="h-8 w-8 text-[#a8956b]" />
              <h2 className="text-3xl font-bold text-[#4e4528]">Information Sharing</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>With your explicit consent</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>With trusted service providers who assist in our operations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>When required by law or to protect our rights</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>In connection with a business transfer or acquisition</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#4e4528] mb-6">Your Rights and Choices</h2>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                You have certain rights regarding your personal information:
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Access:</strong> Request a copy of the personal information we hold about you</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Correction:</strong> Request correction of inaccurate personal information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Deletion:</strong> Request deletion of your personal information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-soft rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-[#4e4528] mb-6">Contact Us</h2>
            <p className="text-[#404040] mb-6 leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            
            <div className="space-y-3 text-[#404040]">
              <p><strong>Email:</strong> privacy@dollup.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> India, IN</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
} 