
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  handleExploreClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleExploreClick }) => {
  return (
    <section className="mb-10">
      <div className="relative rounded-2xl overflow-hidden">
        {/* Main hero image with overlay */}
        <img 
          src="https://picsum.photos/id/1083/1200/400" 
          alt="Sports hero" 
          className="w-full h-80 md:h-96 object-cover"
        />
        
        {/* Video overlay */}
        <video
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://player.vimeo.com/external/263628067.hd.mp4?s=db8c91b15d7b70b97301af3158acdecd866968d5&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        
        {/* Content overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-meituan-blue/90 via-meituan-blue/70 to-transparent flex items-center">
          <div className="p-8 text-white max-w-lg relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">体育赛事智能推荐</h1>
            <p className="mb-6 text-sm md:text-base animate-fade-in opacity-90">
              基于AI技术，为您精准匹配赛事与周边服务，打造完美赛事体验
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
              <Button 
                onClick={handleExploreClick}
                className="bg-meituan-orange text-white hover:bg-meituan-orange/90 transition flex items-center gap-1"
                size="lg"
              >
                探索赛事
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                查看热门
              </Button>
            </div>
          </div>
          
          {/* Floating event cards */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg w-64 transform hover:scale-105 transition-transform">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-meituan-orange/10 rounded-full flex items-center justify-center">
                  <span className="text-meituan-orange font-bold">9月</span>
                </div>
                <div>
                  <h3 className="font-bold text-meituan-blue">北京国际马拉松</h3>
                  <p className="text-xs text-gray-500">报名截止：还剩3天</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg w-64 transform translate-x-8">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-meituan-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-meituan-blue font-bold">10月</span>
                </div>
                <div>
                  <h3 className="font-bold text-meituan-blue">城市定向挑战赛</h3>
                  <p className="text-xs text-gray-500">名额有限，抢先报名</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional decoration elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-meituan-orange opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Quick stats below hero */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
          <h4 className="text-2xl font-bold text-meituan-blue">42+</h4>
          <p className="text-sm text-gray-500">即将开赛</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
          <h4 className="text-2xl font-bold text-meituan-blue">158</h4>
          <p className="text-sm text-gray-500">赛事总数</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
          <h4 className="text-2xl font-bold text-meituan-blue">5.2万</h4>
          <p className="text-sm text-gray-500">已报名</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
          <h4 className="text-2xl font-bold text-meituan-blue">98%</h4>
          <p className="text-sm text-gray-500">满意度</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
