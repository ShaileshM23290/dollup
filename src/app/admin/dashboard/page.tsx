import AdminLayout from '../components/AdminLayout';
import connectToDatabase from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Contact from '@/models/Contact';
import User from '@/models/User';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
};

const getDashboardStats = async () => {
  try {
    await connectToDatabase();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const totalMessages = await Contact.countDocuments();
    const unreadMessages = await Contact.countDocuments({ status: 'unread' });
    const totalClients = await User.countDocuments();

    const monthlyRevenueResult = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);
    const monthlyRevenue = monthlyRevenueResult[0]?.total || 0;

    const lastMonthRevenueResult = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);
    const lastMonthRevenue = lastMonthRevenueResult[0]?.total || 0;

    const revenueChange = lastMonthRevenue > 0 
      ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
      : monthlyRevenue > 0 ? 100 : 0;

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('userId', 'firstName lastName')
      .lean();

    const recentMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    const thisMonthBookings = await Booking.countDocuments({
      createdAt: { $gte: startOfMonth }
    });
    const lastMonthBookings = await Booking.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
    });
    const bookingChange = lastMonthBookings > 0 
      ? Math.round(((thisMonthBookings - lastMonthBookings) / lastMonthBookings) * 100)
      : thisMonthBookings > 0 ? 100 : 0;

    const thisMonthMessages = await Contact.countDocuments({
      createdAt: { $gte: startOfMonth }
    });
    const lastMonthMessages = await Contact.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
    });
    const messageChange = lastMonthMessages > 0 
      ? Math.round(((thisMonthMessages - lastMonthMessages) / lastMonthMessages) * 100)
      : thisMonthMessages > 0 ? 100 : 0;

    const thisMonthClients = await User.countDocuments({
      createdAt: { $gte: startOfMonth }
    });
    const lastMonthClients = await User.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
    });
    const clientChange = lastMonthClients > 0 
      ? Math.round(((thisMonthClients - lastMonthClients) / lastMonthClients) * 100)
      : thisMonthClients > 0 ? 100 : 0;

    return {
      totalBookings,
      pendingBookings,
      totalMessages,
      unreadMessages,
      totalClients,
      monthlyRevenue,
      revenueChange,
      bookingChange,
      messageChange,
      clientChange,
      recentBookings: recentBookings.map((booking: any) => ({
        id: booking._id.toString(),
        clientName: `${booking.userId?.firstName || 'Unknown'} ${booking.userId?.lastName || 'User'}`,
        service: booking.serviceType,
        date: new Date(booking.eventDate).toLocaleDateString(),
        status: booking.status,
        amount: booking.totalAmount || 0
      })),
      recentMessages: recentMessages.map((message: any) => ({
        id: message._id.toString(),
        from: message.name,
        subject: message.subject,
        time: getTimeAgo(message.createdAt),
        read: message.status !== 'unread'
      }))
    };
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return {
      totalBookings: 0,
      pendingBookings: 0,
      totalMessages: 0,
      unreadMessages: 0,
      totalClients: 0,
      monthlyRevenue: 0,
      revenueChange: 0,
      bookingChange: 0,
      messageChange: 0,
      clientChange: 0,
      recentBookings: [],
      recentMessages: []
    };
  }
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      change: `${stats.bookingChange >= 0 ? '+' : ''}${stats.bookingChange}%`,
      changeType: stats.bookingChange > 0 ? 'positive' : stats.bookingChange < 0 ? 'negative' : 'neutral',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      change: `+${stats.pendingBookings}`,
      changeType: 'neutral',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Total Messages',
      value: stats.totalMessages,
      change: `${stats.messageChange >= 0 ? '+' : ''}${stats.messageChange}%`,
      changeType: stats.messageChange > 0 ? 'positive' : stats.messageChange < 0 ? 'negative' : 'neutral',
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      title: 'Total Clients',
      value: stats.totalClients,
      change: `${stats.clientChange >= 0 ? '+' : ''}${stats.clientChange}%`,
      changeType: stats.clientChange > 0 ? 'positive' : stats.clientChange < 0 ? 'negative' : 'neutral',
      icon: Users,
      color: 'bg-purple-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#4e4528]">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-[#4e4528] mt-2">{stat.value}</p>
                    <p className={`text-sm mt-2 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-primary rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Monthly Revenue</h3>
              <p className="text-3xl font-bold mt-2">₹{stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm opacity-90 mt-1">
                {stats.revenueChange >= 0 ? '+' : ''}{stats.revenueChange}% from last month
              </p>
            </div>
            <TrendingUp className="h-12 w-12 opacity-80" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#4e4528]">Recent Bookings</h3>
            </div>
            <div className="p-6">
              {stats.recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-400' : 
                          booking.status === 'completed' ? 'bg-blue-400' :
                          booking.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                        <div>
                          <p className="font-medium text-[#4e4528]">{booking.clientName}</p>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                          <p className="text-xs text-gray-500">{booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#4e4528]">₹{(booking.amount || 0).toLocaleString()}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status === 'confirmed' ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Confirmed
                            </>
                          ) : booking.status === 'completed' ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </>
                          ) : booking.status === 'pending' ? (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Cancelled
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent bookings</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#4e4528]">Recent Messages</h3>
                <span className="text-sm text-gray-500">
                  {stats.unreadMessages} unread
                </span>
              </div>
            </div>
            <div className="p-6">
              {stats.recentMessages.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        !message.read ? 'bg-blue-400' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#4e4528] truncate">{message.from}</p>
                        <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                      </div>
                      <Eye className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent messages</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-[#4e4528] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Calendar className="h-8 w-8 text-[#a8956b] mb-2" />
              <span className="text-sm font-medium text-[#4e4528]">New Booking</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <MessageSquare className="h-8 w-8 text-[#a8956b] mb-2" />
              <span className="text-sm font-medium text-[#4e4528]">Send Message</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Users className="h-8 w-8 text-[#a8956b] mb-2" />
              <span className="text-sm font-medium text-[#4e4528]">Add Client</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <TrendingUp className="h-8 w-8 text-[#a8956b] mb-2" />
              <span className="text-sm font-medium text-[#4e4528]">View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}