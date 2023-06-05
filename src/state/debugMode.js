// ThreeContext.js
import React, { useContext } from 'react';
import { DebugModeContext } from './provider';


const useDebugMode = () => {
  const {
    debugMode,
  } = useContext(DebugModeContext);

  return {
    debugMode, 
  };
};

export default useDebugMode;
