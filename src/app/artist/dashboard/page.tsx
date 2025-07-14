'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  CreditCard, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
  Palette,
  Image,
  Edit
} from 'lucide-react';

interface Artist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  experience: number;
  specializations: string[];
  location: string;
  isApproved: boolean;
  averageRating: number;
  totalBookings: number;
  totalEarnings: number;
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
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  amount: number;
  notes?: string;
  createdAt: string;
}

export default function ArtistDashboard() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/artist/verify');
        if (response.ok) {
          const data = await response.json();
          setArtist(data.artist);
          
          // Fetch artist's bookings (this would need to be implemented)
          // For now, we'll use empty array
          setBookings([]);
        } else {
          router.push('/artist/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/artist/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/artist/logout', { method: 'POST' });
      localStorage.removeItem('artist');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <Star className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
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

  if (!artist) {
    return null;
  }

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.date) >= new Date() && booking.status !== 'cancelled'
  );

  const completedBookings = bookings.filter(booking => 
    booking.status === 'completed'
  );

  const monthlyEarnings = completedBookings
    .filter(booking => {
      const bookingDate = new Date(booking.date);
      const currentDate = new Date();
      return bookingDate.getMonth() === currentDate.getMonth() && 
             bookingDate.getFullYear() === currentDate.getFullYear();
    })
    .reduce((sum, booking) => sum + (booking.amount || 0), 0);

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
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-[#d4a574]" />
                <h1 className="text-xl font-semibold text-[#2c2c2c]">Artist Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!artist.isApproved && (
                <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Pending Approval</span>
                </div>
              )}
              
              <div className="text-right">
                <p className="text-sm font-medium text-[#2c2c2c]">
                  {artist.firstName} {artist.lastName}
                </p>
                <p className="text-xs text-[#8b7355]">{artist.email}</p>
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
        {/* Approval Status Banner */}
        {!artist.isApproved && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Account Pending Approval</h3>
                <p className="text-yellow-700">
                  Your artist account is currently under review. You'll receive an email notification once approved.
                  In the meantime, you can update your profile and portfolio.
                </p>
              </div>
            </div>
          </div>
        )}

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
                  <span>Bookings</span>
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
                  onClick={() => setActiveTab('portfolio')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'portfolio' 
                      ? 'bg-[#d4a574] text-white' 
                      : 'text-[#6b6b6b] hover:bg-[#f8f6f0]'
                  }`}
                >
                  <Image className="h-5 w-5" />
                  <span>Portfolio</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'services' 
                      ? 'bg-[#d4a574] text-white' 
                      : 'text-[#6b6b6b] hover:bg-[#f8f6f0]'
                  }`}
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Services</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('earnings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'earnings' 
                      ? 'bg-[#d4a574] text-white' 
                      : 'text-[#6b6b6b] hover:bg-[#f8f6f0]'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Earnings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#8b7355]">Total Bookings</p>
                        <p className="text-2xl font-bold text-[#2c2c2c]">{artist.totalBookings}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-[#d4a574]" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#8b7355]">This Month</p>
                        <p className="text-2xl font-bold text-[#2c2c2c]">₹{monthlyEarnings.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-[#d4a574]" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#8b7355]">Average Rating</p>
                        <div className="flex items-center space-x-1">
                          <p className="text-2xl font-bold text-[#2c2c2c]">{artist.averageRating.toFixed(1)}</p>
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        </div>
                      </div>
                      <Star className="h-8 w-8 text-[#d4a574]" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                  <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Recent Activity</h3>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
                      <p className="text-[#8b7355] mb-2">No bookings yet</p>
                      <p className="text-sm text-[#8b7355]">Your bookings will appear here once customers start booking your services</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.slice(0, 5).map((booking) => (
                        <div key={booking._id} className="flex items-center justify-between p-4 bg-[#f8f6f0] rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                            </div>
                            <div>
                              <p className="font-medium text-[#2c2c2c]">{booking.customerName}</p>
                              <p className="text-sm text-[#8b7355]">
                                {booking.service} • {new Date(booking.date).toLocaleDateString()} at {booking.time}
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

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#2c2c2c]">Profile Information</h3>
                  <button className="flex items-center space-x-2 text-[#d4a574] hover:text-[#c4956a] transition-colors">
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2c2c2c] mb-2">First Name</label>
                      <input
                        type="text"
                        value={artist.firstName}
                        readOnly
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Last Name</label>
                      <input
                        type="text"
                        value={artist.lastName}
                        readOnly
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Email Address</label>
                    <input
                      type="email"
                      value={artist.email}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={artist.phone || 'Not provided'}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Location</label>
                    <input
                      type="text"
                      value={artist.location || 'Not provided'}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Experience</label>
                    <input
                      type="text"
                      value={`${artist.experience} years`}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Specializations</label>
                    <div className="flex flex-wrap gap-2">
                      {artist.specializations.map((spec, index) => (
                        <span key={index} className="px-3 py-1 bg-[#d4a574] text-white rounded-full text-sm capitalize">
                          {spec.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Bio</label>
                    <textarea
                      value={artist.bio || 'No bio provided'}
                      readOnly
                      rows={4}
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Member Since</label>
                    <input
                      type="text"
                      value={new Date(artist.createdAt).toLocaleDateString()}
                      readOnly
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-lg bg-[#f8f6f0] text-[#6b6b6b]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                <h3 className="text-lg font-semibold text-[#2c2c2c] mb-6">My Bookings</h3>
                
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-[#d4a574] mx-auto mb-4" />
                    <p className="text-lg text-[#8b7355] mb-2">No bookings yet</p>
                    <p className="text-[#8b7355]">Your bookings will appear here once customers start booking your services</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="border border-[#f0f0f0] rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-[#2c2c2c]">{booking.customerName}</h4>
                            <p className="text-sm text-[#8b7355]">{booking.service}</p>
                            <p className="text-sm text-[#8b7355]">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-[#8b7355]">Email: <span className="text-[#2c2c2c]">{booking.customerEmail}</span></p>
                          </div>
                          <div>
                            <p className="text-[#8b7355]">Phone: <span className="text-[#2c2c2c]">{booking.customerPhone}</span></p>
                          </div>
                          <div>
                            <p className="text-[#8b7355]">Amount: <span className="font-medium text-[#2c2c2c]">₹{booking.amount?.toLocaleString() || 'N/A'}</span></p>
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

            {activeTab === 'earnings' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                <h3 className="text-lg font-semibold text-[#2c2c2c] mb-6">Earnings Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-[#f8f6f0] rounded-lg p-4">
                    <h4 className="font-medium text-[#2c2c2c] mb-2">Total Earnings</h4>
                    <p className="text-2xl font-bold text-[#d4a574]">₹{artist.totalEarnings.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-[#f8f6f0] rounded-lg p-4">
                    <h4 className="font-medium text-[#2c2c2c] mb-2">This Month</h4>
                    <p className="text-2xl font-bold text-[#d4a574]">₹{monthlyEarnings.toLocaleString()}</p>
                  </div>
                </div>
                
                {completedBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-[#d4a574] mx-auto mb-4" />
                    <p className="text-[#8b7355]">No earnings yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="font-medium text-[#2c2c2c]">Recent Payments</h4>
                    {completedBookings.slice(0, 10).map((booking) => (
                      <div key={booking._id} className="flex items-center justify-between p-4 border border-[#f0f0f0] rounded-lg">
                        <div>
                          <p className="font-medium text-[#2c2c2c]">{booking.service}</p>
                          <p className="text-sm text-[#8b7355]">
                            {booking.customerName} • {new Date(booking.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#2c2c2c]">₹{booking.amount?.toLocaleString() || 'N/A'}</p>
                          <p className="text-sm text-green-600">Completed</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === 'portfolio' || activeTab === 'services') && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
                <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">
                  {activeTab === 'portfolio' ? 'Portfolio Management' : 'Services Management'}
                </h3>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#f8f6f0] rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeTab === 'portfolio' ? (
                      <Image className="h-8 w-8 text-[#d4a574]" />
                    ) : (
                      <Briefcase className="h-8 w-8 text-[#d4a574]" />
                    )}
                  </div>
                  <p className="text-[#8b7355] mb-4">
                    {activeTab === 'portfolio' 
                      ? 'Portfolio management coming soon' 
                      : 'Services management coming soon'
                    }
                  </p>
                  <p className="text-sm text-[#8b7355]">
                    This feature will be available once your account is approved
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 