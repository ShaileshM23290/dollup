'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  CreditCard,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function BookingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // 1: Service Selection, 2: Booking Details, 3: Payment
  const [bookingId, setBookingId] = useState('');
  const router = useRouter();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/customer/verify');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data.services);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    checkAuth();
    fetchServices();
  }, []);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, service: service.name }));
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth/login?redirect=/book');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const bookingData = {
        customerName: `${user.firstName} ${user.lastName}`,
        customerEmail: user.email,
        customerPhone: user.phone,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        amount: selectedService?.price || 0
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingId(data.booking._id);
        setStep(3);
      } else {
        setError(data.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedService || !bookingId) return;

    setIsLoading(true);
    setError('');

    try {
      // Create payment order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          amount: selectedService.price,
          currency: 'INR'
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        setError(orderData.error || 'Failed to create payment order');
        setIsLoading(false);
        return;
      }

      // Initialize Razorpay payment
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Dollup',
        description: `Payment for ${selectedService.name}`,
        order_id: orderData.order.id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: orderData.paymentId
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              setSuccess('Payment successful! Your booking is confirmed.');
              setTimeout(() => {
                router.push('/dashboard');
              }, 3000);
            } else {
              setError(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setError('Payment verification failed');
          }
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
          contact: user?.phone
        },
        theme: {
          color: '#d4a574'
        },
        modal: {
          ondismiss: () => {
            setError('Payment was cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment initialization error:', error);
      setError('Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#d4a574] mx-auto mb-4" />
          <p className="text-[#8b7355]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#e8d5b7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-[#4e4528]">
              Dollup
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-[#8b7355]">Welcome, {user.firstName}</span>
                  <Link
                    href="/dashboard"
                    className="bg-[#d4a574] text-white px-4 py-2 rounded-lg hover:bg-[#c4956a] transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/auth/login?redirect=/book"
                  className="bg-[#d4a574] text-white px-4 py-2 rounded-lg hover:bg-[#c4956a] transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { num: 1, label: 'Select Service' },
              { num: 2, label: 'Booking Details' },
              { num: 3, label: 'Payment' }
            ].map((stepItem) => (
              <div key={stepItem.num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepItem.num 
                    ? 'bg-[#d4a574] text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > stepItem.num ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    stepItem.num
                  )}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepItem.num ? 'text-[#2c2c2c]' : 'text-gray-500'
                }`}>
                  {stepItem.label}
                </span>
                {stepItem.num < 3 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
            <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6">Select a Service</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  onClick={() => handleServiceSelect(service)}
                  className="border border-[#e8d5b7] rounded-lg p-6 cursor-pointer hover:border-[#d4a574] hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-[#2c2c2c]">{service.name}</h3>
                    <span className="text-xl font-bold text-[#d4a574]">₹{service.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-[#8b7355]">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-[#8b7355]">
                      <span className="px-2 py-1 bg-[#f8f6f0] rounded-full text-xs">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-[#6b6b6b] text-sm mb-4">{service.description}</p>
                  
                  <button className="w-full bg-[#d4a574] text-white py-2 px-4 rounded-lg hover:bg-[#c4956a] transition-colors">
                    Select Service
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Booking Details */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
            <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6">Booking Details</h2>

            {/* Selected Service Summary */}
            {selectedService && (
              <div className="bg-[#f8f6f0] rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-[#2c2c2c] mb-2">Selected Service</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-[#2c2c2c]">{selectedService.name}</p>
                    <p className="text-sm text-[#8b7355]">{selectedService.duration}</p>
                  </div>
                  <p className="text-lg font-bold text-[#d4a574]">₹{selectedService.price.toLocaleString()}</p>
                </div>
              </div>
            )}

            {!user ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
                <p className="text-[#8b7355] mb-4">Please login to continue with booking</p>
                <Link
                  href="/auth/login?redirect=/book"
                  className="bg-[#d4a574] text-white px-6 py-3 rounded-lg hover:bg-[#c4956a] transition-colors"
                >
                  Login to Continue
                </Link>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* Customer Info (Read-only) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={`${user.firstName} ${user.lastName}`}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={user.phone || ''}
                    readOnly
                    className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                  />
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                    Special Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or notes..."
                    className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-[#e8d5b7] text-[#6b6b6b] rounded-lg hover:bg-[#f8f6f0] transition-colors"
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-[#d4a574] text-white rounded-lg hover:bg-[#c4956a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Payment</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
            <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6">Payment</h2>

            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">Payment Successful!</h3>
                <p className="text-[#8b7355] mb-4">{success}</p>
                <p className="text-sm text-[#8b7355]">Redirecting to dashboard...</p>
              </div>
            ) : (
              <>
                {/* Payment Summary */}
                {selectedService && (
                  <div className="bg-[#f8f6f0] rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-[#2c2c2c] mb-4">Payment Summary</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Service</span>
                        <span className="text-[#2c2c2c]">{selectedService.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Duration</span>
                        <span className="text-[#2c2c2c]">{selectedService.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Date & Time</span>
                        <span className="text-[#2c2c2c]">
                          {new Date(formData.date).toLocaleDateString()} at {formData.time}
                        </span>
                      </div>
                      <div className="border-t border-[#e8d5b7] pt-3">
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-[#2c2c2c]">Total Amount</span>
                          <span className="text-[#d4a574]">₹{selectedService.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 mb-6">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-[#e8d5b7] text-[#6b6b6b] rounded-lg hover:bg-[#f8f6f0] transition-colors"
                  >
                    Back
                  </button>
                  
                  <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="px-6 py-3 bg-[#d4a574] text-white rounded-lg hover:bg-[#c4956a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        <span>Pay Now</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 