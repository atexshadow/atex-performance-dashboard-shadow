 
import React from "react";
import { Typography, Container } from "@mui/material";
import MixedChart from "../Charts/MixedChart";

const ResourceUtilization: React.FC = () => {
  // Example data — replace with real metrics
  const labels = ["Compute", "Storage", "Network", "DB", "Cache", "Misc"];
  const barValues = [62, 48, 75, 40, 55, 30];
  const lineValues = [58, 50, 70, 45, 60, 35];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Resource Utilization
      </Typography>

      {/* Just the mixed chart */}
      <div style={{ height: 360 }}>
        <MixedChart
          labels={labels}
          barValues={barValues}
          lineValues={lineValues}
          barColor="rgba(75, 192, 192, 0.6)"   // teal bars
          lineColor="rgba(255, 159, 64, 0.95)" // orange line
          height={360}
          showCenterText
          centerText="Current FY Utilization"
          stacked={false}
          showSecondaryAxis={false} // set true if units differ
        />
      </div>
    </Container>
  );
};

export default ResourceUtilization;
