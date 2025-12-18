import React from "react";
import PieChart from "../Charts/PieChart"; // adjust path if needed
import {
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  Box,
  Stack,
} from "@mui/material";


const PreventiveMaintenance: React.FC = () => {
  const labels = ["Scheduled", "Completed", "Overdue", "In Progress", "Deferred"];
  const values = [24, 56, 5, 9, 3];
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
