'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Crown,
  Camera,
  Sparkles,
  Gift,
  Users,
  Palette,
  Info
} from 'lucide-react';

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    duration: '',
    price: '',
    addOns: [] as string[],
    clientInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    eventDetails: {
      eventType: '',
      venue: '',
      guestCount: '',
      specialRequests: ''
    },
    paymentInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  const services = [
    {
      id: 'bridal',
      icon: Crown,
      title: 'Bridal Makeup',
      description: 'Complete bridal makeup package with trial session',
      price: 350,
      duration: '3-4 hours',
      includes: ['Trial session', 'Wedding day application', 'Touch-up kit', 'False lashes'],
      popular: true
    },
    {
      id: 'photoshoot',
      icon: Camera,
      title: 'Photoshoot Makeup',
      description: 'Professional makeup for photography and videography',
      price: 200,
      duration: '2-3 hours',
      includes: ['HD makeup', 'Multiple looks', 'Touch-ups during shoot']
    },
    {
      id: 'events',
      icon: Sparkles,
      title: 'Special Events',
      description: 'Glamorous looks for parties, galas, and celebrations',
      price: 150,
      duration: '1.5-2 hours',
      includes: ['Custom consultation', 'Premium products', 'Setting spray']
    },
    {
      id: 'lessons',
      icon: Gift,
      title: 'Makeup Lessons',
      description: 'Learn professional techniques with personalized instruction',
      price: 120,
      duration: '2 hours',
      includes: ['One-on-one tutorial', 'Product recommendations', 'Take-home guide']
    },
    {
      id: 'group',
      icon: Users,
      title: 'Group Bookings',
      description: 'Perfect for bridal parties and group events',
      price: 100,
      duration: '1 hour per person',
      includes: ['On-location service', 'Individual consultations', 'Group coordination']
    },
    {
      id: 'consultation',
      icon: Palette,
      title: 'Color Consultation',
      description: 'Discover your perfect color palette and style',
      price: 80,
      duration: '1 hour',
      includes: ['Skin tone analysis', 'Color recommendations', 'Shopping guide']
    }
  ];

  const addOns = [
    { id: 'lashes', name: 'False Lashes', price: 25 },
    { id: 'airbrush', name: 'Airbrush Makeup', price: 50 },
    { id: 'contouring', name: 'Advanced Contouring', price: 30 },
    { id: 'travel', name: 'Travel Fee (within 25 miles)', price: 50 },
    { id: 'early', name: 'Early Morning Fee (before 7 AM)', price: 75 },
    { id: 'touchup', name: 'Additional Touch-up Kit', price: 40 }
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  const handleServiceSelect = (service: { id: string; price: number; duration: string }) => {
    setBookingData(prev => ({
      ...prev,
      service: service.id,
      price: service.price.toString(),
      duration: service.duration
    }));
  };

  const handleAddOnToggle = (addOn: { id: string; name: string; price: number }) => {
    setBookingData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOn.id)
        ? prev.addOns.filter(id => id !== addOn.id)
        : [...prev.addOns, addOn.id]
    }));
  };

  const calculateTotal = () => {
    const basePrice = parseInt(bookingData.price) || 0;
    const addOnTotal = bookingData.addOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return basePrice + addOnTotal;
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare booking data for API
      const selectedService = services.find(s => s.id === bookingData.service);
      const selectedAddOns = addOns.filter(addOn => bookingData.addOns.includes(addOn.id));
      
      const submissionData = {
        firstName: bookingData.clientInfo.firstName,
        lastName: bookingData.clientInfo.lastName,
        email: bookingData.clientInfo.email,
        phone: bookingData.clientInfo.phone,
        eventDate: bookingData.date,
        eventTime: bookingData.time,
        serviceType: selectedService?.title || bookingData.service,
        eventType: bookingData.eventDetails.eventType,
        location: bookingData.eventDetails.venue || `${bookingData.clientInfo.address}, ${bookingData.clientInfo.city}, ${bookingData.clientInfo.state}`,
        numberOfPeople: parseInt(bookingData.eventDetails.guestCount) || 1,
        additionalServices: selectedAddOns.map(addOn => addOn.name),
        specialRequests: bookingData.eventDetails.specialRequests,
        budget: calculateTotal()
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Booking created successfully:', result);
        setCurrentStep(5); // Confirmation step
      } else {
        const error = await response.json();
        console.error('Booking submission failed:', error);
        alert('Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const steps = [
    { number: 1, title: 'Service', description: 'Choose your service' },
    { number: 2, title: 'Date & Time', description: 'Select appointment' },
    { number: 3, title: 'Details', description: 'Your information' },
    { number: 4, title: 'Payment', description: 'Secure checkout' },
    { number: 5, title: 'Confirmation', description: 'Booking complete' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#2c2c2c]">
              Book Your <span className="text-gradient">Session</span>
            </h1>
            <p className="text-xl text-[#6b6b6b] max-w-3xl mx-auto">
              Ready to look absolutely stunning? Let&apos;s create the perfect look for your special occasion.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold ${
                    currentStep >= step.number 
                      ? 'bg-gradient-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-[#2c2c2c]' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 h-0.5 ml-6 ${
                      currentStep > step.number ? 'bg-[#d4a574]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#2c2c2c]">Choose Your Service</h2>
                <p className="text-[#6b6b6b]">Select the makeup service that best fits your needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isSelected = bookingData.service === service.id;
                  
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`card-elegant cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'ring-2 ring-[#d4a574] bg-gradient-soft' 
                          : 'hover:shadow-elegant-hover'
                      } ${service.popular ? 'relative' : ''}`}
                    >
                      {service.popular && (
                        <div className="absolute -top-3 left-6 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-gradient-primary' : 'bg-gradient-elegant'
                        }`}>
                          <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-[#2c2c2c]'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-[#2c2c2c]">{service.title}</h3>
                          <p className="text-[#6b6b6b] mb-4">{service.description}</p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-gradient">₹{service.price}</span>
                            <span className="text-sm text-[#6b6b6b]">{service.duration}</span>
                          </div>
                          
                          <div className="space-y-1">
                            {service.includes.map((item, index) => (
                              <div key={index} className="flex items-center text-sm text-[#6b6b6b]">
                                <CheckCircle className="h-3 w-3 text-[#d4a574] mr-2" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add-ons */}
              {bookingData.service && (
                <div className="card-elegant">
                  <h3 className="text-xl font-semibold mb-6 text-[#2c2c2c]">Add-On Services</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addOns.map((addOn) => {
                      const isSelected = bookingData.addOns.includes(addOn.id);
                      
                      return (
                        <div
                          key={addOn.id}
                          onClick={() => handleAddOnToggle(addOn)}
                          className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'border-[#d4a574] bg-gradient-soft' 
                              : 'border-[#e8d5b7] hover:border-[#d4a574]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-[#2c2c2c]">{addOn.name}</span>
                            <span className="text-[#d4a574] font-semibold">+₹{addOn.price}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {bookingData.service && (
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-[#2c2c2c]">
                    Total: <span className="text-gradient">₹{calculateTotal()}</span>
                  </div>
                  <button onClick={nextStep} className="btn-primary inline-flex items-center space-x-2">
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#2c2c2c]">Select Date & Time</h2>
                <p className="text-[#6b6b6b]">Choose your preferred appointment date and time</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div className="card-elegant">
                  <h3 className="text-xl font-semibold mb-6 text-[#2c2c2c] flex items-center">
                    <Calendar className="h-5 w-5 text-[#d4a574] mr-2" />
                    Select Date
                  </h3>
                  
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                  />
                  
                  <div className="mt-4 p-4 bg-gradient-soft rounded-xl">
                    <div className="flex items-center text-sm text-[#6b6b6b]">
                      <Info className="h-4 w-4 mr-2" />
                      <span>We recommend booking at least 2 weeks in advance</span>
                    </div>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="card-elegant">
                  <h3 className="text-xl font-semibold mb-6 text-[#2c2c2c] flex items-center">
                    <Clock className="h-5 w-5 text-[#d4a574] mr-2" />
                    Select Time
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setBookingData(prev => ({ ...prev, time }))}
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                          bookingData.time === time
                            ? 'border-[#d4a574] bg-gradient-soft text-[#2c2c2c]'
                            : 'border-[#e8d5b7] hover:border-[#d4a574] text-[#6b6b6b]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-secondary inline-flex items-center space-x-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back</span>
                </button>
                
                {bookingData.date && bookingData.time && (
                  <button onClick={nextStep} className="btn-primary inline-flex items-center space-x-2">
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Client Information */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#2c2c2c]">Your Information</h2>
                <p className="text-[#6b6b6b]">Please provide your contact and event details</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="card-elegant">
                  <h3 className="text-xl font-semibold mb-6 text-[#2c2c2c] flex items-center">
                    <User className="h-5 w-5 text-[#d4a574] mr-2" />
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={bookingData.clientInfo.firstName}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          clientInfo: { ...prev.clientInfo, firstName: e.target.value }
                        }))}
                        className="px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={bookingData.clientInfo.lastName}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          clientInfo: { ...prev.clientInfo, lastName: e.target.value }
                        }))}
                        className="px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      />
                    </div>
                    
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={bookingData.clientInfo.email}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        clientInfo: { ...prev.clientInfo, email: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={bookingData.clientInfo.phone}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        clientInfo: { ...prev.clientInfo, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Event Details */}
                <div className="card-elegant">
                  <h3 className="text-xl font-semibold mb-6 text-[#2c2c2c] flex items-center">
                    <Sparkles className="h-5 w-5 text-[#d4a574] mr-2" />
                    Event Details
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Event Type (e.g., Wedding, Photoshoot)"
                      value={bookingData.eventDetails.eventType}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        eventDetails: { ...prev.eventDetails, eventType: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    />
                    
                    <input
                      type="text"
                      placeholder="Venue/Location"
                      value={bookingData.eventDetails.venue}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        eventDetails: { ...prev.eventDetails, venue: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    />
                    
                    <textarea
                      placeholder="Special requests or notes"
                      rows={4}
                      value={bookingData.eventDetails.specialRequests}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        eventDetails: { ...prev.eventDetails, specialRequests: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-secondary inline-flex items-center space-x-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back</span>
                </button>
                
                <button onClick={nextStep} className="btn-primary inline-flex items-center space-x-2">
                  <span>Continue</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#2c2c2c]">Payment Information</h2>
                <p className="text-[#6b6b6b]">Secure payment to confirm your booking</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Payment Form */}
                <div className="card-elegant">
                  <h3 className="text-xl font-semibold mb-6 text-[#2c2c2c] flex items-center">
                    <CreditCard className="h-5 w-5 text-[#d4a574] mr-2" />
                    Payment Details
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      />
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Name on Card"
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-soft rounded-xl">
                    <div className="flex items-center text-sm text-[#6b6b6b]">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="card-elegant">
                  <h3 className="text-xl font-semibold mb-6 text-[#2c2c2c]">Booking Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#6b6b6b]">Service:</span>
                      <span className="font-medium text-[#2c2c2c]">
                        {services.find(s => s.id === bookingData.service)?.title}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-[#6b6b6b]">Date:</span>
                      <span className="font-medium text-[#2c2c2c]">{bookingData.date}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-[#6b6b6b]">Time:</span>
                      <span className="font-medium text-[#2c2c2c]">{bookingData.time}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-[#6b6b6b]">Duration:</span>
                      <span className="font-medium text-[#2c2c2c]">{bookingData.duration}</span>
                    </div>
                    
                    {bookingData.addOns.length > 0 && (
                      <div>
                        <div className="text-[#6b6b6b] mb-2">Add-ons:</div>
                        {bookingData.addOns.map(addOnId => {
                          const addOn = addOns.find(a => a.id === addOnId);
                          return (
                            <div key={addOnId} className="flex justify-between text-sm">
                              <span className="text-[#6b6b6b]">• {addOn?.name}</span>
                              <span className="text-[#2c2c2c]">+₹{addOn?.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    <div className="border-t border-[#e8d5b7] pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span className="text-[#2c2c2c]">Total:</span>
                        <span className="text-gradient">₹{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-secondary inline-flex items-center space-x-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back</span>
                </button>
                
                <button onClick={handleSubmit} className="btn-primary inline-flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Complete Booking</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="text-center space-y-8">
              <div className="card-elegant max-w-2xl mx-auto">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                
                <h2 className="text-3xl font-bold mb-4 text-[#2c2c2c]">Booking Confirmed!</h2>
                
                <p className="text-xl text-[#6b6b6b] mb-8">
                  Thank you for choosing Dollup! Your appointment has been successfully booked.
                </p>
                
                <div className="bg-gradient-soft p-6 rounded-2xl mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-[#2c2c2c]">Appointment Details</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-[#6b6b6b]">Service:</span>
                      <span className="font-medium text-[#2c2c2c]">
                        {services.find(s => s.id === bookingData.service)?.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6b6b6b]">Date & Time:</span>
                      <span className="font-medium text-[#2c2c2c]">
                        {bookingData.date} at {bookingData.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6b6b6b]">Total Paid:</span>
                      <span className="font-bold text-gradient">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-[#6b6b6b]">
                    A confirmation email has been sent to {bookingData.clientInfo.email}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="btn-primary">
                      Return Home
                    </Link>
                    <Link href="/contact" className="btn-secondary">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 