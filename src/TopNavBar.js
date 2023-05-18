import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TopNavBar = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar sx={{ backgroundColor: 'white' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
          Human+
        </Typography>
        <div>
          <Button color="inherit" href="/" sx={{ color: 'black' }}>Home</Button>
          <Button color="inherit" href="/about" sx={{ color: 'black' }}>Philosophy</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
