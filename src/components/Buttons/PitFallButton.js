import { useEffect, useRef } from "react";

import Splitting from "splitting";
import "./pitfall.css"

export const PitFallButton = () => {
    const button = useRef(null);

    Splitting();

    return (
        <button ref={button} className="btn--pitfall" data-splitting>Unsubscribe</button>
    )
}