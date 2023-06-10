'use client';
// import fs from 'fs';
// import path from 'path';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, useRef } from "react";
// import { ToTop } from "@/components";


export default function Nav() {

    const [isActive, setIsActive] = useState(false);
    const nav = useRef(null);
    const navItems = useRef([
        "Services",
        "Work",
        "Experiments",
        "Tutorials",
        "Store",
        "Contact",

    ]);


    //  function getAllExperiments() {
    //     const experimentsDirectory = path.join(process.cwd(), 'pages/experiments');
    //     const experimentFiles = fs.readdirSync(experimentsDirectory);

    //     return experimentFiles.map((file) => {
    //       const experimentSlug = file.replace(/\.js$/, '');
    //       return {
    //         slug: experimentSlug,
    //       };
    //     });
    //   }

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
            {/* <ToTop classcName="flex-none basis-2/12" /> */}
            <nav ref={nav} className="nav flex auto hover:drop-shadow-md rounded text-white p-5">
                <div className="flex relative">
                    <Image src="/logo.png" alt="logo" fill  className='logo'/>
                    <ul className="flex gap-10">


                        {navItems.current.map((link, index) => (
                            <Link
                                key={index}
                                href={`/${link}`}
                                passHref
                            >
                                {link}
                            </Link>
                        ))}


                    </ul>
                </div>
            </nav>
            <div className="flex-none basis-2/12" />
        </section>
    )
}