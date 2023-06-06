// Stick Hook
export function useStick(stick) {
  const [isSticking, setIsSticking] = useState(false);

  useEffect(() => {
    const s = stick.current;
    const handleStickEnter = () => setIsSticking(true);
    const handleStickLeave = () => setIsSticking(false);
    s.addEventListener('mouseenter', handleStickEnter);
    s.addEventListener('mouseleave', handleStickLeave);
    return () => {

      s.removeEventListener('mouseenter', handleStickEnter);
      s.removeEventListener('mouseleave', handleStickLeave);
    };
  }, [stick]);

  return isSticking;
}
