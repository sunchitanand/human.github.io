import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Typography } from '@mui/material';
import animationData from './sphere-animation.json';
import './App.css';
import Button from '@mui/material/Button';

const HomePage = () => {
  const animationContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainerRef.current,
      animationData: animationData,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });

    document.body.style.overflow = 'hidden'; // Disable scrolling on the body element

    return () => {
      anim.destroy();
      document.body.style.overflow = 'auto'; // Enable scrolling on unmount
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw' }}>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        zIndex: 2,
      }}>
        <Typography
            ref={textRef}
            variant="h1"
            align="center"
            sx={{
                fontFamily: 'Avenir Next Bold, Poppins-Bold, AvenirNext-Bold',
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                filter: 'blur(0px)',
                transition: 'filter 0.5s',
                fontSize: {
                    xs: '12vw',
                    sm: '7vw',
                    md: '7vw',
                },
                lineHeight: {
                  xs: '1.2', // Increase line spacing at xs breakpoint
                  md: '1',
                  sm: 1
              },
                whiteSpace: 'normal', // Allow text to wrap
                paddingLeft: '7%', // Add padding to the left
                paddingRight: '7%', // Add padding to the right
            }}
        >
            EXPERIENCE THE MAGIC OF BOOKS LIKE NEVER BEFORE
        </Typography>
        <Button 
          color="inherit" 
          href="https://t.co/forU7QA9rV" 
          target="_blank" 
          sx={{ 
            color: 'white', 
            backgroundColor: 'black', 
            marginLeft:'10px',  
            marginTop: '70px', 
            zIndex: 2, 
            fontFamily: 'AvenirNext-Bold, Poppins-Bold', 
            fontWeight: 'bold', 
            // Control size
            fontSize: {
              xs: '4vw', // Increase font size for xs screens
              sm: '2vw',
              md: '1.5vw',
            },
            padding: {
              xs: '2vw 4vw', // Increase padding for xs screens
              sm: '1vw 2vw',
              md: '1vw 2vw',
            },
            '&:hover': {
              backgroundColor: 'white',
              color: 'black',
            }
          }}
        >
          Join Waitlist
      </Button>
      </div>
      <div ref={animationContainerRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '350vw', height: '350vh', zIndex: 1, filter: 'blur(0px)', transition: 'filter 0.5s', opacity: 0.2}}></div>      {/* Add other content or components for your homepage */}
    </div>
  );
};

export default HomePage;
