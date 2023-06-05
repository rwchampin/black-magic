// Stick Hook
export function useStick(stick) {
    const [isSticking, setIsSticking] = useState(false);
  
    useEffect(() => {
      const handleStickEnter = () => setIsSticking(true);
      const handleStickLeave = () => setIsSticking(false);
      stick.current.addEventListener('mouseenter', handleStickEnter);
      stick.current.addEventListener('mouseleave', handleStickLeave);
      return () => {
        stick.current.removeEventListener('mouseenter', handleStickEnter);
        stick.current.removeEventListener('mouseleave', handleStickLeave);
      };
    }, [stick]);
  
    return isSticking;
  }
  