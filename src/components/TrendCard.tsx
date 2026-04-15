import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, MessageSquare, Heart, Share2, Globe, ExternalLink } from 'lucide-react';
import { Trend } from '../services/gemini';
import { cn } from '../lib/utils';

interface TrendCardProps {
  trend: Trend;
  index: number;
  onClick: () => void;
}

export const TrendCard: React.FC<TrendCardProps> = ({ trend, index, onClick }) => {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'X': return 'text-sky-400';
      case 'TikTok': return 'text-pink-500';
      case 'Reddit': return 'text-orange-500';
      case 'YouTube': return 'text-red-600';
      default: return 'text-blue-500';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'negative': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="glass-card p-5 group cursor-pointer hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <a 
          href={trend.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors block"
        >
          <ExternalLink size={14} className="text-white/40 hover:text-blue-400" />
        </a>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className={cn("tech-label mb-1", getPlatformColor(trend.platform))}>
            {trend.platform} • {trend.region}
          </span>
          <h3 className="text-lg font-semibold tracking-tight group-hover:text-blue-400 transition-colors">
            {trend.topic}
          </h3>
        </div>
        <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border", getSentimentColor(trend.sentiment))}>
          {trend.sentiment}
        </div>
      </div>

      <p className="text-sm text-white/60 line-clamp-2 mb-6 h-10">
        {trend.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white/40">
            <TrendingUp size={14} />
            <span className="text-xs font-mono">{trend.volume}</span>
          </div>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-bg bg-white/10 flex items-center justify-center overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${trend.topic}-${i}/32/32`} 
                alt="user" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
