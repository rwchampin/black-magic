import { useState, useEffect } from "react";
import { useEvent, usePrevious } from 'react-use';

export const useCursorPosition = (cb) => {
  const [pos, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const prev = usePrevious(pos) || {x: 0, y: 0};

  const updatePosition = event => {
    const { clientX, clientY } = event;

    setPosition({
      x: clientX,
      y: clientY,
    });

  };

  useEvent('mousemove', updatePosition);
  useEvent('mouseenter', updatePosition);

  return {prev, pos};
};

