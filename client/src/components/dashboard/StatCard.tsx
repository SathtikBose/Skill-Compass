import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  colorClass: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, colorClass, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors`}
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-3xl opacity-20 ${colorClass}`} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass.replace('bg-', 'bg-').replace('500', '500/20').replace('400', '400/20')} text-white`}>
          <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
        </div>
      </div>
      
      <div>
        <h3 className="text-neutral-400 font-medium text-sm mb-1">{title}</h3>
        <div className="text-3xl font-bold text-white flex items-baseline space-x-2">
          <span>{value}</span>
          {subtitle && <span className="text-sm font-medium text-neutral-500">{subtitle}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
