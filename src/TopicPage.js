import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import TopicButton from './TopicButton';

const TopicPage = () => {
  const [fields, setFields] = useState([]);
  const fieldRefs = useRef([]);

  useEffect(() => {
    // Retrieve stored fields from localStorage on component mount
    const storedFields = localStorage.getItem('topicPageFields');
    if (storedFields) {
      setFields(JSON.parse(storedFields));
    }
  }, []);

  useEffect(() => {
    // Save fields to localStorage whenever it changes
    localStorage.setItem('topicPageFields', JSON.stringify(fields));
  }, [fields]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const currentFieldIndex = fieldRefs.current.findIndex((ref) => ref === document.activeElement);
      const currentField = fieldRefs.current[currentFieldIndex];
      const fieldValue = currentField.value.trim();
      if (fieldValue !== '') {
        const newField = {
          id: Date.now(),
          value: fieldValue,
        };
        setFields((prevFields) => [...prevFields, newField]);
        currentField.value = '';
        currentField.focus();
      }
    }
  };

  const handleDeleteField = (fieldId) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
  };

  const handleFieldBlur = (fieldId) => {
    const currentFieldIndex = fieldRefs.current.findIndex((ref) => ref === document.activeElement);
    if (currentFieldIndex === -1) {
      setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', p: '16px' }}>
      {fields.map((field) => (
        // <Link key={field.id} to={`/chat/${field.id}`}>
        // </Link>
        <TopicButton id={field.id} value={field.value} onDelete={() => handleDeleteField(field.id)} />

      ))}
      <TextField
        variant="standard"
        fullWidth
        multiline
        placeholder="Type and press enter to start a topic"
        onKeyDown={handleKeyDown}
        InputProps={{ disableUnderline: true }}
        sx={{
          mb: '16px',
          '& .MuiInputBase-root': {
            border: 'none',
            '&:focus': {
              outline: 'none',
            },
            fontFamily: 'Poppins, sans-serif',
          },
        }}
        inputRef={(ref) => fieldRefs.current.push(ref)}
        onBlur={() => handleFieldBlur(fieldRefs.current.length - 1)}
      />
    </Box>
  );
};

export default TopicPage;
