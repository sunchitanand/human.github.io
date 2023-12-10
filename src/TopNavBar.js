import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TopNavBar = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar sx={{ backgroundColor: 'white' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', cursor: 'pointer', zIndex: 2}} onClick={() => window.location.href = '/'}>
          Tadaa
        </Typography>
        <div>
          {/* <Button color="inherit" href="/" sx={{ color: 'black',  zIndex: 2}}>Home</Button> */}
          {/* <Button color="inherit" href="/about" sx={{ color: 'black',  zIndex: 2}}>Philosophy</Button> */}
          <Button color="inherit" href="https://t.co/forU7QA9rV" target="_blank" sx={{ color: 'white', backgroundColor: 'black', marginLeft:'10px',  zIndex: 2}}>Join Waitlist</Button>        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
