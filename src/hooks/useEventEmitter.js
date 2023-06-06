"use client";
import { useEffect, useRef, useMemo } from 'react';

const useEventEmitter = () => {
  const listeners = useRef({});

  const getListeners = useMemo(() => listeners.current, []);

  const on = (type, listener) => {
    if (getListeners[type] === undefined) {
      getListeners[type] = [];
    }

    if (getListeners[type].indexOf(listener) === -1) {
      getListeners[type].push(listener);
    }
  };

  const has = (type, listener) => {
    if (getListeners[type] !== undefined) {
      return getListeners[type].indexOf(listener) !== -1;
    }

    return false;
  };

  const off = (type, listener) => {
    const listenerArray = getListeners[type];

    if (listenerArray !== undefined) {
      const index = listenerArray.indexOf(listener);

      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  };

  const emit = (event) => {
    const listenerArray = getListeners[event.type];

    if (listenerArray !== undefined) {
      const array = listenerArray.slice(0);

      for (let i = 0; i < array.length; i++) {
        array[i].call(this, event);
      }
    }
  };

  useEffect(() => {
    // Cleanup function when unmounting
    return () => {
      Object.keys(getListeners).forEach((key) => {
        const listenerArray = getListeners[key];
        if (listenerArray) {
          listenerArray.length = 0;
        }
      });

    };
  }, [ getListeners ]);

  return { on, has, off, emit };
};

export default useEventEmitter;



