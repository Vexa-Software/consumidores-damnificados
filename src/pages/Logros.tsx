import React from "react";
import PaginatedList from "../hooks/PaginatedList"; // Importa el componente genérico

const Logros: React.FC = () => {
  return <PaginatedList storageKey="logros" title="Nuestros Logros" />;
};

export default Logros;
