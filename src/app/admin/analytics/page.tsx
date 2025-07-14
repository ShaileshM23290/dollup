'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Users, 
  MessageSquare,
  BarChart3,
  PieChart,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  summary: {
    totalBookings: number;
    totalRevenue: number;
    totalCustomers: number;
    totalMessages: number;
    conversionRate: number;
  };
  revenueData: Array<{
    _id: { year: number; month: number; day: number };
    revenue: number;
    bookings: number;
  }>;
  servicePopularity: Array<{
    _id: string;
    count: number;
    revenue: number;
  }>;
  bookingStats: Array<{
    _id: string;
    count: number;
    totalAmount: number;
  }>;
  monthlyTrends: Array<{
    _id: { year: number; month: number };
    bookings: number;
    revenue: number;
  }>;
  contactStats: Array<{
    _id: string;
    count: number;
  }>;
  customerStats: Array<{
    _id: { year: number; month: number };
    newCustomers: number;
  }>;
  topCustomers: Array<{
    _id: string;
    totalRevenue: number;
    bookingCount: number;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }>;
  period: number;
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [refreshing, setRefreshing] = useState(false);

  const periodOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' }
  ];

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(`/api/admin/analytics?period=${period}`);
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      } else {
        console.error('Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
    setLoading(false);
    setRefreshing(false);
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

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  if (loading && !data) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#d4a574]"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-[#6b6b6b] mx-auto mb-4" />
          <p className="text-[#6b6b6b] text-lg">Failed to load analytics data</p>
        </div>
      </AdminLayout>
    );
  }

  const { summary, revenueData, servicePopularity, bookingStats, monthlyTrends, topCustomers } = data;

  // Calculate previous period data for trends
  const currentRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const currentBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#2c2c2c]">Analytics Dashboard</h1>
            <p className="text-[#6b6b6b] mt-2">Business insights and performance metrics</p>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {periodOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <button
              onClick={fetchAnalytics}
              disabled={refreshing}
              className="px-4 py-2 bg-[#d4a574] text-white rounded-xl hover:bg-[#c4956a] transition-colors inline-flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{formatCurrency(summary.totalRevenue)}</p>
                <div className="flex items-center mt-2 text-sm">
                  {getTrendIcon(currentRevenue, summary.totalRevenue - currentRevenue)}
                  <span className="text-[#6b6b6b] ml-1">vs previous period</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-[#d4a574]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{summary.totalBookings}</p>
                <div className="flex items-center mt-2 text-sm">
                  {getTrendIcon(currentBookings, summary.totalBookings - currentBookings)}
                  <span className="text-[#6b6b6b] ml-1">vs previous period</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Total Customers</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{summary.totalCustomers}</p>
                <p className="text-sm text-[#6b6b6b] mt-2">All time</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Messages</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{summary.totalMessages}</p>
                <p className="text-sm text-[#6b6b6b] mt-2">All time</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{summary.conversionRate.toFixed(1)}%</p>
                <p className="text-sm text-[#6b6b6b] mt-2">Inquiries to bookings</p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#d4a574]" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <h3 className="text-xl font-semibold text-[#2c2c2c] mb-6">Revenue Trend</h3>
            {revenueData.length > 0 ? (
              <div className="space-y-4">
                <div className="h-64 flex items-end justify-between gap-2">
                  {revenueData.slice(-14).map((item, index) => {
                    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
                    const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 200 : 0;
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="text-xs text-[#6b6b6b] mb-2">
                          {formatCurrency(item.revenue)}
                        </div>
                        <div
                          className="bg-[#d4a574] rounded-t-md w-full min-h-[4px] transition-all duration-300 hover:bg-[#c4956a]"
                          style={{ height: `${height}px` }}
                          title={`${formatDate(`${item._id.year}-${item._id.month}-${item._id.day}`)}: ${formatCurrency(item.revenue)}`}
                        />
                        <div className="text-xs text-[#6b6b6b] mt-2 rotate-45 origin-left">
                          {item._id.day}/{item._id.month}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center text-sm text-[#6b6b6b]">
                  Daily revenue for the last {Math.min(14, revenueData.length)} days
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[#6b6b6b]">No revenue data available</div>
            )}
          </div>

          {/* Service Popularity */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <h3 className="text-xl font-semibold text-[#2c2c2c] mb-6">Popular Services</h3>
            {servicePopularity.length > 0 ? (
              <div className="space-y-4">
                {servicePopularity.slice(0, 5).map((service, index) => {
                  const maxCount = Math.max(...servicePopularity.map(s => s.count));
                  const width = maxCount > 0 ? (service.count / maxCount) * 100 : 0;
                  
                  return (
                    <div key={service._id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[#2c2c2c] capitalize">
                          {service._id.replace('-', ' ')}
                        </span>
                        <div className="text-sm text-[#6b6b6b]">
                          {service.count} bookings • {formatCurrency(service.revenue)}
                        </div>
                      </div>
                      <div className="w-full bg-[#f8f6f0] rounded-full h-2">
                        <div
                          className="bg-[#d4a574] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-[#6b6b6b]">No service data available</div>
            )}
          </div>
        </div>

        {/* Detailed Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Status Breakdown */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <h3 className="text-xl font-semibold text-[#2c2c2c] mb-6">Booking Status</h3>
            {bookingStats.length > 0 ? (
              <div className="space-y-4">
                {bookingStats.map((stat) => (
                  <div key={stat._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stat._id)}`}>
                        {stat._id.charAt(0).toUpperCase() + stat._id.slice(1)}
                      </span>
                      <span className="text-[#2c2c2c] font-medium">{stat.count} bookings</span>
                    </div>
                    <span className="text-[#6b6b6b] font-medium">
                      {formatCurrency(stat.totalAmount || 0)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#6b6b6b]">No booking data available</div>
            )}
          </div>

          {/* Top Customers */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <h3 className="text-xl font-semibold text-[#2c2c2c] mb-6">Top Customers</h3>
            {topCustomers.length > 0 ? (
              <div className="space-y-4">
                {topCustomers.slice(0, 5).map((customer, index) => (
                  <div key={customer._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#d4a574] text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-[#2c2c2c] font-medium">
                          {customer.user.firstName} {customer.user.lastName}
                        </p>
                        <p className="text-[#6b6b6b] text-sm">{customer.user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#2c2c2c] font-medium">{formatCurrency(customer.totalRevenue)}</p>
                      <p className="text-[#6b6b6b] text-sm">{customer.bookingCount} bookings</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#6b6b6b]">No customer data available</div>
            )}
          </div>
        </div>

        {/* Monthly Trends */}
        {monthlyTrends.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <h3 className="text-xl font-semibold text-[#2c2c2c] mb-6">Monthly Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f0f0f0]">
                    <th className="text-left py-3 px-4 text-[#6b6b6b] font-medium">Month</th>
                    <th className="text-left py-3 px-4 text-[#6b6b6b] font-medium">Bookings</th>
                    <th className="text-left py-3 px-4 text-[#6b6b6b] font-medium">Revenue</th>
                    <th className="text-left py-3 px-4 text-[#6b6b6b] font-medium">Avg. Booking Value</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyTrends.slice(-6).map((month) => {
                    const avgBookingValue = month.bookings > 0 ? month.revenue / month.bookings : 0;
                    
                    return (
                      <tr key={`${month._id.year}-${month._id.month}`} className="border-b border-[#f8f6f0]">
                        <td className="py-3 px-4 text-[#2c2c2c] font-medium">
                          {new Date(month._id.year, month._id.month - 1).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </td>
                        <td className="py-3 px-4 text-[#2c2c2c]">{month.bookings}</td>
                        <td className="py-3 px-4 text-[#2c2c2c]">{formatCurrency(month.revenue)}</td>
                        <td className="py-3 px-4 text-[#2c2c2c]">{formatCurrency(avgBookingValue)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 