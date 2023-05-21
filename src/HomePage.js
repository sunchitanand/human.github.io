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

    const handleScroll = () => {
      const animationOffset = window.innerHeight * 0.3;
      const animationTriggerPoint = animationContainerRef.current.offsetTop - animationOffset;

      if (window.pageYOffset > animationTriggerPoint) {
        anim.play();
        animationContainerRef.current.style.filter = 'blur(0)';
        textRef.current.style.filter = 'blur(0)';
      } else {
        anim.pause();
        animationContainerRef.current.style.filter = 'blur(10px)';
        textRef.current.style.filter = 'blur(10px)';
      }

      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const scrollEndThreshold = 10; // Adjust this value as needed

      if (scrollPosition < scrollEndThreshold) {
        animationContainerRef.current.style.filter = 'blur(10px)';
        textRef.current.style.filter = 'blur(10px)';
      }
    };

    // Enable this line to add scroll blur effect
    // window.addEventListener('scroll', handleScroll); 

    return () => {
      anim.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100%', paddingTop: '60px' }}>
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, width: '90%' }}>
        <Typography
            ref={textRef}
            variant="h1"
            align="right"
            sx={{
                fontFamily: 'Poppins, sans-serif',
                color: 'black',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                filter: 'blur(0px)',
                transition: 'filter 0.5s',
                fontSize: '80px'
            }}
        >
            BUILDING THE NEXT GENERATION OF AI INTERFACES
        </Typography>
      </div>
      <div ref={animationContainerRef} style={{ width: '800px', height: '800px', margin: 'auto', justifyContent: 'center', alignItems: 'center', zIndex: 0, filter: 'blur(0px)', transition: 'filter 0.5s' }}></div>
      {/* Add other content or components for your homepage */}
    </div>
  );
};

export default HomePage;
