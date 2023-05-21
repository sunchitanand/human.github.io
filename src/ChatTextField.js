import React, { useEffect, useRef, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { rightIconPath } from './icons';

const ChatTextField = ({ onSend }) => {
  const textFieldRef = useRef(null);
  const containerRef = useRef(null);
  const [textBoxHeight, setTextBoxHeight] = useState('auto');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const resizeTextArea = () => {
      const textField = textFieldRef.current;
      if (textField) {
        textField.style.height = 'auto';
        textField.style.height = `${Math.min(textField.scrollHeight, 150)}px`;
        setTextBoxHeight(textField.style.height);
      }
    };

    resizeTextArea();
    window.addEventListener('resize', resizeTextArea);
    return () => {
      window.removeEventListener('resize', resizeTextArea);
    };
  }, []);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const handleChange = (event) => {
    const textField = textFieldRef.current;
    if (textField) {
      textField.style.height = 'auto';
      textField.style.height = `${Math.min(textField.scrollHeight, 150)}px`;
      setTextBoxHeight(textField.style.height);
    }
    setInputText(event.target.value);
  };

  const handleSend = () => {
    onSend(inputText);
    setInputText('');
    scrollToBottom();
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <div
        ref={containerRef}
        style={{
          paddingBottom: '25px',
          backgroundColor: 'white',
          width: '100%',
          maxHeight: 150,
          overflow: 'hidden',
        }}
      >
        <TextField
          variant="standard"
          fullWidth
          multiline
          minRows={1}
          maxRows={5}
          inputRef={textFieldRef}
          value={inputText}
          onChange={handleChange}
          onKeyPress={handleEnterKeyPress}
          placeholder="Ask anything here"
          InputProps={{
            disableUnderline: true,
            style: {
              backgroundColor: 'black',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '1.2',
              paddingTop: '30px',
              paddingBottom: '25px',
              marginBottom: '20px',
              boxSizing: 'border-box',
              paddingLeft: '20px',
              height: textBoxHeight,
              resize: 'none',
              borderRadius: '10px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              overflowY: 'auto',
              color: 'white',
            },
            endAdornment: (
              <InputAdornment position="end" style={{ marginRight: '15px' }}>
                <IconButton
                  color="primary"
                  edge="end"
                  onClick={handleSend}
                  style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 96 960 960" width="35">
                    <path d={rightIconPath} fill="white" />
                  </svg>
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoFocus
        />
      </div>
    </div>
  );
};

export default ChatTextField;
