"use client";
import { useContext, useCallback } from "react";
import { CustomCursorContext } from "../state";
import { useEvent } from 'react-use';

export const useMouseHandlers = (options = {}) => {
  const [, setCursor] = useContext(CustomCursorContext);
  const toggleCursor = useCallback(() => {
    setCursor(({ active }) => ({ active: !active }));
  }, [setCursor]);

  const onMouseEnter = useCallback(event => {
    if (options.onMouseEnter) {
      options.onMouseEnter(event);
    }
    toggleCursor();
  }, [options, toggleCursor]);

  const onMouseLeave = useCallback(event => {
    if (options.onMouseLeave) {
      options.onMouseLeave(event);
    }
    toggleCursor();
  }, [options, toggleCursor]);
  
  return { onMouseEnter, onMouseLeave };
};