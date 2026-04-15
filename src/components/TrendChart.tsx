import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { time: '00:00', value: 400 },
  { time: '04:00', value: 300 },
  { time: '08:00', value: 600 },
  { time: '12:00', value: 800 },
  { time: '16:00', value: 500 },
  { time: '20:00', value: 900 },
  { time: '23:59', value: 700 },
];

export const TrendChart: React.FC = () => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={10} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#3b82f6' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
