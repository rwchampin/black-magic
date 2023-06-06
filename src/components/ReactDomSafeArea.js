import * as React from 'react'
import './styles.scss'

export const ReactDomSafeArea = ({ children }) => {
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (
			navigator.userAgent.toLowerCase().match(/mobile/i) &&
			navigator.userAgent.match(/ipad|ipod|iphone/i) &&
			"ontouchend" in document &&
			containerRef.current
		) {
			containerRef.current.classList.remove("min-h-screen");
			containerRef.current.classList.add("min-h-screen-mobile");
		}
  }, []);

 return (
 <div ref={containerRef} className="react-dom-safe-area">
    {children}
  </div>
  );
}


