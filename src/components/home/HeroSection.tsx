
import React from 'react';

interface HeroSectionProps {
  handleExploreClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleExploreClick }) => {
  return (
    <section className="mb-10">
      <div className="relative rounded-2xl overflow-hidden">
        <img 
          src="https://picsum.photos/id/1083/1200/400" 
          alt="Sports hero" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-meituan-blue/80 to-transparent flex items-center">
          <div className="p-8 text-white max-w-lg">
            <h1 className="text-3xl font-bold mb-2">体育赛事智能推荐</h1>
            <p className="mb-4">
              基于AI技术，为您精准匹配赛事与周边服务，打造完美赛事体验
            </p>
            <button 
              onClick={handleExploreClick}
              className="px-5 py-2 bg-meituan-orange text-white rounded-full hover:bg-opacity-90 transition"
            >
              探索赛事
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
