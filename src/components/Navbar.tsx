
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { naviMenuItems } from '../data';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('events');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Navigate to search results or filter the current page
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 flex">
              <span className="font-bold text-xl text-meituan-blue">
                <span className="text-meituan-orange">美团</span>体育赛事
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {naviMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`flex items-center space-x-1 px-1 py-2 text-sm font-medium transition-colors
                  ${activeMenu === item.id 
                    ? 'text-meituan-orange border-b-2 border-meituan-orange' 
                    : 'text-meituan-darkGray hover:text-meituan-orange'}`}
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
                className="block w-full rounded-md border-0 bg-meituan-gray py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-meituan-orange sm:text-sm sm:leading-6"
                placeholder="搜索赛事"
              />
            </form>
            <button className="rounded-full bg-meituan-gray p-2">
              <span className="sr-only">用户菜单</span>
              <div className="h-6 w-6 rounded-full bg-meituan-blue flex items-center justify-center text-white font-medium">
                用
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
