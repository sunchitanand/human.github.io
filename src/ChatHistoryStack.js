import React, { useEffect, useRef } from 'react';
import { Paper, Typography } from '@mui/material';
// eslint-disable-next-line
import { TEXT_FIELD_BG } from './colors';

const ChatHistoryStack = ({ chatHistory }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to the bottom of the container
    }
  }, [chatHistory]);

  return (
    <div style={{ height: '80%', overflowY: 'auto' }} ref={containerRef}>
      {chatHistory.map((message, index) => (
        <React.Fragment key={index}>
          <Paper sx={{ padding: '10px', marginBottom: '10px', backgroundColor: 'white', boxShadow: 'none' }}>
            <Typography variant="body1" fontFamily="Poppins, sans-serif" fontWeight="bold">
              {message}
            </Typography>
          </Paper>
          <Typography
            variant="body2"
            fontFamily="Poppins, sans-serif"
            sx={{
              backgroundColor: 'white',
              marginTop: '5px',
              padding: '10px',
            }}
          >
            AI just responded
          </Typography>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChatHistoryStack;
