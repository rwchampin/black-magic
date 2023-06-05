"use client";
import { useEffect, useState, useRef } from "react";
import {  ToTop} from "@/components";
import gsap , { Draggable, InertiaPlugin } from "gsap/all";
import  Link  from 'next/link';
gsap.registerPlugin(Draggable, InertiaPlugin);

export const Navigation = () => {
    const nav = useRef(null);
    const navItems = useRef([
        "Services",
        "Work",
        "Experiments",
        "Tutorials",
        "Store",
        "Contact",

    ]);
    // useEffect(() => {
    //     const navElement = nav.current;
    //     const navItems = navElement.children;
    //     const navItemsArray = Array.from(navItems);

    //     Draggable.create(navElement, {
    //         type: "x, y",
    //         // edgeResistance: 10.65,
    //         snap: {
    //             right: 0,
    //             bottom: 0,
    //             left: 0,
    //             top: 0,
    //         },
    //         ease: [0.4, 0, 0.2, 1],
    //         inertia: true,
    //         bounds: window,
    //     });

    // }, []);
    return (
        <section className="nav-wrapper fixed bottom-20 w-full flex justify-between">
            <ToTop className="flex-none basis-2/12" />
            <nav ref={nav} className="nav auto hover:drop-shadow-md rounded text-white p-5">
                <ul className="flex gap-10">
                    {navItems.current.map((item, index) => {
                    return <li key={index}><Link href={`/${item}`} className="font-apercu">{item}</Link></li>
                    })}
                </ul>

            </nav>
            <div className="flex-none basis-2/12" />
        </section>
    )
}