"use client";
import React, { createContext, useEffect, useState } from 'react';

export const DebugModeContext = createContext();

export const DebugModeProvider = ({ children }) => {
    // Create and initialize Three.js objects
    const [debugMode, setDebugMode] = useState(false);

    useEffect(() => {

        const keyDownHandler = (event) => {
            // detect if ctrl + d is pressed
            if (event.ctrlKey && event.key === 'd') {
                setDebugMode((prev) => !prev);
            }
            window.location.hash = debugMode ? '#debug' : '';
        };

        const clearHash = () => {
            window.location.hash = '';
        };

        window.addEventListener('keydown', keyDownHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            clearHash();
        };

    }, [debugMode]);

    // Provide the Three.js objects to child components
    return (
        <DebugModeContext.Provider value={{ debugMode }}>
            {children}
        </DebugModeContext.Provider>
    );
};


