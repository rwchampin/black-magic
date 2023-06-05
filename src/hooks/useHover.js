
// Hover Hook
export function useHover(hover) {
    const [isHover, setIsHover] = useState(false);
  
    useEffect(() => {
      const handleMouseEnter = () => setIsHover(true);
      const handleMouseLeave = () => setIsHover(false);
      hover.addEventListener('mouseenter', handleMouseEnter);
      hover.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        hover.removeEventListener('mouseenter', handleMouseEnter);
        hover.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [hover]);
  
    return isHover;
  }
  