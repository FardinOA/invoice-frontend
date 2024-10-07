import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};
