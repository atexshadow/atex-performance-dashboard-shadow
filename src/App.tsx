import { AnimatePresence, motion } from 'framer-motion';
import { DataProvider, useData } from '@/store/DataContext';
import Navigation from '@/components/Navigation';
import TopBar from '@/components/TopBar';
import UploadScreen from '@/components/UploadScreen';
import OverviewPage from '@/pages/OverviewPage';
import ElectricalPage from '@/pages/ElectricalPage';
import PerformancePage from '@/pages/PerformancePage';
import OilPage from '@/pages/OilPage';
import EnvironmentPage from '@/pages/EnvironmentPage';
import MechanicalPage from '@/pages/MechanicalPage';
import TestsPage from '@/pages/TestsPage';
import AdvancedPage from '@/pages/AdvancedPage';
import ReportsPage from '@/pages/ReportsPage';



function PageRouter() {
  const { currentPage } = useData();

  const pages: Record<string, React.ReactNode> = {
    overview: <OverviewPage />,
    electrical: <ElectricalPage />,
    performance: <PerformancePage />,
    oil: <OilPage />,
    environment: <EnvironmentPage />,
    mechanical: <MechanicalPage />,
    tests: <TestsPage />,
    advanced: <AdvancedPage />,
    reports: <ReportsPage />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
      >
        {pages[currentPage] || <OverviewPage />}
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  const { data, isNavExpanded } = useData();

  if (!data) {
    return <UploadScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F4F7FB]"
    >
      <Navigation />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col min-h-screen transition-all duration-300 ease-out"
        style={{ marginLeft: isNavExpanded ? 240 : 64 }}
      >
        <TopBar />
        <main className="flex-1">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <PageRouter />
          </div>
        </main>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
