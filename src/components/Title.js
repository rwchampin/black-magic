"use client";
import gsap, { SplitText } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

export const Title = ({ children }) => {
    const title = useRef()

    useEffect(() => {
        const t = title.current
        const split = SplitText.create(t, {
            type: "lines words chars",
            linesClass: "lineChildren",
            wordsClass: "wordChildren",
            charsClass: "charChildren",
        })

        const lines = split.lines
        const words = split.words
        const chars = split.chars

        gsap.set(t, { autoAlpha: 1 })
        const parentofh1 = t.parentNode
        parentofh1.style.perspective = "550px"
        parentofh1.style.transformStyle = "preserve-3d"


        const numberBetween = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const onHover = () => {

            chars.forEach((char, i) => {
                gsap.to(char, {
                    duration: Math.random() * 0.5,
                    scale: numberBetween(1, 1.5),
                    y: numberBetween(-100, 100),
                    x: numberBetween(-100, 100),
                    z: numberBetween(50, 100),
                    ease: "back.out",
                    delay: Math.random() * 0.1,
                })
            }
            )
        }

        const onLeave = () => {
            chars.forEach((char, i) => {
                gsap.to(char, {
                    duration: Math.random() * 0.5,
                    scale: 1,
                    y: 0,
                    x: 0,
                    z: 0,
                    ease: "back.out",
                })
            })
        }

            t.addEventListener("mouseenter", onHover)
            t.addEventListener("mouseleave", onLeave)

            return () => {
                t.removeEventListener("mouseenter", onHover)
                t.removeEventListener("mouseleave", onLeave)
            }

        }, [])


    return (
        <h1 className="text-center" ref={title}>{children}</h1>
    )
}