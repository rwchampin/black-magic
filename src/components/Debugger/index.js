'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useGui } from './useGui';
import { Stats } from '@react-three/drei';
export const Debugger = () => {
    useGui();
    const [open, setOpen] = useState(false);
    useGui();
    return (
        <section className={`fixed h-full min-w-1/3 ${open ? 'open' : 'close'}`}>
            <span
                className="radius-top-right-2xl radius-bottom-right-2xl bg-gray-800 text-white text-2xl font-bold p-2"
            >

            </span>
            <Stats />
        </ section>
    );
}