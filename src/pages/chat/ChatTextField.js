import React, { useEffect, useRef, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { rightIconPath } from '../../icons';
import './ChatTextField.css';

const ChatTextField = ({ onSend }) => {
  const textFieldRef = useRef(null);
  const containerRef = useRef(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const resizeTextArea = () => {
      const textField = textFieldRef.current;
      if (textField) {
        textField.style.height = 'auto';
        textField.style.height = `${Math.min(textField.scrollHeight, 150)}px`;
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
    }
    setInputText(event.target.value);
  };

  const handleSend = () => {
    onSend(inputText);
    setInputText('');
    scrollToBottom();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container" ref={containerRef}>
      <TextField
        variant="standard"
        fullWidth
        multiline
        minRows={1}
        maxRows={5}
        inputRef={textFieldRef}
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything here"
        InputProps={{
          disableUnderline: true,
          className: 'text-field',
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
  );
};

export default ChatTextField;