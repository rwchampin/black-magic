'use client';
import React, { createContext, useEffect,useRef } from 'react';
import { useThree, useGLTF } from '@react-three/drei';

export const Logo = () => {
    const { node, materials } = useGLTF('https://va-core.s3.amazonaws.com/assets/models/logo.glb');

    return (
        <mesh geometry={node.geometry} material={materials['Material.001']} />
    )
}