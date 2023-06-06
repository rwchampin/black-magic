"use client";
import React, { createContext, useEffect, useState } from 'react';
import { useEventEmitter } from '@/hooks';
export const CoreContext = createContext();

export const CoreProvider = ({ children }) => {
    // extend event emitter
    const { on, has, off, emit } = useEventEmitter();
    // Create and initialize Three.js objects
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {

        const keyDownHandler = (event) => {
            // detect if ctrl + d is pressed
            if (event.ctrlKey && event.key === 'd') {
                setCore((prev) => !prev);
            }
            window.location.hash = Core ? '#debug' : '';
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
        <CoreContext.Provider value={{ Core }}>
            {children}
        </CoreContext.Provider>
    );
};


