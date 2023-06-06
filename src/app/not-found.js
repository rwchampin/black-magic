"use client";
import { useEffect, useRef, useMemo, useCallback } from "react";
import { useCanvas } from "../hooks";
import { ErrorParticle } from "@/particles/ErrorParticle";
import "../styles/error.css";



export default function NotFound() {
    const target = useRef(null);
    const c1 = useCanvas().canvas;
    const c2 = useCanvas().canvas;
    const c3 = useCanvas().canvas;

    let tela = c1.canvas;
    let canvas = c1.context;
    let particles = useRef([]);
    let frequency = 20;
    let size = 100
    let lineheight = 70;

    const writeText = (canvas, context, text) => {

        context.font = size + "px Montserrat";
        context.fillStyle = "#111111";
        context.textAlign = "center";

        let lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i], canvas.width / 2, canvas.height / 2 + lineheight * i - (lineheight * (lines.length - 1)) / 3);
        }
    }


    const maskCanvas = useCallback(() => {
        c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
        c3.context.globalCompositeOperation = 'source-atop';
        c3.context.drawImage(c1.canvas, 0, 0);
        blur(c1.context, c1.canvas, 2)
    }, [c1, c2, c3]);

    const blur = (ctx, canvas, amt) => {
        ctx.filter = `blur(${amt}px)`
        ctx.drawImage(canvas, 0, 0)
        ctx.filter = 'none'
    }


    /*
     * const to clear layer canva=> s
     * @num:number number of particles
     */
    const popolate = useCallback(() => {
        particles.current.push(
            new ErrorParticle(canvas, {
                x: (window.innerWidth / 2),
                y: (window.innerHeight / 2)
            })
        )
        return particles.current.length
    }, [canvas, particles]);

    const clear = useCallback(() => {
        debugger
        canvas.globalAlpha = 0.03;
        canvas.fillStyle = '#111111';
        canvas.fillRect(0, 0, tela.width, tela.height);
        canvas.globalAlpha = 1;
    }, [canvas, tela]);

    const update = useCallback(() => {
        clear();
        // particles.current = particles.current.filter(function (p) {
        //     return p.move()
        // })
        maskCanvas()
        requestAnimationFrame(update)
    }, [clear, maskCanvas]);


    useEffect(() => {
        target.current.append(c3.current);

        // Popolate particles
        setInterval(
            function () {
                popolate()
            },
            frequency
        );

            update();

        return () => {
            // Cleanup function when unmounting
            Object.keys(getListeners).forEach((key) => {
                const listenerArray = getListeners[key];
                if (listenerArray) {
                    listenerArray.length = 0;
                }
            });
        };
    }, [ c3, c1, c2, frequency, update, popolate, maskCanvas, clear, particles, target]);





    return (
        <div ref={target}>
            <div className="title">
                <h3>A N O T H E R <strong>C O D E P E N</strong></h3>
            </div>

        </ div>
    )
}