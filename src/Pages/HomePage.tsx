
// import * as React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { Link} from 'react-router-dom';
// import DropdownMenu from '../Components/DropdownMenu';
// import Home from './Home';
// import KPI from './KPI';
// import TestThroughputPage from './TestThroughputPage';
// import AnomalyDetection from './AnomalyDetection';
// import CapacityPlanning from './CapacityPlanning';
// import Datasheet from './Datasheet';
// import PredictiveMaintenance from './PredictiveMaintenance';
// import PreventiveMaintenance from './PreventiveMaintenance';
// import ResourceUtilization from './ResourceUtilization';
// import StatisticalProcessControl from './StatisticalProcessControl';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// export default function HomePage() {
//   return (
//     <Router>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             ATEX PERFORMANCE DASHBOARD
//           </Typography>
//           {/* Main Navigation Buttons */}
//           <Button color="inherit" component={Link} to="/home">Home</Button>
//           <Button color="inherit" component={Link} to="/kpi">KPI</Button>
//           <Button color="inherit" component={Link} to="/test-throughput">Test Throughput</Button>
          
//           {/* Dropdown for Other Modules */}
//           <DropdownMenu />
//         </Toolbar>
//       </AppBar>
//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/kpi" element={<KPI />} />
//         <Route path="/test-throughput" element={<TestThroughputPage />} />
//         <Route path="/anomaly-detection" element={<AnomalyDetection />} />
//         <Route path="/capacity-planning" element={<CapacityPlanning />} />
//         <Route path="/datasheet" element={<Datasheet />} />
//         <Route path="/preventive-maintenance" element={<PreventiveMaintenance />} />
//         <Route path="/predictive-maintenance" element={<PredictiveMaintenance />} />
//         <Route path="/resource-utilization" element={<ResourceUtilization />} />
//         <Route path="/statistical-process-control" element={<StatisticalProcessControl />} />
//       </Routes>
//     </Router>
//   );
// }




// src/Pages/HomePage.tsx
import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ModulesDropdown } from '../Components/DropdownMenu'; // ✅ import the wrapper
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
import '../Pages/Dashboard.css';


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
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>

          {/* Dropdown for Other Modules */}
          <ModulesDropdown /> {/* ✅ fixed: provides required 'items' */}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/kpi" element={<KPI />} />
        <Route path="/test-throughput" element={<TestThroughputPage />} />
        <Route path="/anomaly-detection" element={<AnomalyDetection />} />
        <Route path="/capacity-planning" element={<CapacityPlanning />} />
        <Route path="/datasheet" element={<Datasheet />} />
        
        <Route path="/preventive-maintenance" element={<PreventiveMaintenance />} />
        <Route path="/predictive-maintenance" element={<PredictiveMaintenance />} />
        <Route path="/resource-utilization" element={<ResourceUtilization />} />
        <Route path="/statistical-process-control" element={<StatisticalProcessControl />} />
      </Routes>
    </Router>
  );
}
