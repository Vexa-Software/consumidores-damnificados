import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const QuienesSomos: React.FC = () => {
  const [textos, setTextos] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newTextos: { [key: string]: string } = {};
        for (const id of ["origen", "trabajamos", "temas"]) {
          const docRef = doc(db, `textos_sistema/quienes_somos/textos`, id);
          const docSnap = await getDoc(docRef);
          newTextos[id] = docSnap.exists() ? docSnap.data().contenido || "" : ""; // 🔥 Solo traemos contenido
        }
        setTextos(newTextos);
      } catch (error) {
        console.error("❌ Error obteniendo los textos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-16 bg-white px-10">
      <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center text-[#0E153A] mb-10">
        Quiénes Somos
      </h1>

      <div className="w-[85%] grid grid-cols-1 lg:grid-cols-3 gap-12 text-[#324A6D] text-sm leading-relaxed">
        <div>
          <h2 className="text-xl 2xl:text-2xl font-semibold text-[#324A6D] mb-4">Nuestro <span className="font-extrabold">Origen</span></h2>
          <div className=" " dangerouslySetInnerHTML={{ __html: textos["origen"] }} /> {/* 🔥 Renderiza solo contenido */}
        </div>

        <div>
          <h2 className="text-xl 2xl:text-2xl font-semibold text-[#324A6D] mb-4">Cómo <span className="font-extrabold">Trabajamos</span></h2>
          <div className=" " dangerouslySetInnerHTML={{ __html: textos["trabajamos"] }} />

          <div className="flex justify-center mt-10">
            <img
              src="/assets/img/consumidores-damnificados/img-logo-consumidores.jpg"
              alt="Ícono representativo"
              className="w-[60%] sm:w-[40%] xl:w-[80%] 2xl:w-[60%] h-auto  object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl 2xl:text-2xl font-semibold text-[#324A6D] mb-4">Temas de <span className="font-extrabold">Interés</span></h2>
          <div className=" " dangerouslySetInnerHTML={{ __html: textos["temas"] }} />
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;
