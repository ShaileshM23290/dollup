'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  Users, 
  Search, 
  Eye, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  bookingStats: {
    totalBookings: number;
    totalSpent: number;
    lastBooking: string;
    completedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
  };
  recentBookings: Array<{
    _id: string;
    eventDate: string;
    serviceType: string;
    status: string;
    totalAmount: number;
  }>;
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const itemsPerPage = 12;

  const sortOptions = [
    { value: 'createdAt', label: 'Join Date' },
    { value: 'bookingStats.totalSpent', label: 'Total Spent' },
    { value: 'bookingStats.totalBookings', label: 'Total Bookings' },
    { value: 'bookingStats.lastBooking', label: 'Last Booking' },
    { value: 'firstName', label: 'Name' }
  ];

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    filterAndSortClients();
  }, [clients, searchTerm, sortBy, sortOrder]);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients);
      } else {
        console.error('Failed to fetch clients');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
    setLoading(false);
  };

  const filterAndSortClients = () => {
    let filtered = clients;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;

      if (sortBy.includes('.')) {
        const keys = sortBy.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        aValue = keys.reduce((obj: Record<string, any>, key: string) => obj?.[key], a as Record<string, any>);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        bValue = keys.reduce((obj: Record<string, any>, key: string) => obj?.[key], b as Record<string, any>);
      } else {
        aValue = a[sortBy as keyof Client];
        bValue = b[sortBy as keyof Client];
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredClients(filtered);
    setCurrentPage(1);
  };

  const handleViewClient = async (clientId: string) => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedClient(data.client);
        setShowModal(true);
      } else {
        console.error('Failed to fetch client details');
      }
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientTier = (totalSpent: number) => {
    if (totalSpent >= 50000) return { tier: 'VIP', color: 'text-purple-600 bg-purple-100' };
    if (totalSpent >= 20000) return { tier: 'Gold', color: 'text-yellow-600 bg-yellow-100' };
    if (totalSpent >= 10000) return { tier: 'Silver', color: 'text-gray-600 bg-gray-100' };
    return { tier: 'Bronze', color: 'text-amber-600 bg-amber-100' };
  };

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const stats = {
    total: clients.length,
    totalRevenue: clients.reduce((sum, c) => sum + (c.bookingStats?.totalSpent || 0), 0),
    averageSpent: clients.length > 0 ? clients.reduce((sum, c) => sum + (c.bookingStats?.totalSpent || 0), 0) / clients.length : 0,
    activeClients: clients.filter(c => c.bookingStats?.lastBooking && 
      new Date(c.bookingStats.lastBooking) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)).length
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#d4a574]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#2c2c2c]">Client Management</h1>
            <p className="text-[#6b6b6b] mt-2">Manage customer profiles and relationships</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Total Clients</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-[#d4a574]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Avg. Spent</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{formatCurrency(stats.averageSpent)}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Active Clients</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{stats.activeClients}</p>
                <p className="text-xs text-[#6b6b6b]">Last 90 days</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b6b6b] h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="w-full pl-10 pr-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-32">
              <select
                className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#f0f0f0] overflow-hidden">
          {paginatedClients.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-[#6b6b6b] mx-auto mb-4" />
              <p className="text-[#6b6b6b] text-lg">No clients found</p>
              <p className="text-[#6b6b6b] text-sm mt-2">Clients will appear here as they register</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {paginatedClients.map((client) => {
                  const tier = getClientTier(client.bookingStats?.totalSpent || 0);
                  
                  return (
                    <div key={client._id} className="bg-white border border-[#e8d5b7] rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-[#d4a574] text-white rounded-full flex items-center justify-center font-medium">
                            {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#2c2c2c]">
                              {client.firstName} {client.lastName}
                            </h3>
                            <p className="text-sm text-[#6b6b6b]">{client.email}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tier.color}`}>
                          {tier.tier}
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#6b6b6b]">Total Spent:</span>
                          <span className="font-medium text-[#2c2c2c]">
                            {formatCurrency(client.bookingStats?.totalSpent || 0)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#6b6b6b]">Bookings:</span>
                          <span className="font-medium text-[#2c2c2c]">
                            {client.bookingStats?.totalBookings || 0}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#6b6b6b]">Joined:</span>
                          <span className="font-medium text-[#2c2c2c]">
                            {formatDate(client.createdAt)}
                          </span>
                        </div>

                        {client.bookingStats?.lastBooking && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#6b6b6b]">Last Booking:</span>
                            <span className="font-medium text-[#2c2c2c]">
                              {formatDate(client.bookingStats.lastBooking)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewClient(client._id)}
                          className="flex-1 bg-[#d4a574] text-white py-2 px-4 rounded-lg hover:bg-[#c4956a] transition-colors text-sm flex items-center justify-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                        
                        <a
                          href={`mailto:${client.email}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Send Email"
                        >
                          <Mail className="h-4 w-4" />
                        </a>

                        {client.phone && (
                          <a
                            href={`tel:${client.phone}`}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                            title="Call"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 p-6 border-t border-[#f0f0f0]">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-[#e8d5b7] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8f6f0]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <span className="px-4 py-2 text-sm text-[#6b6b6b]">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-[#e8d5b7] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8f6f0]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Client Details Modal */}
        {showModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2c2c2c]">Client Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client Info */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-gradient-to-br from-[#f8f6f0] to-[#e8d5b7] p-6 rounded-xl">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-[#d4a574] text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {selectedClient.firstName.charAt(0)}{selectedClient.lastName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#2c2c2c]">
                          {selectedClient.firstName} {selectedClient.lastName}
                        </h3>
                        <p className="text-[#6b6b6b]">{selectedClient.email}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {selectedClient.phone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-[#d4a574]" />
                          <span className="text-[#2c2c2c]">{selectedClient.phone}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-[#d4a574]" />
                        <span className="text-[#2c2c2c]">Joined {formatDate(selectedClient.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-white border border-[#e8d5b7] rounded-xl p-6">
                    <h4 className="font-semibold text-[#2c2c2c] mb-4">Client Statistics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Total Spent:</span>
                        <span className="font-bold text-[#2c2c2c]">
                          {formatCurrency(selectedClient.bookingStats?.totalSpent || 0)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Total Bookings:</span>
                        <span className="font-bold text-[#2c2c2c]">
                          {selectedClient.bookingStats?.totalBookings || 0}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Completed:</span>
                        <span className="text-green-600 font-medium">
                          {selectedClient.bookingStats?.completedBookings || 0}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Pending:</span>
                        <span className="text-yellow-600 font-medium">
                          {selectedClient.bookingStats?.pendingBookings || 0}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Cancelled:</span>
                        <span className="text-red-600 font-medium">
                          {selectedClient.bookingStats?.cancelledBookings || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking History */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-[#2c2c2c] mb-4">Recent Bookings</h4>
                  {selectedClient.recentBookings && selectedClient.recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {selectedClient.recentBookings.map((booking) => (
                        <div key={booking._id} className="bg-white border border-[#e8d5b7] rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Calendar className="h-5 w-5 text-[#d4a574]" />
                              <div>
                                <p className="font-medium text-[#2c2c2c]">{booking.serviceType}</p>
                                <p className="text-sm text-[#6b6b6b]">
                                  {formatDate(booking.eventDate)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                              <p className="text-sm text-[#6b6b6b] mt-1">
                                {formatCurrency(booking.totalAmount)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#6b6b6b]">
                      <Calendar className="h-8 w-8 mx-auto mb-2" />
                      <p>No booking history available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 