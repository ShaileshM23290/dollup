'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  CreditCard, 
  LogOut,
  Plus,
  Star,
  TrendingUp,
  Edit3,
  Save,
  X,
  Download,
  Filter
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface Booking {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  notes?: string;
  createdAt: string;
  paymentId?: string;
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded';
}

interface Payment {
  _id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  customerEmail: string;
  createdAt: string;
  updatedAt: string;
}

export default function CustomerDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/customer/verify');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setEditedUser(data.user);
          
          // Fetch user's bookings
          const bookingsResponse = await fetch('/api/bookings');
          if (bookingsResponse.ok) {
            const bookingsData = await bookingsResponse.json();
            const userBookings = bookingsData.bookings.filter(
              (booking: Booking) => booking.customerEmail === data.user.email
            );
            setBookings(userBookings);
          }

          // Fetch user's payments
          const paymentsResponse = await fetch('/api/payments');
          if (paymentsResponse.ok) {
            const paymentsData = await paymentsResponse.json();
            const userPayments = paymentsData.payments.filter(
              (payment: Payment) => payment.customerEmail === data.user.email
            );
            setPayments(userPayments);
          }
        } else {
          router.push('/auth/login?redirect=/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/login?redirect=/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/customer/logout', { method: 'POST' });
      localStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileSave = async () => {
    if (!editedUser) return;

    setIsSavingProfile(true);
    try {
      const response = await fetch('/api/auth/customer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: editedUser.firstName,
          lastName: editedUser.lastName,
          phone: editedUser.phone,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user);
        setEditedUser(updatedUser.user);
        setIsEditingProfile(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleProfileCancel = () => {
    setEditedUser(user);
    setIsEditingProfile(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return '✓';
      case 'completed': return '★';
      case 'cancelled': return '✗';
      default: return '⏳';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'card': return '💳';
      case 'upi': return '📱';
      case 'netbanking': return '🏦';
      case 'wallet': return '👛';
      default: return '💰';
    }
  };

  const filteredPayments = payments.filter(payment => {
    if (paymentFilter === 'all') return true;
    return payment.status === paymentFilter;
  });

  const downloadPaymentReceipt = (payment: Payment) => {
    // Create a simple receipt download
    const booking = bookings.find(b => b._id === payment.bookingId);
    const receiptData = {
      paymentId: payment.razorpayPaymentId || payment._id,
      orderId: payment.razorpayOrderId || 'N/A',
      amount: payment.amount,
      service: booking?.service || 'N/A',
      date: new Date(payment.createdAt).toLocaleDateString(),
      status: payment.status
    };
    
    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `receipt_${payment.razorpayPaymentId || payment._id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b7355]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.date) >= new Date() && booking.status !== 'cancelled'
  );

  const completedBookings = bookings.filter(booking => 
    booking.status === 'completed'
  );

  const totalSpent = completedBookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#e8d5b7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-[#4e4528]">
                Dollup
              </Link>
              <div className="h-6 w-px bg-[#e8d5b7]"></div>
              <h1 className="text-xl font-semibold text-[#2c2c2c]">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-[#2c2c2c]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-[#8b7355]">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-[#8b7355] hover:text-[#6b6b6b] transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-[#d4a574] text-white' 
                      : 'text-[#6b6b6b] hover:bg-[#f8f6f0]'
                  }`}
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'bookings' 
                      ? 'bg-[#d4a574] text-white' 
                      : 'text-[#6b6b6b] hover:bg-[#f8f6f0]'
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>My Bookings</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-[#d4a574] text-white' 
                      : 'text-[#6b6b6b] hover:bg-[#f8f6f0]'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'payments' 
                      ? 'bg-[#d4a574] text-white' 
                      : 'text-[#6b6b6b] hover:bg-[#f8f6f0]'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payments</span>
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#f0f0f0]">
                <Link
                  href="/book"
                  className="w-full bg-[#d4a574] text-white py-3 px-4 rounded-lg hover:bg-[#c4956a] transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Book Service</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#8b7355]">Total Bookings</p>
                        <p className="text-2xl font-bold text-[#2c2c2c]">{bookings.length}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-[#d4a574]" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#8b7355]">Upcoming</p>
                        <p className="text-2xl font-bold text-[#2c2c2c]">{upcomingBookings.length}</p>
                      </div>
                      <Clock className="h-8 w-8 text-[#d4a574]" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#8b7355]">Total Spent</p>
                        <p className="text-2xl font-bold text-[#2c2c2c]">₹{totalSpent.toLocaleString()}</p>
                      </div>
                      <CreditCard className="h-8 w-8 text-[#d4a574]" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#8b7355]">Completed</p>
                        <p className="text-2xl font-bold text-[#2c2c2c]">{completedBookings.length}</p>
                      </div>
                      <Star className="h-8 w-8 text-[#d4a574]" />
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                  <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Recent Bookings</h3>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
                      <p className="text-[#8b7355] mb-4">No bookings yet</p>
                      <Link
                        href="/book"
                        className="inline-flex items-center space-x-2 bg-[#d4a574] text-white px-4 py-2 rounded-lg hover:bg-[#c4956a] transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Book Your First Service</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking._id} className="flex items-center justify-between p-4 bg-[#f8f6f0] rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                            </div>
                            <div>
                              <p className="font-medium text-[#2c2c2c]">{booking.service}</p>
                              <p className="text-sm text-[#8b7355]">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-[#2c2c2c]">₹{booking.amount?.toLocaleString() || 'N/A'}</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#2c2c2c]">All Bookings</h3>
                  <Link
                    href="/book"
                    className="bg-[#d4a574] text-white px-4 py-2 rounded-lg hover:bg-[#c4956a] transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Booking</span>
                  </Link>
                </div>
                
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-[#d4a574] mx-auto mb-4" />
                    <p className="text-lg text-[#8b7355] mb-2">No bookings found</p>
                    <p className="text-[#8b7355] mb-6">Start by booking your first service</p>
                    <Link
                      href="/book"
                      className="inline-flex items-center space-x-2 bg-[#d4a574] text-white px-6 py-3 rounded-lg hover:bg-[#c4956a] transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Book Service</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="border border-[#f0f0f0] rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-[#2c2c2c]">{booking.service}</h4>
                            <p className="text-sm text-[#8b7355]">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-[#8b7355]">Amount: <span className="font-medium text-[#2c2c2c]">₹{booking.amount?.toLocaleString() || 'N/A'}</span></p>
                          </div>
                          <div>
                            <p className="text-[#8b7355]">Payment: <span className={`font-medium ${booking.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {booking.paymentStatus || 'pending'}
                            </span></p>
                          </div>
                          <div>
                            <p className="text-[#8b7355]">Booked: <span className="font-medium text-[#2c2c2c]">{new Date(booking.createdAt).toLocaleDateString()}</span></p>
                          </div>
                        </div>
                        
                        {booking.notes && (
                          <div className="mt-3 p-3 bg-[#f8f6f0] rounded-lg">
                            <p className="text-sm text-[#6b6b6b]">{booking.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#2c2c2c]">Profile Information</h3>
                  {!isEditingProfile ? (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center space-x-2 text-[#d4a574] hover:text-[#c4956a] transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleProfileCancel}
                        className="flex items-center space-x-2 text-[#8b7355] hover:text-[#6b6b6b] transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={handleProfileSave}
                        disabled={isSavingProfile}
                        className="flex items-center space-x-2 bg-[#d4a574] text-white px-4 py-2 rounded-lg hover:bg-[#c4956a] transition-colors disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isSavingProfile ? 'Saving...' : 'Save'}</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2c2c2c] mb-2">First Name</label>
                      <input
                        type="text"
                        value={editedUser?.firstName || ''}
                        onChange={(e) => setEditedUser(prev => prev ? {...prev, firstName: e.target.value} : null)}
                        readOnly={!isEditingProfile}
                        className={`w-full px-4 py-3 border border-[#e8d5b7] rounded-lg transition-colors ${
                          isEditingProfile 
                            ? 'bg-white text-[#2c2c2c] focus:ring-2 focus:ring-[#d4a574] focus:border-transparent' 
                            : 'bg-[#f8f6f0] text-[#6b6b6b]'
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Last Name</label>
                      <input
                        type="text"
                        value={editedUser?.lastName || ''}
                        onChange={(e) => setEditedUser(prev => prev ? {...prev, lastName: e.target.value} : null)}
                        readOnly={!isEditingProfile}
                        className={`w-full px-4 py-3 border border-[#e8d5b7] rounded-lg transition-colors ${
                          isEditingProfile 
                            ? 'bg-white text-[#2c2c2c] focus:ring-2 focus:ring-[#d4a574] focus:border-transparent' 
                            : 'bg-[#f8f6f0] text-[#6b6b6b]'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                    <p className="text-xs text-[#8b7355] mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={editedUser?.phone || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, phone: e.target.value} : null)}
                      readOnly={!isEditingProfile}
                      placeholder={!isEditingProfile ? 'Not provided' : 'Enter phone number'}
                      className={`w-full px-4 py-3 border border-[#e8d5b7] rounded-lg transition-colors ${
                        isEditingProfile 
                          ? 'bg-white text-[#2c2c2c] focus:ring-2 focus:ring-[#d4a574] focus:border-transparent' 
                          : 'bg-[#f8f6f0] text-[#6b6b6b]'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Member Since</label>
                    <input
                      type="text"
                      value={new Date(user.createdAt).toLocaleDateString()}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#2c2c2c]">Transaction History</h3>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-[#8b7355]" />
                    <select
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value as 'all' | 'completed' | 'pending' | 'failed')}
                      className="px-3 py-2 border border-[#e8d5b7] rounded-lg text-sm focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    >
                      <option value="all">All Payments</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                {/* Payment Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-700">Completed</p>
                        <p className="text-xl font-bold text-green-800">₹{completedPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                      </div>
                      <div className="text-2xl">✅</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-700">Pending</p>
                        <p className="text-xl font-bold text-yellow-800">₹{pendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                      </div>
                      <div className="text-2xl">⏳</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-700">Total Transactions</p>
                        <p className="text-xl font-bold text-blue-800">{payments.length}</p>
                      </div>
                      <div className="text-2xl">📊</div>
                    </div>
                  </div>
                </div>
                
                {filteredPayments.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 text-[#d4a574] mx-auto mb-4" />
                    <p className="text-lg text-[#8b7355] mb-2">No transactions found</p>
                    <p className="text-[#8b7355]">Your payment history will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPayments.map((payment) => {
                      const booking = bookings.find(b => b._id === payment.bookingId);
                      return (
                        <div key={payment._id} className="border border-[#f0f0f0] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4">
                              <div className="text-2xl">
                                {getPaymentMethodIcon(payment.paymentMethod)}
                              </div>
                              <div>
                                <p className="font-medium text-[#2c2c2c]">
                                  {booking?.service || 'Service Payment'}
                                </p>
                                <p className="text-sm text-[#8b7355]">
                                  {new Date(payment.createdAt).toLocaleDateString()} at {new Date(payment.createdAt).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-[#2c2c2c]">₹{payment.amount.toLocaleString()}</p>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(payment.status)}`}>
                                {payment.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-[#8b7355]">Payment ID: <span className="font-medium text-[#2c2c2c]">{payment.razorpayPaymentId || 'N/A'}</span></p>
                            </div>
                            <div>
                              <p className="text-[#8b7355]">Method: <span className="font-medium text-[#2c2c2c] capitalize">{payment.paymentMethod}</span></p>
                            </div>
                            <div>
                              <p className="text-[#8b7355]">Order ID: <span className="font-medium text-[#2c2c2c]">{payment.razorpayOrderId || 'N/A'}</span></p>
                            </div>
                          </div>
                          
                          {payment.status === 'completed' && (
                            <div className="mt-3 pt-3 border-t border-[#f0f0f0]">
                              <button
                                onClick={() => downloadPaymentReceipt(payment)}
                                className="flex items-center space-x-2 text-[#d4a574] hover:text-[#c4956a] transition-colors"
                              >
                                <Download className="h-4 w-4" />
                                <span>Download Receipt</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 