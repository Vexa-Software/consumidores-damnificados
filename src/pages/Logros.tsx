import React, { useEffect, useState } from "react";

interface Logro {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

const Logros: React.FC = () => {
  const [logros, setLogros] = useState<Logro[]>([]);

  useEffect(() => {
    const logrosGuardados = localStorage.getItem("logros");
    if (logrosGuardados) {
      setLogros(JSON.parse(logrosGuardados));
    }
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Nuestros Logros</h1>
      {logros.length === 0 ? (
        <p className="text-center">No hay logros disponibles.</p>
      ) : (
        logros.map((logro) => (
          <div key={logro.id} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="font-bold text-lg">{logro.titulo}</h2>
            <p>{logro.descripcion}</p>
            <span className="text-gray-500">{logro.fecha}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Logros;
