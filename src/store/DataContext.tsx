import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AnalyticsData, NavigationPage } from '@/types/generator';

interface DataContextType {
  data: AnalyticsData | null;
  setData: (data: AnalyticsData | null) => void;
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  isNavExpanded: boolean;
  setIsNavExpanded: (expanded: boolean) => void;
  clearData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [currentPage, setCurrentPage] = useState<NavigationPage>('overview');
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  const clearData = useCallback(() => {
    setData(null);
    setCurrentPage('overview');
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        currentPage,
        setCurrentPage,
        isNavExpanded,
        setIsNavExpanded,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
