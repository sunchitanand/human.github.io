import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Typography } from '@mui/material';
import animationData from './sphere-animation.json';
import './App.css';

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
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, width: '200%' }}>
        <Typography
            ref={textRef}
            variant="h1"
            align="center"
            sx={{
                fontFamily: 'Poppins, sans-serif',
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                filter: 'blur(0px)',
                transition: 'filter 0.5s',
                fontSize: '8vw',
                position: 'absolute',
                top: '15%',  // Adjust this value to position the Typography higher than the center
                left: '50%',
                transform: 'translate(-50%, -80%)',
                whiteSpace: 'normal', // Allow text to wrap
                paddingLeft: '2%', // Add padding to the left
                paddingRight: '2%', // Add padding to the right
            }}
        >
            UPDATE THE WAY YOU CONSUME BOOKS
        </Typography>
      </div>
      <div ref={animationContainerRef} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200vw', height: '200vh', zIndex: 1, filter: 'blur(0px)', transition: 'filter 0.5s', opacity: 0.2}}></div>      {/* Add other content or components for your homepage */}
    </div>
  );
};

export default HomePage;
