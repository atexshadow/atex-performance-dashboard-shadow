
// import React from "react";
// import { Typography, Container } from "@mui/material";

// const CapacityPlanning: React.FC = () => {
//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Capacity Planning
//       </Typography>
//       <Typography>
//         This is the Capacity Planning page. Add planning tools here.
//       </Typography>
//     </Container>
//   );
// };

// export default CapacityPlanning;




import React from "react";
import ScatterChart from "../Charts/ScatterChart";

const CapacityPlanning: React.FC = () => {
  // Example data:
  // X = capacity (hours available per sprint/week)
  // Y = utilization (%) used
  const teamA = [
    { x: 120, y: 75 },
    { x: 130, y: 80 },
    { x: 110, y: 68 },
    { x: 140, y: 85 },
  ];

  const teamB = [
    { x: 100, y: 60 },
    { x: 105, y: 65 },
    { x: 95,  y: 58 },
    { x: 115, y: 72 },
  ];
  const teamC = [
    { x: 90, y: 60 },
    { x: 105, y: 70 },
    { x: 95,  y: 98 },
    { x: 115, y: 99 },
  ];

  const contractors = [
    { x: 60, y: 50 },
    { x: 80, y: 62 },
    { x: 75, y: 59 },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ marginBottom: "12px" }}>Capacity Planning</h2>

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: 8,
          padding: "12px",
          boxSizing: "border-box",
        }}
      >
        <ScatterChart
          datasets={[
            { label: "Team A", data: teamA, color: "#0ea5e9" },   // sky-500
            { label: "Team B", data: teamB, color: "#10b981" },   // green-500
            { label: "Team C", data: teamC, color: "#ff081cff" },   // green-500
            { label: "Contractors", data: contractors, color: "#f59e0b" }, // amber-500
          ]}
          title="Capacity (hrs) vs Utilization (%)"
          xLabel="Capacity (hours)"
          yLabel="Utilization (%)"
          height={480}
        />
      </div>
    </div>
  );
};

export default CapacityPlanning;
