"use client"
import { Home }  from '@/views'
import { CanvasManager } from '@/components'
import dynamic from 'next/dynamic';
import { Ryan } from '@/components/Ryan'
import { CurlTubes } from '@/components/CurlTubes'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useEffect } from 'react';
export default function Page() {

 
  return (
  
    <Canvas camera={{ position: [0, 0, 0] }} >
            <OrbitControls/>
           {/* <CurlTubes /> */}
        <Ryan options={{ radius: 40 }}/>
    
  
   </Canvas>

  );
}