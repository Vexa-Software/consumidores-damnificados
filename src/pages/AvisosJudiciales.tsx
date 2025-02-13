import React from "react";
import PaginatedList from "../hooks/PaginatedList"; // Importa el componente genérico



const AvisosJudiciales: React.FC = () => {
  return <PaginatedList storageKey="avisosJudiciales" title="Avisos Judiciales" />;
  

};

export default AvisosJudiciales;
