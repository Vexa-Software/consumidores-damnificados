import React, { useEffect, useState } from "react";

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

const Noticias: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    const noticiasGuardadas = localStorage.getItem("noticias");
    if (noticiasGuardadas) {
      setNoticias(JSON.parse(noticiasGuardadas));
    }
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Noticias</h1>
      {noticias.length === 0 ? (
        <p className="text-center">No hay noticias disponibles.</p>
      ) : (
        noticias.map((noticia) => (
          <div key={noticia.id} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="font-bold text-lg">{noticia.titulo}</h2>
            <p>{noticia.descripcion}</p>
            <span className="text-gray-500">{noticia.fecha}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Noticias;
