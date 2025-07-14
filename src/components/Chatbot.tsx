'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m here to help you with information about our makeup services. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const predefinedResponses: Record<string, string> = {
    // Greetings
    'hello': 'Hello! Welcome to Dollup. How can I help you today?',
    'hi': 'Hi there! I\'m here to help you with any questions about our makeup services.',
    'hey': 'Hey! What can I help you with today?',
    
    // Services
    'services': 'We offer various makeup services including:\n• Bridal Makeup\n• Party Makeup\n• Editorial Makeup\n• Natural Makeup\n• Special Events\n\nWould you like to know more about any specific service?',
    'bridal': 'Our bridal makeup service includes:\n• Consultation and trial\n• Premium products\n• Long-lasting finish\n• Touch-up kit\n• Starting from ₹15,000\n\nWould you like to book a consultation?',
    'party': 'Our party makeup service is perfect for:\n• Birthday parties\n• Cocktail events\n• Date nights\n• Social gatherings\n• Starting from ₹5,000\n\nShall I help you book an appointment?',
    'price': 'Our service prices range from:\n• Natural Makeup: ₹3,000\n• Party Makeup: ₹5,000\n• Editorial Makeup: ₹8,000\n• Bridal Makeup: ₹15,000+\n\nPrices may vary based on specific requirements.',
    'pricing': 'Our service prices range from:\n• Natural Makeup: ₹3,000\n• Party Makeup: ₹5,000\n• Editorial Makeup: ₹8,000\n• Bridal Makeup: ₹15,000+\n\nPrices may vary based on specific requirements.',
    
    // Booking
    'book': 'To book an appointment:\n1. Visit our booking page\n2. Select your preferred service\n3. Choose date and time\n4. Complete payment\n\nWould you like me to direct you to the booking page?',
    'booking': 'To book an appointment:\n1. Visit our booking page\n2. Select your preferred service\n3. Choose date and time\n4. Complete payment\n\nWould you like me to direct you to the booking page?',
    'appointment': 'To schedule an appointment, please visit our booking page or call us at +91 77096 16260. We\'re available Monday to Sunday, 9 AM to 7 PM.',
    
    // Location & Contact
    'location': 'We are located in the heart of the city. For exact address and directions, please contact us at +91 77096 16260 or email i.priyanka.m.16@gmail.com',
    'contact': 'You can reach us:\n📞 Phone: +91 77096 16260\n📧 Email: i.priyanka.m.16@gmail.com\n🕒 Hours: Mon-Sun, 9 AM - 7 PM',
    'phone': 'Our phone number is +91 77096 16260. We\'re available Monday to Sunday, 9 AM to 7 PM.',
    'email': 'You can email us at i.priyanka.m.16@gmail.com for any inquiries.',
    
    // Payment
    'payment': 'We accept:\n• Online payments (Credit/Debit cards)\n• UPI payments\n• Net banking\n• Cash (for in-person consultations)\n\nAll online payments are secure and processed through Razorpay.',
    
    // General
    'help': 'I can help you with:\n• Service information\n• Pricing details\n• Booking appointments\n• Contact information\n• Payment options\n\nWhat would you like to know?',
    'hours': 'We\'re open Monday to Sunday, 9 AM to 7 PM. For appointments outside these hours, please contact us directly.',
    'experience': 'Our team has over 5 years of professional makeup experience and has worked with 500+ happy clients for various occasions including weddings, parties, and photoshoots.',
    
    // Default responses
    'default': 'I\'m not sure about that specific question, but I\'d be happy to help you with information about our services, pricing, or booking. You can also contact us directly at +91 77096 16260 for personalized assistance.'
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();
    
    // Check for exact matches first
    if (predefinedResponses[message]) {
      return predefinedResponses[message];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== 'default' && message.includes(key)) {
        return response;
      }
    }
    
    // Check for common variations
    if (message.includes('cost') || message.includes('rate')) {
      return predefinedResponses['price'];
    }
    
    if (message.includes('schedule') || message.includes('appointment')) {
      return predefinedResponses['appointment'];
    }
    
    if (message.includes('where') || message.includes('address')) {
      return predefinedResponses['location'];
    }
    
    if (message.includes('time') || message.includes('open')) {
      return predefinedResponses['hours'];
    }
    
    return predefinedResponses['default'];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'What services do you offer?',
    'How much does bridal makeup cost?',
    'How can I book an appointment?',
    'What are your contact details?'
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-[#d4a574] text-white p-4 rounded-full shadow-lg hover:bg-[#c4956a] transition-all duration-300 z-50 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-[#e8d5b7] z-50 flex flex-col">
          {/* Header */}
          <div className="bg-[#d4a574] text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Dollup Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#d4a574] text-white'
                      : 'bg-[#f8f6f0] text-[#2c2c2c]'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 text-[#d4a574] mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0 order-2" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.sender === 'user' ? 'text-white' : 'text-[#8b7355]'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#f8f6f0] text-[#2c2c2c] p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-[#d4a574]" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-[#8b7355] mb-2">Quick questions:</p>
              <div className="space-y-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left text-xs text-[#d4a574] hover:text-[#c4956a] transition-colors p-2 hover:bg-[#f8f6f0] rounded"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-[#f0f0f0]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-[#e8d5b7] rounded-lg focus:ring-2 focus:ring-[#d4a574] focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-[#d4a574] text-white p-2 rounded-lg hover:bg-[#c4956a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 