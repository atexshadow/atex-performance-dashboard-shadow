import { motion } from 'framer-motion';
import { FileSpreadsheet, Calendar, Database, Columns3 } from 'lucide-react';
import { useData } from '@/store/DataContext';

export default function TopBar() {
  const { data, currentPage } = useData();
  if (!data) return null;

  const pageNames: Record<string, string> = {
    overview: 'Overview',
    electrical: 'Electrical Analytics',
    performance: 'Performance',
    oil: 'Oil System',
    environment: 'Environment',
    mechanical: 'Mechanical',
    tests: 'Test Analytics',
    advanced: 'Advanced Analytics',
    reports: 'Report Center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b border-[#E5E9F0] sticky top-0 z-30"
    >
      <div className="max-w-[1400px] mx-auto px-8 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px] text-[#94A3B8]">
          <span className="font-medium text-[#0F172A]">{pageNames[currentPage] || 'Overview'}</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
            <FileSpreadsheet size={13} />
            <span className="font-medium">{data.fileName}</span>
          </div>
          <div className="w-px h-4 bg-[#E5E9F0]" />
          <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
            <Database size={13} />
            <span className="tabular-nums">{data.totalRecords.toLocaleString()} records</span>
          </div>
          <div className="w-px h-4 bg-[#E5E9F0]" />
          <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
            <Columns3 size={13} />
            <span className="tabular-nums">{data.numericParameters.length} parameters</span>
          </div>
          <div className="w-px h-4 bg-[#E5E9F0]" />
          <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
            <Calendar size={13} />
            <span>{new Date(data.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
