import React from 'react';
import { LayoutDashboard, Globe, Zap, BarChart3, Settings, HelpCircle, Search } from 'lucide-react';
import { cn } from '../lib/utils';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Globe, label: 'Global Pulse', active: false },
    { icon: Zap, label: 'Live Trends', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
  ];

  return (
    <aside className="w-64 border-r border-white/5 h-screen sticky top-0 hidden lg:flex flex-col p-6 bg-black/20 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
          <Zap className="text-white fill-white" size={18} />
        </div>
        <h1 className="text-xl font-bold tracking-tighter">TrendPulse</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <div className="tech-label mb-4 ml-2">Main Menu</div>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
              item.active 
                ? "bg-blue-600/10 text-blue-400" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon size={18} className={cn(item.active ? "text-blue-400" : "group-hover:text-white")} />
            <span className="text-sm font-medium">{item.label}</span>
            {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-glow shadow-blue-400/50" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <HelpCircle size={18} />
          <span className="text-sm font-medium">Support</span>
        </button>
      </div>
    </aside>
  );
};
