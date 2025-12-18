 
 
import React from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import PieChart from "../Charts/PieChart"; // adjust path if needed

const PreventiveMaintenance: React.FC = () => {
  const labels = ["Scheduled", "Completed", "Overdue", "In Progress", "Deferred"];
  const values = [24, 18, 5, 9, 3];
  const colors = [
    "rgba(99, 102, 241, 0.7)",
    "rgba(16, 185, 129, 0.7)",
    "rgba(239, 68, 68, 0.7)",
    "rgba(234, 179, 8, 0.7)",
    "rgba(147, 51, 234, 0.7)",
  ];
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Preventive Maintenance
      </Typography>

      <Typography color="text.secondary" gutterBottom>
        This is the Preventive Maintenance page. Display data tables and charts here.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Stack provides vertical spacing between children */}
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Work Order Status
            </Typography>

            {/* Box for fixed-height chart container */}
            <Box sx={{ height: 320 }}>
              <PieChart
                labels={labels}
                values={values}
                colors={colors}
                height={320}
                showCenterText
                centerText={`Total: ${total}`}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Add more cards/sections here as needed */}
        {/* <Card>...</Card> */}
      </Stack>
    </Container>
  );
};

export default  PreventiveMaintenance;


//   addding via axios

// import React from "react";
// import {
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Divider,
//   Alert,
//   Skeleton,
//   Box,
//   Stack,
// } from "@mui/material";
// import PieChart from "../Pages/PieChart"; // 🔧 adjust path if needed

// type StatusItem = { label: string; count: number; color?: string };
// type BackendResponse = { statusBreakdown: StatusItem[] };

// const PredictiveMaintenance: React.FC = () => {
//   const [labels, setLabels] = React.useState<string[]>([]);
//   const [values, setValues] = React.useState<number[]>([]);
//   const [colors, setColors] = React.useState<string[]>([]);
//   const [loading, setLoading] = React.useState<boolean>(true);
//   const [error, setError] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // ⬇️ Use your actual backend URL here if different origin (e.g., http://localhost:3001)
//         const res = await fetch("/api/maintenance/stats", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//         }

//         const data: BackendResponse = await res.json();

//         if (!data.statusBreakdown || !Array.isArray(data.statusBreakdown)) {
//           throw new Error("Invalid response: statusBreakdown missing or not an array");
//         }

//         const l = data.statusBreakdown.map((item) => item.label);
//         const v = data.statusBreakdown.map((item) => item.count);
//         const c = data.statusBreakdown.map(
//           (item) => item.color ?? "rgba(99, 102, 241, 0.7)" // fallback color
//         );

//         setLabels(l);
//         setValues(v);
//         setColors(c);
//       } catch (err: any) {
//         setError(err?.message ?? "Failed to load maintenance stats");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   const total = React.useMemo(() => values.reduce((a, b) => a + b, 0), [values]);

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" gutterBottom>
//         Preventive Maintenance
//       </Typography>

//       <Typography color="text.secondary" gutterBottom>
//         This is the Preventive Maintenance page. Display data tables and charts here.
//       </Typography>

//       <Divider sx={{ my: 2 }} />

//       {/* Stack provides vertical spacing between sections without Grid */}
//       <Stack spacing={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Work Order Status
//             </Typography>

//             {/* Loading state */}
//             {loading && <Skeleton variant="rectangular" height={320} />}

//             {/* Error state */}
//             {error && !loading && <Alert severity="error">{error}</Alert>}

//             {/* Chart when data is ready */}
//             {!loading && !error && (
//               <Box sx={{ height: 320 }}>
//                 <PieChart
//                   labels={labels}
//                   values={values}
//                   colors={colors}
//                   height={320}
//                   showCenterText
//                   centerText={`Total: ${total}`}
//                 />
//               </Box>
//             )}
//           </CardContent>
//         </Card>

//         {/* You can add more cards/sections below as needed */}
//         {/* <Card>...</Card> */}
//       </Stack>
//     </Container>
//   );
// };

// export default PredictiveMaintenance;

