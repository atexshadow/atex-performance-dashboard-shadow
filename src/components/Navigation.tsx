import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Zap, Gauge, Droplets, Thermometer,
  Activity, FlaskConical, BrainCircuit, FileText,
  ChevronLeft, ChevronRight, Upload, X
} from 'lucide-react';
import { useData } from '@/store/DataContext';
import type { NavigationPage } from '@/types/generator';

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: typeof LayoutDashboard;
  group: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, group: 'Dashboard' },
  { id: 'electrical', label: 'Electrical', icon: Zap, group: 'Analytics' },
  { id: 'performance', label: 'Performance', icon: Gauge, group: 'Analytics' },
  { id: 'oil', label: 'Oil System', icon: Droplets, group: 'Analytics' },
  { id: 'environment', label: 'Environment', icon: Thermometer, group: 'Analytics' },
  { id: 'mechanical', label: 'Mechanical', icon: Activity, group: 'Analytics' },
  { id: 'tests', label: 'Test Analytics', icon: FlaskConical, group: 'Analytics' },
  { id: 'advanced', label: 'Advanced', icon: BrainCircuit, group: 'Intelligence' },
  { id: 'reports', label: 'Reports', icon: FileText, group: 'Output' },
];

export default function Navigation() {
  const { currentPage, setCurrentPage, isNavExpanded, setIsNavExpanded, data, clearData } = useData();

  const groups = [...new Set(navItems.map(i => i.group))];

  return (
    <motion.nav
      initial={false}
      animate={{ width: isNavExpanded ? 240 : 68 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-[#E5E9F0] z-40 flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <motion.div 
        className="h-14 flex items-center px-4 border-b border-[#F1F5F9] flex-shrink-0"
        whileHover={{ backgroundColor: '#FAFBFD' }}
      >
        <motion.div 
          className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200/40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Activity size={18} className="text-white" />
        </motion.div>
        <AnimatePresence>
          {isNavExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="ml-3 overflow-hidden"
            >
              <span className="text-[15px] font-bold text-[#0F172A] whitespace-nowrap">GenAnalytics</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2.5">
        {groups.map((group, gi) => (
          <motion.div 
            key={group} 
            className="mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.05 }}
          >
            <AnimatePresence>
              {isNavExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] px-3 mb-2"
                >
                  {group}
                </motion.span>
              )}
            </AnimatePresence>
            {navItems.filter(i => i.group === group).map((item, ii) => {
              const isActive = currentPage === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.05 + ii * 0.03 }}
                  className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 mb-1 group relative
                    ${isNavExpanded ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}
                    ${isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#2563EB] rounded-r-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.div
                    whileHover={{ rotate: isActive ? 0 : 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon size={19} className="flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                  <AnimatePresence>
                    {isNavExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.15 }}
                        className={`text-[13px] whitespace-nowrap ${isActive ? 'font-semibold' : 'font-medium'}`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!isNavExpanded && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F172A] text-white text-[12px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-0 border-4 border-transparent border-r-[#0F172A]" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-[#F1F5F9] p-2.5 flex-shrink-0 space-y-1">
        {data && (
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#FEF2F2' }}
            whileTap={{ scale: 0.98 }}
            onClick={clearData}
            className={`w-full flex items-center gap-3 rounded-xl text-[#94A3B8] hover:text-[#DC2626] transition-colors
              ${isNavExpanded ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}`}
          >
            <X size={17} className="flex-shrink-0" />
            {isNavExpanded && <span className="text-[13px] font-medium">Clear Data</span>}
          </motion.button>
        )}
        {!data && (
          <div className={`flex items-center gap-3 rounded-xl text-[#94A3B8] px-3 py-2.5 ${isNavExpanded ? '' : 'justify-center px-0'}`}>
            <Upload size={17} className="flex-shrink-0" />
            {isNavExpanded && <span className="text-[13px] font-medium">Upload to start</span>}
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsNavExpanded(!isNavExpanded)}
          className={`w-full flex items-center gap-3 rounded-xl text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#475569] transition-colors
            ${isNavExpanded ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}`}
        >
          <motion.div
            animate={{ rotate: isNavExpanded ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isNavExpanded ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
          </motion.div>
          {isNavExpanded && <span className="text-[13px] font-medium">Collapse</span>}
        </motion.button>
      </div>
    </motion.nav>
  );
}
