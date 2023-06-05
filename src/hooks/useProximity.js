import { useState, useEffect, useRef } from 'react';

/**************************************** 
 * @example
const Component = () => {
    const proximity = useProximity();
    
    //...
    proximity.observe(nodeElement, relevance, callback);
    //...
}
********************************************/
const useProximity = () => {
    const [points, setPoints] = useState([]);
    const [callbackList, setCallbackList] = useState([]);
    const [nodes, setNodes] = useState([]);
    const proximityIndexes = useRef({});

    const getRelevantDistances = (pageX, pageY) => {
        points.forEach((element, index) => {
            if (!element[0]) return;

            let relevantDistance = element[3];

            var distance = Math.sqrt(
                Math.pow(element[1] - pageX, 2) + Math.pow(element[2] - pageY, 2)
            );

            if (distance <= relevantDistance)
                beforeCallback(index, 1 - distance / relevantDistance);
            else if ((distance - relevantDistance) <= 10)
                beforeCallback(index, 0);
        });
    };

    const beforeCallback = (index, percent) => {
        callbackList[index].call(nodes[index], percent);
    };

    const handlerMouseMove = (event) => {
        getRelevantDistances(event.pageX, event.pageY);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handlerMouseMove);
        return () => {
            window.removeEventListener('mousemove', handlerMouseMove);
        };
    }, []);

    const observe = (nodeElement, relevance, callback) => {
        if (
            !nodeElement || typeof nodeElement != 'object' ||
            !relevance || relevance.constructor != Number ||
            !callback || callback.constructor != Function
        )
            throw new Error("Proximity.observe: invalid argument");

        let pointsCopy = [...points];
        let callbackListCopy = [...callbackList];
        let nodesCopy = [...nodes];

        let newPoint = [true];
        newPoint.push(nodeElement.offsetHeight / 2 + nodeElement.offsetLeft);
        newPoint.push(nodeElement.offsetWidth / 2 + nodeElement.offsetTop);
        newPoint.push(relevance || 100);

        pointsCopy.push(newPoint);
        callbackListCopy.push(callback);
        nodesCopy.push(nodeElement);

        setPoints(pointsCopy);
        setCallbackList(callbackListCopy);
        setNodes(nodesCopy);

        proximityIndexes.current[nodeElement] = pointsCopy.length;
    }

    const disable = (nodeElement) => {
        if (!proximityIndexes.current.hasOwnProperty(nodeElement))
            throw new Error('Proximity.disable: node element not observed');

        let index = Number(proximityIndexes.current[nodeElement]);
        let pointsCopy = [...points];
        pointsCopy[index][0] = false;
        setPoints(pointsCopy);
    };

    const enable = (nodeElement) => {
        if (!proximityIndexes.current.hasOwnProperty(nodeElement))
            throw new Error('Proximity.disable: node element not observed');

        let index = Number(proximityIndexes.current[nodeElement]);
        let pointsCopy = [...points];
        pointsCopy[index][0] = true;
        setPoints(pointsCopy);
    };

    return {
        observe,
        disable,
        enable
    };
}

export default useProximity;
