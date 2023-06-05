import React, { useState, useEffect, useRef } from 'react';
import { useControls } from 'leva';
import { Stats } from '@react-three/drei';

export const useGui = () => {
    const t = useControls({
        test: 5,
        test2: 10,
    });
}