
import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { naviMenuItems } from '../data';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();
  const activeMenu = searchParams.get('tab') || 'events';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Set search params and navigate to search results
      const newParams = new URLSearchParams(searchParams);
      newParams.set('search', searchQuery);
      newParams.set('tab', 'events'); // Always switch to events tab for search
      setSearchParams(newParams);
    }
  };

  const handleMenuClick = (menuId: string) => {
    // Navigate to the appropriate route based on menu ID
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', menuId);
    // Remove search parameter when changing tabs
    if (menuId !== 'events' && newParams.has('search')) {
      newParams.delete('search');
    }
    setSearchParams(newParams);
    console.log("Navigation clicked:", menuId);
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 flex">
              <span className="font-bold text-xl cursor-pointer" onClick={() => navigate('/')}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD256] to-[#FFB838]">嗨赛智荐</span>
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {naviMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`flex items-center space-x-1 px-1 py-2 text-sm font-medium transition-colors
                  ${activeMenu === item.id 
                    ? 'text-[#FFD256] border-b-2 border-[#FFD256]' 
                    : 'text-meituan-darkGray hover:text-[#FFB838]'}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-0 bg-meituan-gray py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FFD256] sm:text-sm sm:leading-6"
                placeholder="搜索赛事"
              />
            </form>
            
            {/* User profile button */}
            <button className="hidden md:block rounded-full bg-meituan-gray p-2">
              <span className="sr-only">用户菜单</span>
              <div className="h-6 w-6 rounded-full bg-[#FFD256] flex items-center justify-center text-white font-medium">
                用
              </div>
            </button>
            
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center space-x-2 px-4 py-3 bg-meituan-gray rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-[#FFD256] flex items-center justify-center text-white font-medium">
                        用
                      </div>
                      <span className="font-medium">用户名</span>
                    </div>
                    
                    {naviMenuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleMenuClick(item.id);
                          document.body.click(); // Close the sheet
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                          activeMenu === item.id 
                            ? 'bg-[#FFD256]/10 text-[#FFD256]' 
                            : 'hover:bg-meituan-gray text-meituan-darkGray'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-base">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
