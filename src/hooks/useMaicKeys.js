import { useEffect, useState } from "react";
export const useMagicKeys = () => {
    const [keys, setKeys] = useState([]);
    const [keyMap, setKeyMap] = useState({});
    const [keyMapCount, setKeyMapCount] = useState(0);
    const [keyMapCountMax, setKeyMapCountMax] = useState(0);
    const [keyMapCountMin, setKeyMapCountMin] = useState(0);

    useEffect(() => {
        const keyDownHandler = (e) => {
            const key = e.key.toLowerCase();
            if (keyMap[key]) {
                setKeyMapCount((prev) => prev + 1);
            }
            setKeys((prev) => [...prev, key]);
        };

        const keyUpHandler = (e) => {
            const key = e.key.toLowerCase();
            setKeys((prev) => prev.filter((k) => k !== key));
        };

        window.addEventListener("keydown", keyDownHandler);
        window.addEventListener("keyup", keyUpHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
            window.removeEventListener("keyup", keyUpHandler);
        };
    }, [keyMap]);

    useEffect(() => {
        if (keyMapCount > keyMapCountMax) {
            setKeyMapCountMax(keyMapCount);
        }
        if (keyMapCount < keyMapCountMin) {
            setKeyMapCountMin(keyMapCount);
        }
    }, [keyMapCount]);

    return {
        keys,
        keyMap,
        keyMapCount,
        keyMapCountMax,
        keyMapCountMin,
        setKeyMap,
    };
};

export default useMagicKeys;
    // write a hook that listens to on, two ,or three combinations of key presses
    // and emits an event when the combination is pressed
    //
    // for example, if the user presses ctrl + d, emit an event called "debug"
    // if the user presses ctrl + shift + d, emit an event called "debug"
    // if the user presses ctrl + shift + alt + d, emit an event called "debug"


}