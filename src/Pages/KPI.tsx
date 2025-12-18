
// import React, { useState } from "react";
// import ChartCard from "../Components/ChartCard";
// import { BarChart, LineChart, ScatterChart, DoughnutChart, PieChart,} from "../Charts";
// import "react-calendar/dist/Calendar.css";

// import ResourceUtilization from "../Pages/ResourceUtilization";


// const revenueLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
// const revenueValues = [120, 150, 90, 180, 210, 160];

// const utilizationLabels = ["Line A", "Line B", "Line C", "Line D"];
// const utilizationValues = [75, 62, 88, 54];

// const defectLabels = ["Defect1", "W2", "W3", "W4"];
// const defectSeries = [
//   { label: "Critical", data: [4, 3, 6, 2], color: "#FF6B6B" },
//   { label: "Minor", data: [10, 8, 12, 7], color: "#4D96FF" },
// ];

// const doughnutLabels = ["Passed", "Rework", "Rejected"];
// const doughnutValues = [70, 20, 10];
// const doughnutColors = ["#6BCB77", "#FFD93D", "#FF6B6B"];

// const pieLabels = ["Preventive", "Corrective", "Predictive"];
// const pieValues = [40, 45, 15];
// const pieColors = ["#4D96FF", "#6C5DD3", "#22D3EE"];

// const scatterDatasets = [
//   {
//     label: "Throughput vs Downtime",
//     data: [
//       { x: 50, y: 3 },
//       { x: 65, y: 2 },
//       { x: 80, y: 5 },
//       { x: 55, y: 1 },
//     ],
//     color: "#6BCB77",
//   },
// ];

// const KPI: React.FC = () => {
//   return (
//     <div style={{ padding: 14, background: "#F4F6FF", minHeight: "100vh" }}>
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 16,
//         }}
//       >
//         <h2 style={{ margin: 0 }}>KPI Dashboard</h2>
//         <input
//           type="search"
//           placeholder="Search..."
//           style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", width: 200 }}
//         />
//       </div>

//       {/* 12-column grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(20, 1fr)", //Correction 
//           gridAutoRows: "minmax(220px, auto)",
//           gap: 16,
//         }}
//       >
//         {/* Line chart wide */}
//         <div style={{ gridColumn: "span 12" }}>
//           <ChartCard title="Resource Utilization">
//             <LineChart labels={defectLabels} series={defectSeries} title="Defects" height={200} />
//           </ChartCard>
//         </div>

//         <div style={{ gridColumn: "span 12" }}>
//           <ResourceUtilization />
//         </div>

//         {/* Bar charts */}
//         <div style={{ gridColumn: "span 8" }}>
//           <ChartCard title="Utilization by Line">
//             <BarChart labels={utilizationLabels} data={utilizationValues} color="#4D96FF" height={200} />
//           </ChartCard>
//         </div>

//         <div style={{ gridColumn: "span 8" }}>
//           <ChartCard title="Datasheet">
//             <BarChart labels={revenueLabels} data={revenueValues} color="#6C5DD3" height={200} />
//           </ChartCard>
//         </div>

//         {/* Small charts */}
//         <div style={{ gridColumn: "span 10" }}>
//           <ChartCard title="Quality Split">
//             <DoughnutChart
//               labels={doughnutLabels}
//               values={doughnutValues}
//               colors={doughnutColors}
//               height={200}
//               showCenterText
//               centerText="100%"
//             />
//           </ChartCard>
//         </div>

//         <div style={{ gridColumn: "span 10" }}>
//           <ChartCard title="Maintenance Mix">
//             <PieChart labels={pieLabels} values={pieValues} colors={pieColors} height={250} />
//           </ChartCard>
//         </div>

//         <div style={{ gridColumn: "span 6" }}>
//           <ChartCard title="Capacity Planning">
//             <ScatterChart
//               datasets={scatterDatasets}
//               title="Throughput vs Downtime"
//               xLabel="Throughput"
//               yLabel="Downtime (hrs)"
//               height={250}
//             />
//           </ChartCard>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default KPI;




// import React, { useState } from "react";
// import ChartCard from "../Components/ChartCard";
// import {
//   BarChart,
//   LineChart,
//   ScatterChart,
//   DoughnutChart,
//   PieChart,
// } from "../Charts";
// import PointStylingLineChart from "../Charts/PointStylingLineChart"; 
// import ProgressiveLineChart from "../Charts/ProgressiveLineChart"

// import ResourceUtilization from "../Pages/ResourceUtilization";

// const revenueLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
// const revenueValues = [120, 150, 90, 180, 210, 160];

// const utilizationLabels = ["Line A", "Line B", "Line C", "Line D"];
// const utilizationValues = [75, 62, 88, 54];

// const defectLabels = ["Defect1", "W2", "W3", "W4"];
// const defectSeries = [
//   { label: "Critical", data: [4, 3, 6, 2], color: "#FF6B6B" },
//   { label: "Minor", data: [10, 8, 12, 7], color: "#4D96FF" }
// ];

// const doughnutLabels = ["Passed", "Rework", "Rejected"];
// const doughnutValues = [70, 20, 10];
// const doughnutColors = ["#6BCB77", "#FFD93D", "#FF6B6B"];

// const pieLabels = ["Preventive", "Corrective", "Predictive"];
// const pieValues = [40, 45, 15];
// const pieColors = ["#4D96FF", "#6C5DD3", "#22D3EE"];

// const scatterDatasets = [
//   {
//     label: "Throughput vs Downtime",
//     data: [
//       { x: 50, y: 3 },
//       { x: 65, y: 2 },
//       { x: 80, y: 5 },
//       { x: 55, y: 1 }
//     ],
//     color: "#6BCB77"
//   }
// ];

// const KPI: React.FC = () => {
//   return (
//     <div style={{ padding: 10, background: "#F4F6FF", minHeight: "100vh" }}>
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 16
//         }}
//       >
//         <h2 style={{ margin: 0 }}>KPI Dashboard</h2>
//         <input
//           type="search"
//           placeholder="Search..."
//           style={{
//             padding: "6px 10px",
//             borderRadius: 8,
//             border: "1px solid #ddd",
//             width: 100
//           }}
//         />
//       </div>

//       {/* 20-column grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(2, 1fr)",
//           gridAutoRows: "minmax(220px, auto)",
//           gap: 10
//         }}
//       >
//         {/* Line chart wide */}
//         <div style={{ gridColumn: "span 8" }}>
//           <ChartCard title="Test Throughput">
//             <LineChart
//               labels={defectLabels}
//               series={defectSeries}
//               title="Defects"
//               height={180}
//             />
//           </ChartCard>
//         </div>

//         <div style={{ gridColumn: "span 6" }}>
//           <ResourceUtilization />
//         </div>
        
//         {/* Bar charts */}
//         <div style={{ gridColumn: "span 8" }}>
//           <ChartCard title="Yield Analysis">
//             <BarChart
//               labels={utilizationLabels}
//               data={utilizationValues}
//               color="#4D96FF"
//               height={180}
//             />
//           </ChartCard>
//         </div>

//         <div style={{ gridColumn: "span 6" }}>
//           <ChartCard title="Equipment Utilization">
//             <BarChart
//               labels={revenueLabels}
//               data={revenueValues}
//               color="#6C5DD3"
//               height={180}
//             />
//           </ChartCard>
//         </div>

//         {/* Small charts */}
//         <div style={{ gridColumn: "span 6" }}>
//           <ChartCard title="Test Program Performance">
//             <DoughnutChart
//               labels={doughnutLabels}
//               values={doughnutValues}
//               colors={doughnutColors}
//               height={180}
//               showCenterText
//               centerText="100%"
//             />
//           </ChartCard>
//         </div>

//         <div style={{ gridColumn: "span 4" }}>
//           <ChartCard title="Failure Analysis">
//             <PieChart
//               labels={pieLabels}
//               values={pieValues}
//               colors={pieColors}
//               height={250}
//             />
//           </ChartCard>
//         </div>

//         <div style={{ gridColumn: "span 4" }}>
//           <ChartCard title="Operator Performance">
//             <ScatterChart
//               datasets={scatterDatasets}
//               title="Throughput vs Downtime"
//               xLabel="Throughput"
//               yLabel="Downtime (hrs)"
//               height={250}
//             />
//           </ChartCard>
//         </div>

//         {/* ✅ New SPC Chart */}
//         <div style={{ gridColumn: "span 8" }}>
//           <ChartCard title="Test Station Health">
//             <PointStylingLineChart />          
//           </ChartCard>
//         </div>
        
//  {/* ✅ New Progressive Line Chart */}
//         <div style={{ gridColumn: "span 8" }}>
//           <ChartCard title="Alerts & Notifications">
//             <ProgressiveLineChart />
//           </ChartCard>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KPI;


// import React from "react";
// import ChartCard from "../Components/ChartCard";
// import {
//   BarChart,
//   LineChart,
//   ScatterChart,
//   DoughnutChart,
//   PieChart,
// } from "../Charts";
// import PointStylingLineChart from "../Charts/PointStylingLineChart";
// import ProgressiveLineChart from "../Charts/ProgressiveLineChart";
// import ResourceUtilization from "../Pages/ResourceUtilization";

// const revenueLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
// const revenueValues = [120, 150, 90, 180, 210, 160];

// const utilizationLabels = ["A", "B", "C", "D"];
// const utilizationValues = [75, 62, 88, 54];

// const defectLabels = ["Defect1", "Defect2", "Defect3", "Defect4"];
// const defectSeries = [
//   { label: "Critical", data: [4, 3, 6, 2], color: "#FF6B6B" },
//   { label: "Minor", data: [10, 8, 12, 7], color: "#4D96FF" },
// ];

// const doughnutLabels = ["Passed", "Rework", "Rejected"];
// const doughnutValues = [70, 20, 10];
// const doughnutColors = ["#6BCB77", "#FFD93D", "#FF6B6B"];

// const pieLabels = ["Preventive", "Corrective", "Predictive"];
// const pieValues = [40, 45, 15];
// const pieColors = ["#4D96FF", "#6C5DD3", "#22D3EE"];

// const scatterDatasets = [
//   {
//     label: "Throughput vs Downtime",
//     data: [
//       { x: 50, y: 3 },
//       { x: 65, y: 2 },
//       { x: 80, y: 5 },
//       { x: 55, y: 1 },
//     ],
//     color: "#6BCB77",
//   },
// ];

// const KPI: React.FC = () => {
//   return (
//     <div style={{ padding: 10, background: "#F4F6FF", minHeight: "100vh" }}>
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 16,
//         }}
//       >
//         <h2 style={{ margin: 0 }}>KPI Dashboard</h2>
//         <input
//           type="search"
//           placeholder="Search..."
//           style={{
//             padding: "6px 10px",
//             borderRadius: 8,
//             border: "1px solid #ddd",
//             width: 100,
//           }}
//         />
//       </div>

//       {/* ✅ Uniform Grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
//           gap: 20,
//           alignItems: "start", // Prevent overlap
//         }}
//       >
//         {/* Each chart inside a fixed-height card */}
//         <ChartCard title="Test Throughput" style={{ height: "300px" }}>
//           <LineChart
//             labels={defectLabels}
//             series={defectSeries}
//             title="Defects"
//             height={220}
//           />
//         </ChartCard>

//         <ChartCard title="Resource Utilization" style={{ height: "300px" }}>
//           <ResourceUtilization />
//         </ChartCard>

//         <ChartCard title="Yield Analysis" style={{ height: "300px" }}>
//           <BarChart
//             labels={utilizationLabels}
//             data={utilizationValues}
//             color="#4D96FF"
//             height={220}
//           />
//         </ChartCard>

//         <ChartCard title="Equipment Utilization" style={{ height: "300px" }}>
//           <BarChart
//             labels={revenueLabels}
//             data={revenueValues}
//             color="#6C5DD3"
//             height={220}
//           />
//         </ChartCard>

//         <ChartCard title="Test Program Performance" style={{ height: "300px" }}>
//           <DoughnutChart
//             labels={doughnutLabels}
//             values={doughnutValues}
//             colors={doughnutColors}
//             height={220}
//             showCenterText
//             centerText="100%"
//           />
//         </ChartCard>

//         <ChartCard title="Failure Analysis" style={{ height: "300px" }}>
//           <PieChart
//             labels={pieLabels}
//             values={pieValues}
//             colors={pieColors}
//             height={220}
//           />
//         </ChartCard>

//         <ChartCard title="Operator Performance" style={{ height: "300px" }}>
//           <ScatterChart
//             datasets={scatterDatasets}
//             title="Throughput vs Downtime"
//             xLabel="Throughput"
//             yLabel="Downtime (hrs)"
//             height={220}
//           />
//         </ChartCard>

//         <ChartCard title="Test Station Health" style={{ height: "300px" }}>
//           <PointStylingLineChart />
//         </ChartCard>

//                <ChartCard title="Alerts & Notifications" style={{ height: "300px" }}>
//           <ProgressiveLineChart />
//         </ChartCard>
//       </div>
//     </div>
//   );
// };

// export default KPI;





import React from "react";
import ChartCard from "../Components/ChartCard";
import {
  BarChart,
  LineChart,
  ScatterChart,
  DoughnutChart,
  PieChart,
} from "../Charts";
import PointStylingLineChart from "../Charts/PointStylingLineChart";
import ProgressiveLineChart from "../Charts/ProgressiveLineChart";
import ResourceUtilization from "../Pages/ResourceUtilization";

const revenueLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const revenueValues = [120, 150, 90, 180, 210, 160];

const utilizationLabels = ["A", "B", "C", "D"];
const utilizationValues = [75, 62, 88, 54];

const defectLabels = ["Defect1", "Defect2", "Defect3", "Defect4"];
const defectSeries = [
  { label: "Critical", data: [4, 3, 6, 2], color: "#FF6B6B" },
  { label: "Minor", data: [10, 8, 12, 7], color: "#4D96FF" },
];

const doughnutLabels = ["Passed", "Rework", "Rejected"];
const doughnutValues = [70, 20, 10];
const doughnutColors = ["#6BCB77", "#FFD93D", "#FF6B6B"];

const pieLabels = ["Preventive", "Corrective", "Predictive"];
const pieValues = [40, 45, 15];
const pieColors = ["#4D96FF", "#6C5DD3", "#22D3EE"];

const scatterDatasets = [
  {
    label: "Throughput vs Downtime",
    data: [
      { x: 50, y: 3 },
      { x: 65, y: 2 },
      { x: 80, y: 5 },
      { x: 55, y: 1 },
    ],
    color: "#6BCB77",
  },
];

const KPI: React.FC = () => {
  return (
    <div style={{ padding: 10, background: "#F4F6FF", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>KPI Dashboard</h2>
        <input
          type="search"
          placeholder="Search..."
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            width: 100,
          }}
        />
      </div>

      {/* ✅ Uniform Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* Each chart inside a fixed-height card */}
        <ChartCard title="Test Throughput" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "300px", overflow: "hidden", position: "relative" }}>
            <LineChart labels={defectLabels} series={defectSeries} title="Defects" height={250} />
          </div>
        </ChartCard>

        <ChartCard title="Resource Utilization" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "300px", overflow: "hidden", position: "relative" }}>
            <ResourceUtilization />
          </div>
        </ChartCard>

        <ChartCard title="Yield Analysis" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "250px", overflow: "hidden", position: "relative" }}>
            <BarChart labels={utilizationLabels} data={utilizationValues} color="#4D96FF" height={200} />
          </div>
        </ChartCard>

        <ChartCard title="Equipment Utilization" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
            <BarChart labels={revenueLabels} data={revenueValues} color="#6C5DD3" height={220} />
          </div>
        </ChartCard>

        <ChartCard title="Test Program Performance" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
            <DoughnutChart
              labels={doughnutLabels}
              values={doughnutValues}
              colors={doughnutColors}
              height={220}
              showCenterText
              centerText="100%"
            />
          </div>
        </ChartCard>

        <ChartCard title="Failure Analysis" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
            <PieChart labels={pieLabels} values={pieValues} colors={pieColors} height={220} />
          </div>
        </ChartCard>

        <ChartCard title="Operator Performance" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "250px", overflow: "hidden", position: "relative" }}>
            <ScatterChart
              datasets={scatterDatasets}
              title="Throughput vs Downtime"
              xLabel="Throughput"
              yLabel="Downtime (hrs)"
              height={220}
            />
          </div>
        </ChartCard>

        <ChartCard title="Test Station Health" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
            <PointStylingLineChart />
          </div>
        </ChartCard>

        <ChartCard title="Alerts & Notifications" style={{ height: "300px" }}>
          <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
                       <ProgressiveLineChart />
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default KPI;