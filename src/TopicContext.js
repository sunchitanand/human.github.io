import React, { createContext, useState, useEffect } from 'react';

const TopicContext = createContext();

const TopicProvider = ({ children }) => {
    // Initialize fields with stored fields from localStorage
    // const initialFields = JSON.parse(localStorage.getItem('topicPageFields')) || [{id: null, value: null, subfields: []}];
    const initialStoredFields = JSON.parse(localStorage.getItem('topicPageFields')) || [];

    const initialFields = initialStoredFields.map(field => ({
        ...field,
        subfields: field.subfields || [],
    }));

    const [fields, setFields] = useState(initialFields);

    useEffect(() => {
        // Save fields to localStorage whenever it changes
        localStorage.setItem('topicPageFields', JSON.stringify(fields));
    }, [fields]);

    const addField = (newField) => {
        setFields((prevFields) => [...prevFields, newField]);
    };

    const deleteField = (parentId, fieldId) => {
        if(parentId !== undefined){
            setFields(prevFields =>
                prevFields.map(field => {
                    if(field.id === parentId) {
                        return {
                            ...field,
                            subfields: field.subfields.filter(subfield => subfield.id !== fieldId)
                        }
                    }
                    return field;
                })
            )
        }else{
            setFields(prevFields => prevFields.filter(field => field.id !== fieldId));
        }
    };

    const updateField = (parentId, fieldId, newValue) => {
        if (parentId !== undefined) {
            setFields((prevFields) =>
                prevFields.map((field) => {
                    if (field.id === parentId) {
                        return {
                            ...field,
                            subfields: field.subfields.map(subfield => 
                                subfield.id === fieldId ? { ...subfield, value: newValue } : subfield
                            ),
                        };
                    }
                    return field;
                })
            );
        } else {
            setFields((prevFields) =>
                prevFields.map((field) => {
                    if (field.id === fieldId) {
                        return { ...field, value: newValue };
                    }
                    return field;
                })
            );
        }
    };    

    const addSubField = (fieldId, newSubfield) => {
        setFields((prevFields) =>
            prevFields.map((field) => {
                if (field.id === fieldId) {
                    return {
                        ...field,
                        subfields: [...field.subfields, newSubfield]
                    };
                }
                return field;
            })
        );
    };

    return (
        <TopicContext.Provider value={{ fields, setFields, addField, deleteField, updateField, addSubField }}>
            {children}
        </TopicContext.Provider>
    );
};

export { TopicContext, TopicProvider };
