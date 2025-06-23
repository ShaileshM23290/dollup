'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Users, CreditCard, Calendar } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-soft overflow-hidden">
        <div className="absolute inset-0 bg-[url('/terms-pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 text-[#4e4528] hover:text-[#a8956b] transition-colors duration-300 mb-8">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[#4e4528]">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#404040] mb-12 max-w-4xl mx-auto leading-relaxed">
              Please read these terms carefully before using our makeup artistry services. By booking with us, you agree to these terms.
            </p>

            <div className="text-sm text-[#404040]">
              Last updated: January 2024
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Service Agreement */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-8 w-8 text-[#a8956b]" />
              <h2 className="text-3xl font-bold text-[#4e4528]">Service Agreement</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                By booking our makeup artistry services, you enter into a legally binding agreement with Dollup. 
                These terms govern the relationship between you (the client) and our professional makeup services.
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>All services are provided by licensed and experienced makeup artists</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>We use only high-quality, professional-grade makeup products</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Services are customized to your preferences and skin type</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>All equipment and tools are sanitized between clients</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Booking and Cancellation */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="h-8 w-8 text-[#a8956b]" />
              <h2 className="text-3xl font-bold text-[#4e4528]">Booking & Cancellation Policy</h2>
            </div>
            
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-[#4e4528] mb-4">Booking Requirements</h3>
              <ul className="space-y-3 text-[#404040] mb-6">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>A 50% deposit is required to secure your booking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Bookings must be made at least 48 hours in advance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>All booking details must be confirmed in writing</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-[#4e4528] mb-4">Cancellation Terms</h3>
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>48+ hours notice:</strong> Full refund of deposit</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>24-48 hours notice:</strong> 50% of deposit refunded</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Less than 24 hours:</strong> No refund of deposit</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>No-show:</strong> Full service charge applies</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="h-8 w-8 text-[#a8956b]" />
              <h2 className="text-3xl font-bold text-[#4e4528]">Payment Terms</h2>
            </div>
            
            <div className="prose max-w-none">
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>We accept cash, credit cards, and bank transfers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>50% deposit required at booking, balance due on service day</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Prices are subject to change with 30 days notice</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Travel charges apply for services outside our standard area</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Late payment fees may apply for overdue balances</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Client Responsibilities */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="h-8 w-8 text-[#a8956b]" />
              <h2 className="text-3xl font-bold text-[#4e4528]">Client Responsibilities</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                To ensure the best possible service experience, clients are responsible for:
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Arriving with clean, moisturized skin</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Disclosing any skin allergies or sensitivities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Providing accurate contact information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Being punctual for scheduled appointments</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Communicating preferences and concerns clearly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Providing adequate lighting and workspace for on-location services</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Liability and Insurance */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#4e4528] mb-6">Liability & Insurance</h2>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                While we take every precaution to ensure safe and professional service delivery:
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>We carry professional liability insurance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Clients with known allergies must inform us prior to service</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Patch tests are recommended for sensitive skin</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>We are not liable for reactions to undisclosed allergies</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#4e4528] mb-6">Photography & Social Media</h2>
            
            <div className="prose max-w-none">
              <p className="text-[#404040] mb-6 leading-relaxed">
                By booking our services, you understand and agree to the following regarding photography and social media:
              </p>
              
              <ul className="space-y-3 text-[#404040]">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>We may photograph our work for portfolio purposes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Images may be used on our website and social media platforms</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Clients may request not to be photographed or featured</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-[#a8956b] rounded-full mt-2 flex-shrink-0"></span>
                  <span>We respect client privacy and anonymity when requested</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-soft rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-[#4e4528] mb-6">Questions About These Terms?</h2>
            <p className="text-[#404040] mb-6 leading-relaxed">
                             If you have any questions about these Terms of Service, please don&apos;t hesitate to contact us:
            </p>
            
            <div className="space-y-3 text-[#404040]">
              <p><strong>Email:</strong> info@dollup.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> India, IN</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-[#a8956b]/20">
              <p className="text-sm text-[#404040]">
                These terms are effective as of the date of your booking and remain in effect until the completion of services. 
                We reserve the right to update these terms with reasonable notice.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
} 