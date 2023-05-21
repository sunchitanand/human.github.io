import React, { useRef, useContext } from 'react';
import { Box, TextField } from '@mui/material';
import { TopicContext } from './TopicContext';
import TopicButton from './TopicButton';

const TopicPage = () => {
  const fieldRefs = useRef([]);
  const { fields, addField, deleteField } = useContext(TopicContext);

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
        addField(newField);
        currentField.value = '';
        currentField.focus();
      }
    }
  };

  // Reverse the order of fields array
  const reversedFields = [...fields].reverse();

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', p: '16px' }}>
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
      />
      {reversedFields.map((field) => (
        <>
          <TopicButton
            key={field.id}
            id={field.id}
            value={field.value}
            onDelete={() => deleteField(field.id)}
          />
          {field.subfields && field.subfields.map((subfield) => (
            <TopicButton
              key={subfield.id}
              id={subfield.id}
              value={subfield.value}
              onDelete={() => deleteField(subfield.id)}
              width='80%' // set width as 80% for subtasks
            />
          ))}
        </>
      ))}
    </Box>
  );
};

export default TopicPage;
