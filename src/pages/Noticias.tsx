import React from "react";
import PaginatedList from "../hooks/PaginatedList"; 

const Noticias: React.FC = () => {
  return <PaginatedList storageKey="noticias" title="Noticias y Avisos Judiciales" />;  
};

export default Noticias;

