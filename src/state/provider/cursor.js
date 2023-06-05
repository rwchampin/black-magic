"use client";
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useEventEmitter } from '../../hooks';
import {Utils} from '@/utils';

// Create a context for the mouse position and states
export const CursorContext = createContext({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    dx: 0,
    dy: 0,
    lx: 0,
    ly: 0,
    tx: 0,
    ty: 0,
    rotX: 0,
    rotY: 0,
    lockX: 0,
    lockY: 0,

    isDown: false,
    isDragging: false,
    hoveredElement: null,
    state: ['mm-cursor', 'mm-hidden'],
    domState: ['mm-circle', 'mm-solid', 'mm-small'],
});

// Create a provider component to manage the mouse position and states
export const CursorProvider = ({ children }) => {
    const { add, remove, emit } = useEventEmitter();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [vx, setVx] = useState(0);
    const [vy, setVy] = useState(0);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);
    const [lx, setLx] = useState(0);
    const [ly, setLy] = useState(0);
    const [tx, setTx] = useState(0);
    const [ty, setTy] = useState(0);
    const [rotX, setRotX] = useState(0);
    const [rotY, setRotY] = useState(0);
    const [lockX, setLockX] = useState(0);
    const [lockY, setLockY] = useState(0);
    const [isDown, setIsDown] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [hoveredElement, setHoveredElement] = useState(null);
    const [state, setState] = useState(['mm-cursor', 'mm-hidden']);
    const [domState, setDomState] = useState(['mm-circle', 'mm-solid', 'mm-small']);

 
    const getEventInfo = (e) => {
        e = e.touches ? e.touches[0] : e;
        const { clientX, clientY } = e;

        return {
            x: clientX,
            y: clientY
        }
    }

    const updatePosition =(e) => { 
        setLx(x);
        setLy(y);
        const { x, y } = getEventInfo(e);
        setX(x);
        setY(y);
        updateVelocity(x,y)
    };


    useEffect(() => {
        // Mouse move event handler
       



        // set velocity on mouse move
        // const updateVelocity = (x,y) => {
        //     setVx(x - lx);
        //     setVy(y - ly);
        // };

      

        // Mouse down event handler
        // const onDown = (event) => {
        //     setIsDown(true);

        // };

        // Mouse up event handler
        // const onUp = (event) => {
        //     setIsDown(false);
        //     setIsDragging(false);

        // };

        // add('mousemove', onMove);
        // add('mousedown', onDown);
        // add('mouseup', onUp);
        // Add event listeners for mouse events
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        // Clean up event listeners on component unmount
        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('mouseup', onUp);
        };
    }, [])
    // }, [x, y, vx, vy, dx, dy, lx, ly, isDown, isDragging, hoveredElement, state, domState]);

    return (
        <CursorContext.Provider
            value={{
                x,
                y,
                vx,
                vy,
                dx,
                dy,
                lx,
                ly,
                tx,
                ty,
                rotX,
                rotY,
                lockX,
                lockY,
                isDown,
                isDragging,
                hoveredElement,
                state,
                domState,
                setX,
                setY,
                setVx,
                setVy,
                setDx,
                setDy,
                setLx,
                setLy,
                setTx,
                setTy,
                setRotX,
                setRotY,
                setLockX,
                setLockY,
                setIsDown,
                setIsDragging,
                setHoveredElement,
                setState,
                setDomState,

            }}
        >
            {children}
        </CursorContext.Provider>
    );
};
