import Link from 'next/link';
import { FileText, AlertCircle, CreditCard, Calendar, Shield, Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-[#2c2c2c]">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          
          <p className="text-xl text-[#6b6b6b] mb-8 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. By booking with Dollup, you agree to these terms and conditions.
          </p>
          
          <div className="text-sm text-[#6b6b6b]">
            Last updated: January 2024
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Acceptance of Terms */}
            <div className="card-elegant">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-elegant rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#2c2c2c]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Acceptance of Terms</h2>
                  <div className="space-y-4 text-[#6b6b6b]">
                    <p>
                      By accessing our website, booking our services, or engaging with Dollup Makeup Artistry in any capacity, 
                      you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
                    <p>
                      If you do not agree with any part of these terms, please do not use our services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="card-elegant">
              <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Our Services</h2>
              <div className="space-y-4 text-[#6b6b6b]">
                <p>Dollup Makeup Artistry provides professional makeup services including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Bridal makeup and trials</li>
                  <li>Special event makeup</li>
                  <li>Photoshoot and editorial makeup</li>
                  <li>Makeup lessons and consultations</li>
                  <li>Group bookings and parties</li>
                </ul>
                <p>
                  All services are provided by licensed and insured professional makeup artists. 
                  Service availability may vary based on location and scheduling.
                </p>
              </div>
            </div>

            {/* Booking and Payment */}
            <div className="card-elegant">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-elegant rounded-xl flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-[#2c2c2c]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Booking and Payment Terms</h2>
                  <div className="space-y-4 text-[#6b6b6b]">
                    <h3 className="font-semibold text-[#2c2c2c]">Booking Requirements</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>All bookings require a 50% deposit to secure your appointment</li>
                      <li>Remaining balance is due on the day of service</li>
                      <li>We accept cash, credit cards, and digital payments</li>
                      <li>Prices are subject to change with 30 days notice</li>
                    </ul>
                    
                    <h3 className="font-semibold text-[#2c2c2c]">Payment Processing</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>All payments are processed securely through encrypted systems</li>
                      <li>Credit card information is not stored on our servers</li>
                      <li>Receipts will be provided for all transactions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="card-elegant">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-elegant rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-[#2c2c2c]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Cancellation and Rescheduling</h2>
                  <div className="space-y-4 text-[#6b6b6b]">
                    <h3 className="font-semibold text-[#2c2c2c]">Cancellation by Client</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>More than 7 days:</strong> Full refund of deposit</li>
                      <li><strong>3-7 days:</strong> 50% refund of deposit</li>
                      <li><strong>Less than 3 days:</strong> No refund of deposit</li>
                      <li><strong>Same day:</strong> Full service charge applies</li>
                    </ul>
                    
                    <h3 className="font-semibold text-[#2c2c2c]">Rescheduling</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>One free reschedule with 48+ hours notice</li>
                      <li>Additional rescheduling may incur fees</li>
                      <li>Subject to artist availability</li>
                    </ul>
                    
                    <h3 className="font-semibold text-[#2c2c2c]">Force Majeure</h3>
                    <p>
                      In cases of extreme weather, illness, or other circumstances beyond our control, 
                      we will work with you to reschedule without penalty.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Responsibilities */}
            <div className="card-elegant">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-elegant rounded-xl flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-[#2c2c2c]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Client Responsibilities</h2>
                  <div className="space-y-4 text-[#6b6b6b]">
                    <p>To ensure the best service experience, clients agree to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Arrive with clean, moisturized skin</li>
                      <li>Disclose any allergies or skin sensitivities</li>
                      <li>Provide accurate contact and event information</li>
                      <li>Be present and ready at the scheduled appointment time</li>
                      <li>Provide a suitable workspace for on-location services</li>
                      <li>Treat our staff with respect and professionalism</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Liability and Insurance */}
            <div className="card-elegant">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-elegant rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#2c2c2c]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Liability and Insurance</h2>
                  <div className="space-y-4 text-[#6b6b6b]">
                    <h3 className="font-semibold text-[#2c2c2c]">Professional Insurance</h3>
                    <p>
                      Dollup Makeup Artistry maintains professional liability insurance and uses only 
                      high-quality, professional-grade cosmetics.
                    </p>
                    
                    <h3 className="font-semibold text-[#2c2c2c]">Limitation of Liability</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Our liability is limited to the cost of services provided</li>
                      <li>We are not responsible for allergic reactions to disclosed ingredients</li>
                      <li>Clients must inform us of any known allergies or sensitivities</li>
                      <li>We recommend patch testing for sensitive skin</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="card-elegant">
              <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Intellectual Property and Photography</h2>
              <div className="space-y-4 text-[#6b6b6b]">
                <h3 className="font-semibold text-[#2c2c2c]">Photography Rights</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We may photograph our work for portfolio and marketing purposes</li>
                  <li>Client consent will be obtained before using images publicly</li>
                  <li>Clients may request that their images not be used</li>
                  <li>Professional photos may be shared on social media and website</li>
                </ul>
                
                <h3 className="font-semibold text-[#2c2c2c]">Trademark and Copyright</h3>
                <p>
                  All content on our website, including text, images, logos, and designs, 
                  is protected by copyright and trademark laws.
                </p>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="card-elegant">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-elegant rounded-xl flex items-center justify-center">
                  <Scale className="h-6 w-6 text-[#2c2c2c]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Dispute Resolution</h2>
                  <div className="space-y-4 text-[#6b6b6b]">
                    <p>
                      We are committed to resolving any issues promptly and fairly. In the event of a dispute:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Contact us immediately to discuss the issue</li>
                      <li>We will work in good faith to reach a resolution</li>
                      <li>Disputes will be governed by India State law</li>
                      <li>Any legal proceedings will be conducted in India courts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card-elegant bg-gradient-soft">
              <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Questions About These Terms?</h2>
              <div className="space-y-4 text-[#6b6b6b]">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@dollup.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> India, IN</p>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="card-elegant">
              <h2 className="text-2xl font-bold text-[#2c2c2c] mb-4">Changes to Terms</h2>
              <p className="text-[#6b6b6b]">
                We reserve the right to modify these terms at any time. Changes will be posted on this page 
                with an updated revision date. Continued use of our services after changes constitutes acceptance 
                of the new terms.
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link href="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 