import { useEffect, useState, useId } from "react"
export const useAssets = () => {
    const [assets, setAssets] = useState({
        images: [],
        fonts: [],
        models: [],
        sounds: [],
        videos: [],
    });

    const [loading, setLoading] = useState(true);

    const [progress, setProgress] = useState(0);

    const [error, setError] = useState(false);

    const [loaded, setLoaded] = useState(false);

    const [id, setId] = useState(useId());

    const [loadedAssets, setLoadedAssets] = useState({
        images: [],
        fonts: [],
        models: [],
        sounds: [],
        videos: [],
    });

    

}