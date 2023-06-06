"use client";
import { Link } from 'next/link';
import { useState, useRef, useEffect } from "react";

export const NavLink = (props) => {
    const [active, setActive] = useState(false);
    const linkRef = useRef(null);

    const handleMouseOver = () => {}
    const handleMouseOut = () => {}
    const handleMouseDown = () => {
        setActive((prev) => !prev);
    }
    const handleMouseUp = () => {}

    return (
        <Link
            className={`nav-link ${active ? 'active' : ''}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            ref={linkRef}
            href={props.href}
        >
            {props.children}
        </Link>
    )
}