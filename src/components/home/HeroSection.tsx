
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  handleExploreClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleExploreClick }) => {
  const navigate = useNavigate();

  return (
    <section className="mb-10">
      <div className="relative rounded-2xl overflow-hidden">
        {/* Updated hero image with the uploaded image */}
        <img 
          src="/lovable-uploads/892975ab-e290-46f1-bc2f-22bc328369ef.png" 
          alt="嗨赛智荐" 
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
        
        {/* Content overlay with updated branding */}
        <div className="absolute inset-0 bg-gradient-to-r from-meituan-blue/90 via-meituan-blue/70 to-transparent flex items-center">
          <div className="p-8 text-white max-w-lg relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-[#FFD256] to-[#FFB838]">嗨赛智荐</h1>
            <p className="mb-6 text-sm md:text-base animate-fade-in opacity-90">
              基于AI技术，为您精准匹配赛事与周边服务，打造完美赛事体验
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
              <Button 
                onClick={handleExploreClick}
                className="bg-[#FFD256] text-meituan-darkGray hover:bg-[#FFB838] transition flex items-center gap-1"
                size="lg"
              >
                探索赛事
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Floating event cards with updated gradient */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
            <div className="bg-gradient-to-r from-[#FFD256] to-[#FFB838] backdrop-blur-sm rounded-lg p-4 shadow-lg w-64 transform hover:scale-105 hover:-translate-y-1 transition-all">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">9月</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">北京国际马拉松</h3>
                  <p className="text-xs text-white/80">报名截止：还剩3天</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#FFD256] to-[#FFB838] backdrop-blur-sm rounded-lg p-4 shadow-lg w-64 transform translate-x-8 hover:scale-105 hover:-translate-y-1 transition-all">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">10月</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">城市定向挑战赛</h3>
                  <p className="text-xs text-white/80">名额有限，抢先报名</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Updated decoration elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB838] opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hot events promotion card with updated styling and text */}
      <div className="mt-6 bg-gradient-to-r from-[#FFD256] to-[#FFB838] rounded-xl p-5 shadow-lg transform transition-transform hover:-translate-y-1 cursor-pointer" id="popular-section" onClick={() => navigate('/?tab=popular')}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-lg">嗨赛智荐 · 热门精选</h3>
          </div>
          <Button variant="ghost" className="p-2 h-auto text-white hover:bg-white/20 rounded-full">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
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
