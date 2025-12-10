import React from "react";
import { Typography, Container } from "@mui/material";

export default function Home(){
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography>
        This is the Home page. Add charts and metrics here.
      </Typography>
    </Container>
  );
};

