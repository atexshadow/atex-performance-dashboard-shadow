
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import KPI from "../../Pages/KPI";
import HomePage from "../../Pages/HomePage"; // if you have one
import Dashboard from '../../Pages/Dashboard';

<Route path="/dashboard" element={<Dashboard />} />


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/kpi" element={<KPI />} />
      <Route path="*" element={<Navigate to="/kpi" replace />} />
    </Routes>
  );
};

export default AppRoutes;
