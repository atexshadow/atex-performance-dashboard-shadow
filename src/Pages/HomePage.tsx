import * as React from 'react';
import Button from '@mui/material/Button';
import { AppBar, Toolbar, Typography } from '@mui/material';
import DropdownMenu from '../Components/DropdownMenu';

export default function HomePage() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ATEX PERFORMANCE DASHBOARD
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">KPI</Button>
          <Button color="inherit">Test Throughput</Button>
          <div>
            <DropdownMenu></DropdownMenu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}