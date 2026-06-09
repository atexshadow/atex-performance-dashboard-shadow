import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  color?: string;
  delay?: number;
}

export default function KPICard({ label, value, unit, icon: Icon, color = '#2563EB', delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        borderColor: '#CBD5E1',
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl border border-[#E5E9F0] p-5 cursor-default transition-colors duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wide">
          {label}
        </span>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ backgroundColor: color + '12' }}
        >
          <Icon size={17} style={{ color }} strokeWidth={2.5} />
        </motion.div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <motion.span 
          className="text-2xl font-bold text-[#0F172A] tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {value}
        </motion.span>
        {unit && (
          <span className="text-[13px] text-[#94A3B8] font-semibold">{unit}</span>
        )}
      </div>
    </motion.div>
  );
}
