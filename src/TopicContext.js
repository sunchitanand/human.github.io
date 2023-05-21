import React, { createContext, useState, useEffect } from 'react';

const TopicContext = createContext();

const TopicProvider = ({ children }) => {
    // Initialize fields with stored fields from localStorage
    const initialFields = JSON.parse(localStorage.getItem('topicPageFields')) || [];
    const [fields, setFields] = useState(initialFields);
    
    useEffect(() => {
      // Save fields to localStorage whenever it changes
      localStorage.setItem('topicPageFields', JSON.stringify(fields));
    }, [fields]);
  
    const addField = (newField) => {
      setFields((prevFields) => [...prevFields, newField]);
    };
  
    const deleteField = (fieldId) => {
      setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
    };
  
    const updateField = (fieldId, newValue) => {
      setFields((prevFields) =>
        prevFields.map((field) => {
          if (field.id === fieldId) {
            return { ...field, value: newValue };
          }
          return field;
        })
      );
    };
  
    return (
      <TopicContext.Provider value={{ fields, addField, deleteField, updateField }}>
        {children}
      </TopicContext.Provider>
    );
  };  

export { TopicContext, TopicProvider };
