import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10 bg-bg/80 backdrop-blur-md">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search trends, topics, or regions..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative">
          <Bell size={18} className="text-white/60" />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-bg" />
        </button>
        <div className="h-8 w-[1px] bg-white/5 mx-2" />
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium">Tolgahan Ünsal</div>
            <div className="text-[10px] text-white/40 font-mono uppercase tracking-wider">Pro Analyst</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[1px]">
            <div className="w-full h-full rounded-[14px] bg-bg flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/seed/user-main/40/40" 
                alt="profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
