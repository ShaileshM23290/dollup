"use client";

import { useState } from 'react';
import Image from 'next/image';
import { 
  Grid, 
  List, 
  Heart, 
  Share2, 
  Eye,
  Crown,
  Camera,
  Sparkles,
  Palette,
  Star
} from 'lucide-react';
import { PortfolioImage } from '@/lib/images';

interface PortfolioClientProps {
  portfolioImages: PortfolioImage[];
}

export default function PortfolioClient({ portfolioImages }: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Work', count: portfolioImages.length },
    { id: 'bridal', name: 'Bridal', count: portfolioImages.filter(img => img.category === 'bridal').length, icon: Crown },
    { id: 'party', name: 'Party', count: portfolioImages.filter(img => img.category === 'party').length, icon: Sparkles },
    { id: 'editorial', name: 'Editorial', count: portfolioImages.filter(img => img.category === 'editorial').length, icon: Palette },
    { id: 'natural', name: 'Natural', count: portfolioImages.filter(img => img.category === 'natural').length, icon: Camera },
    { id: 'glam', name: 'Glam', count: portfolioImages.filter(img => img.category === 'glam').length, icon: Star }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioImages 
    : portfolioImages.filter(item => item.category === activeFilter);

  return (
    <div>
      {/* Filter and Controls */}
      <section className="py-12 bg-white border-b border-[#e8d5b7]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center space-x-2 ${
                      activeFilter === category.id
                        ? 'bg-[#4e4528] text-white shadow-lg'
                        : 'bg-[#f5f1ea] text-[#4e4528] hover:bg-[#e8dcc6]'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{category.name}</span>
                    <span className="text-xs opacity-75">({category.count})</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-[#f5f1ea] rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#4e4528] shadow-md'
                      : 'text-[#404040]'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white text-[#4e4528] shadow-md'
                      : 'text-[#404040]'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`group cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'card-elegant overflow-hidden' 
                    : 'flex bg-white rounded-2xl shadow-elegant hover:shadow-elegant-hover transition-all duration-300 overflow-hidden'
                }`}
              >
                <div className={`relative ${
                  viewMode === 'grid' 
                    ? 'aspect-square' 
                    : 'w-1/3 aspect-square'
                }`}>
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>

                {viewMode === 'list' && (
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#4e4528] mb-4">{item.title}</h3>
                    <p className="text-[#404040] mb-6 leading-relaxed">
                      {item.alt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-[#f5f1ea] text-[#4e4528] rounded-full text-sm font-medium capitalize">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="btn-primary">
                        View Details
                      </button>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-[#a8956b] hover:text-[#4e4528] transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-[#a8956b] hover:text-[#4e4528] transition-colors">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {viewMode === 'grid' && (
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#4e4528] mb-2">{item.title}</h3>
                    <p className="text-[#404040] text-sm mb-4 line-clamp-2">
                      {item.alt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#f5f1ea] text-[#4e4528] rounded-full text-xs font-medium capitalize">
                        {item.category}
                      </span>
                      
                      <div className="flex space-x-1">
                        <button className="p-1.5 text-[#a8956b] hover:text-[#4e4528] transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-[#a8956b] hover:text-[#4e4528] transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#f5f1ea] rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="h-12 w-12 text-[#a8956b]" />
              </div>
              <h3 className="text-2xl font-bold text-[#4e4528] mb-4">No items found</h3>
              <p className="text-[#404040] mb-8 max-w-md mx-auto">
                We couldn&apos;t find any portfolio items matching your current filter. 
                Try selecting a different category.
              </p>
              <button 
                onClick={() => setActiveFilter('all')}
                className="btn-primary"
              >
                View All Work
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}