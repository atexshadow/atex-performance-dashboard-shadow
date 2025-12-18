
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