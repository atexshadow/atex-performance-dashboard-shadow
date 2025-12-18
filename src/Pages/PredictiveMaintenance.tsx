
import React from "react";
import { Typography, Container, Box, Paper } from "@mui/material";
import DoughnutChart from "../Charts/DoughnutChart";

const PredictiveMaintenance: React.FC = () => {
  // Example data you can replace with real values
  const labels = ["Scheduled", "Reactive", "Inspection", "Calibration"];
  const values = [40, 25, 20, 15];
  const colors = ["#36A2EB", "#8b0b27ff", "#FFCE56", "#033a3aff"];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        PredectiveMaintenance
      </Typography>

      <Typography paragraph>
        This is the Predective Maintaiance page. Display data tables here.
      </Typography>

      {/* Card-like wrapper for the chart */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <h6>Droughnut Graph Presentation</h6>
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <DoughnutChart
            labels={labels}
            values={values}
            colors={colors}
            height={400}
            showCenterText
            centerText="100 Records"
          />
        </Box>
      </Paper>

      
    </Container>
  );
};
export default PredictiveMaintenance;



//Adding via Axios from the backend 

// import React from "react";
// import {
//   Typography,
//   Container,
//   Box,
//   Paper,
//   Skeleton,
//   Alert,
// } from "@mui/material";
// import DoughnutChart from "../Pages/DoughnutChart"; // 🔧 adjust path if needed

// // --- Types for your backend response ---
// type BreakdownItem = {
//   label: string;
//   count: number;
//   color?: string; // optional if backend doesn't send a color
// };

// type BackendResponse = {
//   maintenanceBreakdown: BreakdownItem[];
//   totalRecords?: number; // optional if backend provides it
// };

// const PredictiveMaintenance: React.FC = () => {
//   const [labels, setLabels] = React.useState<string[]>([]);
//   const [values, setValues] = React.useState<number[]>([]);
//   const [colors, setColors] = React.useState<string[]>([]);
//   const [loading, setLoading] = React.useState<boolean>(true);
//   const [error, setError] = React.useState<string | null>(null);
//   const [total, setTotal] = React.useState<number | null>(null);

//   React.useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // ⬇️ Replace with your actual backend URL if not same-origin
//         // e.g., const res = await fetch("http://localhost:3001/api/maintenance/breakdown");
//         const res = await fetch("/api/maintenance/breakdown", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//         }

//         const data: BackendResponse = await res.json();

//         // Validate the shape minimally
//         if (!data.maintenanceBreakdown || !Array.isArray(data.maintenanceBreakdown)) {
//           throw new Error("Invalid response: maintenanceBreakdown missing or not an array");
//         }

//         // Map to chart props
//         const l = data.maintenanceBreakdown.map((item) => item.label);
//         const v = data.maintenanceBreakdown.map((item) => item.count);
//         const c = data.maintenanceBreakdown.map(
//           (item) => item.color ?? "#36A2EB" // fallback color if backend doesn't send
//         );

//         setLabels(l);
//         setValues(v);
//         setColors(c);

//         // Prefer backend-provided total; otherwise compute from values
//         if (typeof data.totalRecords === "number") {
//           setTotal(data.totalRecords);
//         } else {
//           setTotal(v.reduce((a, b) => a + b, 0));
//         }
//       } catch (e: any) {
//         setError(e.message ?? "Failed to load maintenance breakdown");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   const centerText = React.useMemo(
//     () => (total != null ? `${total} Records` : `Total: ${values.reduce((a, b) => a + b, 0)}`),
//     [total, values]
//   );

//   return (
//     <Container sx={{ py: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         PredectiveMaintenance
//       </Typography>

//       <Typography paragraph>
//         This is the Predective Maintaiance page. Display data tables here.
//       </Typography>

//       {/* Card-like wrapper for the chart */}
//       <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Doughnut Graph Presentation
//         </Typography>

//         {/* Loading state */}
//         {loading && <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />}

//         {/* Error state */}
//         {error && !loading && <Alert severity="error">{error}</Alert>}

//         {/* Chart when ready */}
//         {!loading && !error && (
//           <Box sx={{ width: "100%", maxWidth: 600 }}>
//             <DoughnutChart
//               labels={labels}
//               values={values}
//               colors={colors}
//               height={400}
//               showCenterText
//               centerText={centerText}
//             />
//           </Box>
//         )}
//       </Paper>

//       {/* Add your data tables below */}
//       {/* <YourDataTableComponent /> */}
//     </Container>
//   );
// };

// export default PredictiveMaintenance;
