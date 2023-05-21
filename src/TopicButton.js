import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { TopicContext } from './TopicContext';
import LArrowIcon from './icons';

const TopicButton = ({ id, value, onDelete, width = '100%' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedLabel, setEditedLabel] = useState(value);
    const [currentLabel, setCurrentLabel] = useState(value);

    const { fields, setFields, updateField, addSubField } = useContext(TopicContext);
    const inputRef = useRef(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleDelete = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDeleting(true);
        onDelete(id); // Pass the id of the button being deleted
    };

    const handleButtonClick = () => {
        if (!isDeleting && !isEditing) {
            navigate(`/chat/${id}`); // Navigate to new instance of ChatPage with the specified id
        }
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        setIsEditing(true);
        setEditedLabel(currentLabel); // Update the editedLabel state with the current label value
    };

    const handleLabelChange = (event) => {
        setEditedLabel(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        // Save the updated label to local storage
        updateField(id, editedLabel);
        setCurrentLabel(editedLabel); // Update the current label state
    };

    const handleLabelUpdate = () => {
        if (isEditing) {
            setEditedLabel(value);
        }
    };

    const handleKeyDown = (event) => {
        if (isEditing) {
            if (event.key === 'Enter') {
                setIsEditing(false);
                inputRef.current.blur();
            }
            if (event.key === ' ') {
                event.preventDefault();
                setEditedLabel((prevLabel) => prevLabel + ' '); // Append a space character to the edited label
            }
        }
    };

    const handleClick = (event) => {
        if (isEditing) {
            event.stopPropagation();
            event.preventDefault(); // Prevent the button action from being triggered in edit mode
        } else {
            handleButtonClick();
        }
    };


    const handleSubtaskClick = (event) => {
        event.stopPropagation();
        const newField = {
          id: Date.now(),
          value: 'New Subtopic',
        };
        if (Array.isArray(fields)) {
          const fieldIndex = fields.findIndex((field) => field.id === id);
          if (fieldIndex !== -1) {
            const currentField = fields[fieldIndex];
            if (Array.isArray(currentField.subfields)) {
              addSubField(id, newField);
            } else {
              const updatedField = {
                ...currentField,
                subfields: [newField],
              };
              const updatedFields = [...fields];
              updatedFields[fieldIndex] = updatedField;
              setFields(updatedFields);
            }
          }
        }
      };

    return (
        <Button
            variant="contained"
            size="large"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={isEditing} // Disable the button when in edit mode
            onClick={handleClick}
            onBlur={handleLabelUpdate}
            sx={{
                fontFamily: 'Poppins, sans-serif',
                mb: '16px',
                justifyContent: 'space-between',
                textTransform: 'none',
                width: width,
                backgroundColor: isHovered ? 'black' : isEditing ? '#f2f2f2' : 'white',
                color: isHovered ? 'white' : 'black',
                boxShadow: 'none',
                overflow: 'visible',
                '&:hover': {
                    backgroundColor: isEditing ? '#f2f2f2' : isHovered ? 'black' : 'white',
                    color: isHovered ? 'white' : 'black',
                },
            }}
        >
            <Box display="flex" alignItems="center" sx={{ width: '90%' }}>
                {isHovered && !isEditing && (
                    <IconButton
                        size="small"
                        color="primary"
                        onMouseDown={(e) => e.stopPropagation()}
                        onMouseUp={handleEditClick}
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            visibility: 'visible',
                            color: 'white',
                            marginRight: '10px',
                            marginLeft: '-10px',
                            scale: 0.8,
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                )}
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editedLabel}
                        onChange={handleLabelChange}
                        onBlur={handleBlur}
                        onClick={(event) => event.stopPropagation()}
                        autoFocus
                        onKeyDown={handleKeyDown}
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            height: '100%',
                            flexGrow: 1, // Allow the input to expand to fill available space
                            fontFamily: 'Poppins, sans-serif', // Apply Poppins font
                            pointerEvents: 'auto', // Enable pointer events on the input
                        }}
                    />
                ) : (
                    <span
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {currentLabel}
                    </span>
                )}
            </Box>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {isHovered && !isEditing && (
                    <>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={handleSubtaskClick}
                            onMouseDown={(e) => e.stopPropagation()}
                            sx={{
                                visibility: 'visible',
                            }}
                        >
                            <LArrowIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={handleDelete}
                            onMouseDown={(e) => e.stopPropagation()}
                            sx={{
                                visibility: 'visible',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </>
                )}
            </div>
        </Button>
    );
};

export default TopicButton;