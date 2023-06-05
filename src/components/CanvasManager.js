"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

export const CanvasManager = (props) => {
    const canvasContainer = useRef(null);

    return (
        <section className="fixed h-screen w-screen" ref={canvasContainer}>
            <Canvas {...props}>
                {props.children}
            </Canvas>
            <canvas className="canvas canvas-2d fixed h-full w-full" />
        </section>
    )
}