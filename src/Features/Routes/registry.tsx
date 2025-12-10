
// src/routes/registry.tsx
import React from 'react';
import KPI from '../../Pages/KPI';
import TestThroughputPage from '../../Pages/TestThroughputPage';
import Home from '../../Pages/Home';

export const ELEMENT_REGISTRY: Record<string, React.ReactNode> = {
  Home: <Home />,
  TestThroughputPage: <TestThroughputPage />,
  KPI: <KPI />,
};
