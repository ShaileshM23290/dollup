import { getPortfolioImages } from '@/lib/images';
import PortfolioClient from './PortfolioClient';

export default async function PortfolioPage() {
  const portfolioImages = await getPortfolioImages();

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
              <div className="text-3xl font-bold text-[#4e4528] mb-2">{portfolioImages.length}+</div>
              <div className="text-[#404040] font-medium">Completed Looks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4e4528] mb-2">{portfolioImages.filter(img => img.category === 'bridal').length}+</div>
              <div className="text-[#404040] font-medium">Bridal Looks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4e4528] mb-2">{portfolioImages.filter(img => img.category === 'editorial').length}+</div>
              <div className="text-[#404040] font-medium">Editorial Shoots</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <PortfolioClient portfolioImages={portfolioImages} />
    </div>
  );
} 