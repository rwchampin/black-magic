// ThreeContext.js
import React, { useContext } from 'react';
import {  CursorContext } from './provider';


const useCursor = () => {
  const {
    position,
    velocity,
    diff,
    last,
    isDown,
    isDragging,
    hoveredElement,
  } = useContext(CursorContext);

  return {
    position,
    velocity,
    diff,
    last,
    isDown,
    isDragging,
    hoveredElement
  };
};

export default useCursor;
