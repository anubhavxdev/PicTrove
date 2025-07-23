import { useState, useEffect } from 'react';
import { Users, Image, AlertTriangle, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color, description, isLoading }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        let start = 0;
        const increment = value / 30;
        const counter = setInterval(() => {
          start += increment;
          if (start >= value) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            setDisplayValue(Math.floor(start));
          }
        }, 50);
        return () => clearInterval(counter);
      }, Math.random() * 500);
      return () => clearTimeout(timer);
    }
  }, [value, isLoading]);

  return (
    <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-400 text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            +{trend}%
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase">
          {title}
        </h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl md:text-3xl font-bold text-white">
            {isLoading ? (
              <div className="animate-pulse bg-gray-700 h-8 w-16 rounded"></div>
            ) : (
              displayValue.toLocaleString()
            )}
          </span>
        </div>
        {description && (
          <p className="text-gray-500 text-xs">
            {description}
          </p>
        )}
      </div>
      
      {/* Subtle hover effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
    </div>
  );
};

export default StatCard;