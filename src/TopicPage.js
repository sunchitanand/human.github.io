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
                <React.Fragment key={field.id}>
                    {/* // Main Topic Button */}
                    <TopicButton
                        id={field.id}
                        value={field.value}
                        onDelete={deleteField}
                        />
                    <div style={{ width: '95%', marginLeft: 'auto' }}>
                        {field.subfields &&
                            field.subfields.map((subfield) => (
                                // SubTopic Button
                                <TopicButton
                                    key={subfield.id}
                                    id={subfield.id}
                                    parentId={field.id}
                                    value={subfield.value}
                                    onDelete={deleteField}
                                    />
                            ))}
                    </div>
                </React.Fragment>
            ))}
        </Box>


    );
};

export default TopicPage;
