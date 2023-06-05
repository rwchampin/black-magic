"use client";
import { useLayoutEffect, useRef } from "react";
import { useEvent } from "react-use";

export const useCanvas = () => {
    const canvas = useRef(null);
    const context = useRef(null);

   useLayoutEffect(() => {
    canvas.current = document.createElement("canvas");
    context.current = canvas.current.getContext("2d");

   }, []);

    const resize = () => {
        if(!canvas.current) return;
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;
    }

    useEvent("resize", resize);

    resize();

    return { canvas, context };
}