import { motion } from 'framer-motion';
import { Download, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

interface ChartActionsProps {
  onExport: () => void;
  onFullscreen: () => void;
  onReset?: () => void;
  isFullscreen?: boolean;
}

export default function ChartActions({ 
  onExport, 
  onFullscreen, 
  onReset,
  isFullscreen = false 
}: ChartActionsProps) {
  const buttons = [
    { icon: Download, label: 'Export data', onClick: onExport },
    { icon: isFullscreen ? Minimize2 : Maximize2, label: isFullscreen ? 'Exit fullscreen' : 'Fullscreen', onClick: onFullscreen },
    ...(onReset ? [{ icon: RotateCcw, label: 'Reset view', onClick: onReset }] : []),
  ];

  return (
    <div className="flex items-center gap-2">
      {buttons.map((btn, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={btn.onClick}
          className="relative group w-9 h-9 rounded-full border-2 border-[#E2E8F0] bg-white flex items-center justify-center text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#EFF6FF] hover:shadow-md transition-all duration-200"
        >
          <btn.icon size={15} strokeWidth={2.5} />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#0F172A] text-white text-[11px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
            {btn.label}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0F172A]" />
          </div>
        </motion.button>
      ))}
    </div>
  );
}
