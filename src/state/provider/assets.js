"use client";
import React, { createContext, useEffect, useState } from 'react';

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
    // Create and initialize Three.js objects
    const [assets, setAssets] = useState([]);

    const loadAssets = async () => {

        


    }

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

    }, []);

    // Provide the Three.js objects to child components
    return (
        <AssetContext.Provider value={{ debugMode }}>
            {children}
        </AssetContext.Provider>
    );
};


