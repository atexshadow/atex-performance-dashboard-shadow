
// import React from "react";
// import { Typography, Container } from "@mui/material";

// const AnomalyDetection: React.FC = () => {
//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Anomaly Detection
//       </Typography>
//       <Typography>
//         This is the Anomaly Detection page. Add anomaly detection logic here.
//       </Typography>
//     </Container>
//   );
// };

// export default AnomalyDetection;



import React from "react";
import ProgressiveLineChart from "../Charts/ProgressiveLineChart";

const AnomalyDetection: React.FC = () => {
  return (
    <div>
      <h2>Anomaly Detection</h2>
      <ProgressiveLineChart />
    </div>
  );
};

export default AnomalyDetection;