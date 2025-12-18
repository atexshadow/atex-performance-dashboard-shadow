
import React from "react";
import { Typography, Container } from "@mui/material";

const Datasheet: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Datasheet
      </Typography>
      <Typography>
        This is the Datasheet page. Display data tables here.
      </Typography>
    </Container>
  );
};

export default Datasheet;
