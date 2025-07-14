'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Star,
  StarOff,
  Upload,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';

interface Portfolio {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  order: number;
  metadata: {
    client?: string;
    location?: string;
    photographer?: string;
    date?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminPortfolio() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'bridal', label: 'Bridal' },
    { value: 'party', label: 'Party' },
    { value: 'editorial', label: 'Editorial' },
    { value: 'natural', label: 'Natural' },
    { value: 'special-events', label: 'Special Events' }
  ];

  const [formData, setFormData] = useState<Partial<Portfolio>>({
    title: '',
    description: '',
    category: 'bridal',
    imageUrl: '',
    imageAlt: '',
    tags: [],
    featured: false,
    isActive: true,
    order: 0,
    metadata: {
      client: '',
      location: '',
      photographer: '',
      date: ''
    }
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    filterPortfolios();
  }, [portfolios, searchTerm, selectedCategory]);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/admin/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data.portfolios);
      } else {
        console.error('Failed to fetch portfolios');
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    }
    setLoading(false);
  };

  const filterPortfolios = () => {
    let filtered = portfolios;

    if (searchTerm) {
      filtered = filtered.filter(portfolio =>
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(portfolio => portfolio.category === selectedCategory);
    }

    setFilteredPortfolios(filtered);
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    setEditingPortfolio(null);
    setFormData({
      title: '',
      description: '',
      category: 'bridal',
      imageUrl: '',
      imageAlt: '',
      tags: [],
      featured: false,
      isActive: true,
      order: 0,
      metadata: {
        client: '',
        location: '',
        photographer: '',
        date: ''
      }
    });
    setShowModal(true);
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({
      ...portfolio,
      tags: [...portfolio.tags]
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingPortfolio 
        ? '/api/admin/portfolio'
        : '/api/admin/portfolio';
      
      const method = editingPortfolio ? 'PUT' : 'POST';
      
      const payload = editingPortfolio 
        ? { portfolioId: editingPortfolio._id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        fetchPortfolios();
        setShowModal(false);
        setEditingPortfolio(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save portfolio item');
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Failed to save portfolio item');
    }
  };

  const handleDelete = async (portfolioId: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const response = await fetch(`/api/admin/portfolio?id=${portfolioId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchPortfolios();
      } else {
        console.error('Failed to delete portfolio item');
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  const toggleFeatured = async (portfolioId: string, featured: boolean) => {
    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioId, featured: !featured })
      });

      if (response.ok) {
        fetchPortfolios();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  // Pagination
  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPortfolios = filteredPortfolios.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: portfolios.length,
    featured: portfolios.filter(p => p.featured).length,
    active: portfolios.filter(p => p.isActive).length,
    byCategory: categories.slice(1).map(cat => ({
      category: cat.label,
      count: portfolios.filter(p => p.category === cat.value).length
    }))
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
            <h1 className="text-3xl font-bold text-[#2c2c2c]">Portfolio Management</h1>
            <p className="text-[#6b6b6b] mt-2">Manage your portfolio showcase</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-[#d4a574] text-white px-6 py-3 rounded-xl hover:bg-[#c4956a] transition-colors inline-flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Total Items</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{stats.total}</p>
              </div>
              <ImageIcon className="h-8 w-8 text-[#d4a574]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Featured</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{stats.featured}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Active</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{stats.active}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f0f0f0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6b6b6b] text-sm">Categories</p>
                <p className="text-2xl font-bold text-[#2c2c2c]">{categories.length - 1}</p>
              </div>
              <Filter className="h-8 w-8 text-[#d4a574]" />
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
                  placeholder="Search portfolio items..."
                  className="w-full pl-10 pr-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#f0f0f0] overflow-hidden">
          {paginatedPortfolios.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-[#6b6b6b] mx-auto mb-4" />
              <p className="text-[#6b6b6b] text-lg">No portfolio items found</p>
              <p className="text-[#6b6b6b] text-sm mt-2">Add your first portfolio item to get started</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {paginatedPortfolios.map((portfolio) => (
                  <div key={portfolio._id} className="group relative bg-white border border-[#e8d5b7] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={portfolio.imageUrl}
                        alt={portfolio.imageAlt || portfolio.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        {portfolio.featured && (
                          <div className="bg-yellow-500 text-white p-1 rounded-full">
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                        )}
                        {!portfolio.isActive && (
                          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                            Inactive
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-[#2c2c2c] mb-2 line-clamp-1">{portfolio.title}</h3>
                      <p className="text-sm text-[#6b6b6b] mb-3 line-clamp-2">{portfolio.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-[#6b6b6b] mb-3">
                        <span className="bg-[#f8f6f0] px-2 py-1 rounded-full">
                          {categories.find(c => c.value === portfolio.category)?.label}
                        </span>
                        <span>#{portfolio.order}</span>
                      </div>

                      {portfolio.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {portfolio.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-[#e8d5b7] text-[#8b7355] px-2 py-1 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                          {portfolio.tags.length > 3 && (
                            <span className="text-[#6b6b6b] text-xs">+{portfolio.tags.length - 3}</span>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFeatured(portfolio._id, portfolio.featured)}
                          className={`p-2 rounded-lg transition-colors ${
                            portfolio.featured 
                              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                          title={portfolio.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          {portfolio.featured ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                        </button>
                        
                        <button
                          onClick={() => handleEdit(portfolio)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit portfolio item"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(portfolio._id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete portfolio item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2c2c2c]">
                  {editingPortfolio ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Title *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Category *</label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Description *</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Image URL *</label>
                    <input
                      type="url"
                      required
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Image Alt Text</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      value={formData.imageAlt}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageAlt: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags?.map((tag, index) => (
                      <span key={index} className="bg-[#e8d5b7] text-[#8b7355] px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="text-[#8b7355] hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add a tag and press Enter"
                    className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const tag = e.currentTarget.value.trim();
                        if (tag) {
                          handleTagAdd(tag);
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Order</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>

                  <div className="flex items-center space-x-6 pt-8">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-[#e8d5b7] text-[#d4a574] focus:ring-[#d4a574]"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      />
                      <span className="text-sm text-[#2c2c2c]">Featured</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-[#e8d5b7] text-[#d4a574] focus:ring-[#d4a574]"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      />
                      <span className="text-sm text-[#2c2c2c]">Active</span>
                    </label>
                  </div>
                </div>

                {/* Metadata */}
                <div className="border-t border-[#f0f0f0] pt-6">
                  <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Client Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                        value={formData.metadata?.client || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          metadata: { ...prev.metadata, client: e.target.value }
                        }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Location</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                        value={formData.metadata?.location || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          metadata: { ...prev.metadata, location: e.target.value }
                        }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Photographer</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                        value={formData.metadata?.photographer || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          metadata: { ...prev.metadata, photographer: e.target.value }
                        }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2c2c2c] mb-2">Shoot Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                        value={formData.metadata?.date || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          metadata: { ...prev.metadata, date: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-[#f0f0f0]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-[#e8d5b7] text-[#6b6b6b] rounded-xl hover:bg-[#f8f6f0] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#d4a574] text-white rounded-xl hover:bg-[#c4956a] transition-colors inline-flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>{editingPortfolio ? 'Update' : 'Create'} Portfolio Item</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 