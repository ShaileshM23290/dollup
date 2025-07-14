'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: string;
  isPopular: boolean;
  artistName: string;
  artistId: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.artistName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b7355]">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#2c2c2c]">Services Management</h1>
              <p className="text-[#8b7355] mt-1">Manage all makeup services across artists</p>
            </div>
            <button className="bg-[#d4a574] text-white px-4 py-2 rounded-lg hover:bg-[#c4956a] transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Service</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8b7355]" />
                <input
                  type="text"
                  placeholder="Search services or artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#e8d5b7] rounded-lg focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-[#8b7355]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-[#e8d5b7] rounded-lg focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#8b7355] text-lg">No services found</p>
              <p className="text-[#8b7355] text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f0f0f0]">
                    <th className="text-left py-3 px-4 font-medium text-[#2c2c2c]">Service</th>
                    <th className="text-left py-3 px-4 font-medium text-[#2c2c2c]">Artist</th>
                    <th className="text-left py-3 px-4 font-medium text-[#2c2c2c]">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-[#2c2c2c]">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-[#2c2c2c]">Duration</th>
                    <th className="text-left py-3 px-4 font-medium text-[#2c2c2c]">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#2c2c2c]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service._id} className="border-b border-[#f8f6f0] hover:bg-[#f8f6f0] transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-[#2c2c2c]">{service.name}</p>
                          <p className="text-sm text-[#8b7355] mt-1">{service.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-[#2c2c2c]">{service.artistName}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-[#f8f6f0] text-[#8b7355] rounded-full text-sm capitalize">
                          {service.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-[#2c2c2c]">₹{service.price.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-[#2c2c2c]">{service.duration}</p>
                      </td>
                      <td className="py-4 px-4">
                        {service.isPopular ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Popular
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            Regular
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-[#d4a574] hover:text-[#c4956a] transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-500 hover:text-red-700 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
            <h3 className="text-sm font-medium text-[#8b7355]">Total Services</h3>
            <p className="text-2xl font-bold text-[#2c2c2c] mt-2">{services.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
            <h3 className="text-sm font-medium text-[#8b7355]">Popular Services</h3>
            <p className="text-2xl font-bold text-[#2c2c2c] mt-2">
              {services.filter(s => s.isPopular).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
            <h3 className="text-sm font-medium text-[#8b7355]">Categories</h3>
            <p className="text-2xl font-bold text-[#2c2c2c] mt-2">{categories.length - 1}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#e8d5b7] p-6">
            <h3 className="text-sm font-medium text-[#8b7355]">Avg. Price</h3>
            <p className="text-2xl font-bold text-[#2c2c2c] mt-2">
              ₹{services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length).toLocaleString() : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 