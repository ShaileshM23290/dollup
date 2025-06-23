'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Filter, 
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

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Work', count: 48 },
    { id: 'bridal', name: 'Bridal', count: 18, icon: Crown },
    { id: 'photoshoot', name: 'Photoshoot', count: 12, icon: Camera },
    { id: 'events', name: 'Special Events', count: 10, icon: Sparkles },
    { id: 'editorial', name: 'Editorial', count: 8, icon: Palette }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Romantic Bridal Look',
      category: 'bridal',
      description: 'Soft, romantic makeup for a garden wedding with natural glowing skin and subtle pink tones.',
      image: '/portfolio/bridal-1.jpg',
      tags: ['Natural', 'Romantic', 'Glowing'],
      client: 'Sarah M.',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Glamorous Evening Look',
      category: 'events',
      description: 'Bold, glamorous makeup for a gala event featuring dramatic eyes and classic red lips.',
      image: '/portfolio/events-1.jpg',
      tags: ['Glamour', 'Bold', 'Classic'],
      client: 'Emily R.',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Fashion Editorial',
      category: 'editorial',
      description: 'High-fashion editorial look with artistic color placement and avant-garde styling.',
      image: '/portfolio/editorial-1.jpg',
      tags: ['Artistic', 'Bold', 'Creative'],
      client: 'Vogue Shoot',
      date: '2024-01-08'
    },
    {
      id: 4,
      title: 'Natural Beauty Portrait',
      category: 'photoshoot',
      description: 'Clean, natural makeup enhancing the model\'s features for a lifestyle photoshoot.',
      image: '/portfolio/photoshoot-1.jpg',
      tags: ['Natural', 'Clean', 'Fresh'],
      client: 'Maria L.',
      date: '2024-01-05'
    },
    {
      id: 5,
      title: 'Vintage Glam Bridal',
      category: 'bridal',
      description: 'Classic vintage-inspired bridal look with winged eyeliner and bold red lips.',
      image: '/portfolio/bridal-2.jpg',
      tags: ['Vintage', 'Classic', 'Bold'],
      client: 'Jessica K.',
      date: '2024-01-03'
    },
    {
      id: 6,
      title: 'Smoky Eye Elegance',
      category: 'events',
      description: 'Sophisticated smoky eye makeup for a black-tie event with metallic accents.',
      image: '/portfolio/events-2.jpg',
      tags: ['Smoky', 'Elegant', 'Metallic'],
      client: 'Amanda T.',
      date: '2023-12-28'
    },
    {
      id: 7,
      title: 'Boho Chic Wedding',
      category: 'bridal',
      description: 'Bohemian-inspired bridal makeup with earthy tones and natural textures.',
      image: '/portfolio/bridal-3.jpg',
      tags: ['Boho', 'Natural', 'Earthy'],
      client: 'Rachel P.',
      date: '2023-12-25'
    },
    {
      id: 8,
      title: 'High Fashion Portrait',
      category: 'photoshoot',
      description: 'Striking makeup for a fashion portrait with bold contouring and dramatic lashes.',
      image: '/portfolio/photoshoot-2.jpg',
      tags: ['Fashion', 'Bold', 'Dramatic'],
      client: 'Harper\'s Bazaar',
      date: '2023-12-20'
    },
    {
      id: 9,
      title: 'Color Pop Editorial',
      category: 'editorial',
      description: 'Vibrant, colorful makeup featuring electric blues and purples for an artistic shoot.',
      image: '/portfolio/editorial-2.jpg',
      tags: ['Colorful', 'Artistic', 'Vibrant'],
      client: 'Elle Magazine',
      date: '2023-12-18'
    },
    {
      id: 10,
      title: 'Soft Glam Evening',
      category: 'events',
      description: 'Soft glamour look perfect for cocktail parties with subtle shimmer and nude tones.',
      image: '/portfolio/events-3.jpg',
      tags: ['Soft Glam', 'Shimmer', 'Nude'],
      client: 'Lisa H.',
      date: '2023-12-15'
    },
    {
      id: 11,
      title: 'Classic Bridal Beauty',
      category: 'bridal',
      description: 'Timeless bridal makeup with perfect skin, defined eyes, and soft pink lips.',
      image: '/portfolio/bridal-4.jpg',
      tags: ['Classic', 'Timeless', 'Elegant'],
      client: 'Michelle D.',
      date: '2023-12-12'
    },
    {
      id: 12,
      title: 'Artistic Beauty Shot',
      category: 'photoshoot',
      description: 'Creative beauty photography makeup with geometric elements and bold colors.',
      image: '/portfolio/photoshoot-3.jpg',
      tags: ['Artistic', 'Geometric', 'Creative'],
      client: 'Beauty Magazine',
      date: '2023-12-10'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-soft overflow-hidden">
        <div className="absolute inset-0 bg-[url('/portfolio-pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[#4e4528]">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#404040] mb-12 max-w-4xl mx-auto leading-relaxed">
            Explore our collection of stunning makeup artistry showcasing diverse styles, 
            techniques, and transformations for every occasion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4e4528] mb-2">500+</div>
              <div className="text-[#404040] font-medium">Completed Looks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4e4528] mb-2">100+</div>
              <div className="text-[#404040] font-medium">Happy Brides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4e4528] mb-2">50+</div>
              <div className="text-[#404040] font-medium">Editorial Shoots</div>
            </div>
          </div>
        </div>
      </section>

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
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeFilter === category.id
                        ? 'bg-gradient-primary text-white shadow-elegant'
                        : 'bg-gradient-soft text-[#2c2c2c] hover:bg-gradient-elegant'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeFilter === category.id ? 'bg-white/20' : 'bg-[#d4a574]/20'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-soft rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  <Grid className="h-4 w-4 text-[#2c2c2c]" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  <List className="h-4 w-4 text-[#2c2c2c]" />
                </button>
              </div>
              
              <div className="text-[#6b6b6b] text-sm">
                Showing {filteredItems.length} of {portfolioItems.length} works
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl shadow-elegant hover:shadow-elegant-hover transition-all duration-300">
                    {/* Image Placeholder */}
                    <div className="aspect-[4/5] bg-gradient-elegant"></div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm opacity-90 mb-4">{item.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs opacity-75">
                            {item.client} • {new Date(item.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300">
                              <Heart className="h-4 w-4" />
                            </button>
                            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="card-elegant">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="aspect-[4/5] bg-gradient-elegant rounded-2xl"></div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-xs px-3 py-1 bg-gradient-elegant rounded-full font-medium text-[#2c2c2c]">
                          {categories.find(cat => cat.id === item.category)?.name}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-[#d4a574] fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-[#2c2c2c]">{item.title}</h3>
                      <p className="text-[#6b6b6b] mb-6 leading-relaxed">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="text-sm px-3 py-1 bg-gradient-soft rounded-full text-[#2c2c2c]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-[#6b6b6b]">
                          Client: {item.client} • {new Date(item.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-gradient-elegant rounded-full hover:bg-gradient-primary hover:text-white transition-all duration-300">
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-gradient-elegant rounded-full hover:bg-gradient-primary hover:text-white transition-all duration-300">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-gradient-elegant rounded-full hover:bg-gradient-primary hover:text-white transition-all duration-300">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Love What You See?
          </h2>
          
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Ready to create your own stunning look? Book a consultation and let's bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/book" className="bg-white text-[#2c2c2c] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105">
              Book Your Session
            </Link>
            
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-[#2c2c2c] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 