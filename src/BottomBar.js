import React from 'react';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { styled } from '@mui/system';

const BottomBarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '8px',
  backgroundColor: 'white',
  height: '64px',
});

const LinkedinIconWrapper = styled(IconButton)(({ theme }) => ({
  marginLeft: '8px',
  marginRight: '7px', // Add right padding to the Twitter icon
  color: '#444645',
}));

const TwitterIconWrapper = styled(IconButton)(({ theme }) => ({
    marginLeft: '8px',
    marginRight: '20px', // Add right padding to the Twitter icon
    color: '#444645',
  }));

const BottomBar = () => {
  return (
    <BottomBarContainer>
      <LinkedinIconWrapper color="inherit" aria-label="LinkedIn">
        <LinkedInIcon />
      </LinkedinIconWrapper>
      <TwitterIconWrapper color="inherit" aria-label="Twitter">
        <TwitterIcon />
      </TwitterIconWrapper>
    </BottomBarContainer>
  );
};

export default BottomBar;
