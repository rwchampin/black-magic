import React, { useEffect, useRef, useCallback, useState, useContext } from "react";
import { CustomCursorContext } from "../state";

export const useParticle = (options = {}) => {
    // const cursor = useContext(CustomCursorContext);
 
    const effect = options.effect;
    // const x = Math.random() * effect.canvasWidth;
    // const y = Math.random() * effect.canvasHeight;
    const color = options.color || "black"
    // const originX = x;
    // const originY = y;
    const size = options.gap;
    let dx = 0;
    let dy = 0;
    let force = 0;
    let angle = 0;
    let distance = 0;
    let friction = Math.random() * 0.6 + 0.15
    const ease = Math.random() * 0.1 + 0.005


    const draw = () => {
        effect.context.fillStyle = color;
        effect.context.fillRect(x, y, size, size);
    }

    const update = () => {
        dx = x - mouse.clientX;
        dy = y - mouse.clientY;
        distance = dx * dx + dy * dy
        force = - 300000 / distance;
        if (distance < 300000) {
            angle = Math.atan2(dy, dx);
            vx += force * Math.cos(angle);
            vy += force * Math.sin(angle);
        }

        x += (vx *= friction) + (originX - x) * ease;
        y += (vy *= friction) + (originY - y) * ease;


    }


}