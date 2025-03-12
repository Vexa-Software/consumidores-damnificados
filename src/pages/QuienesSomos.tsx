import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import SimpleLoader from "../components/SimpleLoader/SimpleLoader";
import { convertQuillToTailwind } from "../components/CustomQuillEditor";

const QuienesSomos: React.FC = () => {
  const [textos, setTextos] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newTextos: { [key: string]: string } = {};
        const newError: { [key: string]: boolean } = {};
        for (const id of ["origen", "trabajamos", "temas"]) {
          const docRef = doc(db, `textos_sistema/quienes_somos/textos`, id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            newTextos[id] = docSnap.data().contenido || "";
            newError[id] = false;
          } else {
            newTextos[id] = "";
            newError[id] = true;
          }
        }
        setTextos(newTextos);
        setError(newError);
      } catch (error) {
        console.error("Error obteniendo los textos:", error);
        setError({
          origen: true,
          trabajamos: true,
          temas: true
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[400px]">
        <SimpleLoader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-16 bg-white px-10">
      <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center text-[#0E153A] mb-10">
        Quiénes Somos
      </h1>

      <div className="w-[85%] grid grid-cols-1 lg:grid-cols-3 gap-12 text-[#324A6D] text-sm leading-relaxed">
        <div>
          <h2 className="text-xl 2xl:text-2xl font-semibold text-[#324A6D] mb-4">Nuestro <span className="font-extrabold">Origen</span></h2>
          {error.origen ? (
            <p className="text-red-500">No se encontró la información sobre nuestro origen</p>
          ) : (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: convertQuillToTailwind(textos["origen"]) }} />
          )}
        </div>

        <div>
          <h2 className="text-xl 2xl:text-2xl font-semibold text-[#324A6D] mb-4">Cómo <span className="font-extrabold">Trabajamos</span></h2>
          {error.trabajamos ? (
            <p className="text-red-500">No se encontró la información sobre cómo trabajamos</p>
          ) : (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: convertQuillToTailwind(textos["trabajamos"]) }} />
          )}

          <div className="flex justify-center mt-10">
            <img
              src="/assets/img/consumidores-damnificados/img-logo-consumidores.jpg"
              alt="Ícono representativo"
              className="w-[60%] sm:w-[40%] xl:w-[80%] 2xl:w-[60%] h-auto object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl 2xl:text-2xl font-semibold text-[#324A6D] mb-4">Temas de <span className="font-extrabold">Interés</span></h2>
          {error.temas ? (
            <p className="text-red-500">No se encontró la información sobre temas de interés</p>
          ) : (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: convertQuillToTailwind(textos["temas"]) }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;
