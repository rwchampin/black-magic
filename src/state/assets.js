// CoreContext.js
import { useContext } from 'react';
import { AssetContext } from './provider';


const useAssets = () => {
  const {
    isReady,
  } = useContext(CoreContext);

  return {
    isReady, 
  };
};

export default useAssets;
