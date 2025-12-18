
// import React from 'react';
// import './Dashboard.css'; // Add your CSS here

// const Dashboard = () => {
//   return (
//     <div className="dashboard-wrapper">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="profile"></div>
//         <nav>
//           <ul>
//             <li>🏠</li>
//             <li>⭐</li>
//             <li>📊</li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="dashboard-container">
//         <div className="dashboard-item">Chart 1</div>
//         <div className="dashboard-item">Chart 2</div>
//         <div className="dashboard-item">Chart 3</div>
//         <div className="dashboard-item">Chart 4</div>
//         <div className="dashboard-item">Chart 5</div>
//         <div className="dashboard-item">Chart 6</div>
//       </main>
//     </div>
//   );
// };

//  export default Dashboard;


// import React from "react";
// import Sidebar from "../Components/Sidebar";
// import TopBar from "../Components/TopBar";
// import { Card } from "../Components/Card";
// import ChartCard from "../Components/ChartCard";
// import ProgressCircle from "../Components/ProgressCircle";
// import "./Dashboard.css";

// const Dashboard: React.FC = () => {
//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <TopBar />
//         <div className="grid-layout">
//           <Card title="Lorem ipsum" value="1974" subtitle="Week" />
//           <Card title="Lorem ipsum" value="287" subtitle="Month" />
          
//           <ChartCard type="line" />
//           <ChartCard type="bar" />
//           <ProgressCircle value={75} />
//           <ChartCard type="pie" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React from "react";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/TopBar";
import { Card } from "../Components/Card";            // named import (matches your current file)
import ChartCard from "../Components/ChartCard";       // default export
import ProgressCircle from "../Components/ProgressCircle";
import "./Dashboard.css";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="grid-layout">
          {/* Metric cards */}
          <Card title="Lorem ipsum" value="1974" subtitle="Week" />
          <Card title="Lorem ipsum" value="287" subtitle="Month" />

          {/* Charts inside ChartCard (NO type prop) */}
          <ChartCard title="Line Chart">
            <LineChart /* add props if required by your chart */ />
          </ChartCard>

          <ChartCard title="Bar Chart">
            <BarChart /* labels={} data={} color={} height={} */ />
          </ChartCard>

          {/* Progress circle */}
          <ProgressCircle value={100} />

          <ChartCard title="Pie Chart">
            <PieChart /* labels={} values={} colors={} height={} */ />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;