import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TrendCard } from './components/TrendCard';
import { TrendChart } from './components/TrendChart';
import { fetchGlobalTrends, analyzeTopic, Trend } from './services/gemini';
import { RefreshCw, Globe2, AlertCircle, X, Sparkles } from 'lucide-react';

export default function App() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const loadTrends = async () => {
    setLoading(true);
    const data = await fetchGlobalTrends();
    setTrends(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTrends();
  }, []);

  const handleTrendClick = async (trend: Trend) => {
    setSelectedTrend(trend);
    setAnalyzing(true);
    setAnalysis(null);
    const result = await analyzeTopic(trend.topic);
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="flex min-h-screen bg-bg text-ink selection:bg-blue-500/30">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest">
                  <Sparkles size={14} />
                  <span>AI-Powered Insights</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Global Trend Pulse</h2>
                <p className="text-white/40 max-w-lg">
                  Real-time analysis of social conversations across major platforms. 
                  Powered by Gemini AI to detect emerging patterns worldwide.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={loadTrends}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20"
                >
                  <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                  {loading ? "Refreshing..." : "Refresh Data"}
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm">
                  <Globe2 size={16} />
                  <span>Global Coverage</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 glass-card p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <span className="tech-label">Overall Activity</span>
                <span className="text-emerald-400 text-xs font-bold">+12.4%</span>
              </div>
              <TrendChart />
            </div>
          </div>

          {/* Trends Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Emerging Topics</h3>
              <div className="flex gap-2">
                {['All', 'X', 'TikTok', 'Reddit', 'YouTube'].map(p => (
                  <button key={p} className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-white/60 transition-colors">
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="glass-card h-48 animate-pulse bg-white/5" />
                ))}
              </div>
            ) : trends.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {trends.map((trend, i) => (
                  <TrendCard 
                    key={i} 
                    trend={trend} 
                    index={i} 
                    onClick={() => handleTrendClick(trend)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 glass-card">
                <AlertCircle size={48} className="text-white/20 mb-4" />
                <p className="text-white/40">No trends found. Try refreshing.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedTrend && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedTrend(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <span className="tech-label text-blue-400">{selectedTrend.platform} Analysis</span>
                  <h2 className="text-2xl font-bold">{selectedTrend.topic}</h2>
                </div>
                <button 
                  onClick={() => setSelectedTrend(null)}
                  className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="tech-label mb-1">Volume</div>
                    <div className="text-xl font-bold">{selectedTrend.volume}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="tech-label mb-1">Sentiment</div>
                    <div className="text-xl font-bold capitalize">{selectedTrend.sentiment}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="tech-label mb-1">Region</div>
                    <div className="text-xl font-bold">{selectedTrend.region}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-400" />
                    AI Deep Dive
                  </h4>
                  {analyzing ? (
                    <div className="space-y-3">
                      <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
                      <div className="h-4 bg-white/5 rounded animate-pulse w-[90%]" />
                      <div className="h-4 bg-white/5 rounded animate-pulse w-[95%]" />
                      <div className="h-4 bg-white/5 rounded animate-pulse w-[80%]" />
                    </div>
                  ) : (
                    <div className="text-white/70 leading-relaxed whitespace-pre-wrap text-sm">
                      {analysis}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end">
                <button 
                  onClick={() => setSelectedTrend(null)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
                >
                  Close Analysis
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
