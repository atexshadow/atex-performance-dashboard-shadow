
import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link} from 'react-router-dom';
import DropdownMenu from '../Components/DropdownMenu';
import Home from './Home';
import KPI from './KPI';
import TestThroughputPage from './TestThroughputPage';
import AnomalyDetection from './AnomalyDetection';
import CapacityPlanning from './CapacityPlanning';
import Datasheet from './Datasheet';
import PredictiveMaintenance from './PredictiveMaintenance';
import PreventiveMaintenance from './PreventiveMaintenance';
import ResourceUtilization from './ResourceUtilization';
import StatisticalProcessControl from './StatisticalProcessControl';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from '../Features/Routes/AppRoutes';

export default function HomePage() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ATEX PERFORMANCE DASHBOARD
          </Typography>
          {/* Main Navigation Buttons */}
          <Button color="inherit" component={Link} to="/home">Home</Button>
          <Button color="inherit" component={Link} to="/kpi">KPI</Button>
          <Button color="inherit" component={Link} to="/test-throughput">Test Throughput</Button>
          
          {/* Dropdown for Other Modules */}
          <DropdownMenu />
        </Toolbar>
      </AppBar>
      <AppRoutes></AppRoutes>
    </Router>
  );
}
