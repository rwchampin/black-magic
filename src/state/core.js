// CoreContext.js
import { useContext } from 'react';
import { CoreContext } from './provider';


const useCore = () => {
  const {
    isReady,
  } = useContext(CoreContext);

  return {
    isReady, 
  };
};

export default useCore;
