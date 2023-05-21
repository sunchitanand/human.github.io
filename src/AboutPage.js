import React from 'react';
import Typography from '@mui/material/Typography';
import BottomBar from './BottomBar';

const AboutPage = ({ editMessage }) => {
  const paragraphs = editMessage.split('\n\n'); // Split the text into paragraphs using double line breaks

  return (
    <div>
      <br /> <br /> <br />
      <Typography variant="h2" align="center" sx={{ fontFamily: 'Poppins, sans-serif', color: 'black', fontWeight: 'bold', textTransform: 'capitalize', transition: 'filter 0.5s', width: '80%', margin: '0 auto' }}>
        The Evolution of Human-Computer Interaction: From Syntax to Semantics
      </Typography>
      <br /> <br /> <br /> <br /> <br />
      {paragraphs.map((paragraph, index) => (
        <React.Fragment key={index}>
          <Typography
            variant="h6"
            align="left"  
            sx={{ 
              fontFamily: 'Poppins, sans-serif',
              color: 'black',
              fontWeight: 'regular',
              width: '50%', 
              margin: '0 auto',
              fontSize: '18px'
            }}
            paragraph
          >
            {paragraph}
          </Typography>
          {index < paragraphs.length - 1 && <br />} {/* Add line break if not the last paragraph */}
        </React.Fragment>
      ))}
      <br />
      <BottomBar />
    </div>
  );
};

export default AboutPage;
