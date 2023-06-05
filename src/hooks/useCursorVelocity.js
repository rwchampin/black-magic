import { useState, useEffect } from "react";

export const useCursorVelocity = ({prev, pos}) => {
  const [velocity, setVelocity] = useState({
    vx: 0,
    vy: 0,
  });
 

  useEffect(() => {
    if(!prev || !pos) return;
    setVelocity({
      vx: prev.x - pos.x,
      vy: prev.y - pos.y,
    });
 
  }, [pos, prev]);


  return velocity
};

