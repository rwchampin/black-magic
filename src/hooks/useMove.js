export function useMove(ease) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = useCallback((e) => {
      const targetX = e.clientX;
      const targetY = e.clientY;
      const currentX = position.x;
      const currentY = position.y;
      setPosition({
        x: currentX + (targetX - currentX) * ease,
        y: currentY + (targetY - currentY) * ease,
      });
    }, [ease, position]);
  
    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);
  
    return position;
  }