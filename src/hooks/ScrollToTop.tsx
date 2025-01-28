import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Cuando la ruta cambia, se desplaza hacia arriba
    window.scrollTo(0, 0);
  }, [location]);

  return null; // Este componente no renderiza nada visible
};

export default ScrollToTop;
