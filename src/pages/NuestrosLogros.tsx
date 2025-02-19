import React from "react";
import PaginatedList from "../hooks/PaginatedList"; // Importa el componente genérico



const NuestrosLogros: React.FC = () => {
  return <PaginatedList storageKey="nuestrosLogros" title="Nuestros Logros" />;
  

};

export default NuestrosLogros;
