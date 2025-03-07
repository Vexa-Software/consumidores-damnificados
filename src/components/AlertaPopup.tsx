import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AlertaPopup: React.FC = () => {
  const [alerta, setAlerta] = useState<any>(null);
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    const cargarAlertaActiva = async () => {
      try {
        const alertasRef = collection(db, 'alertas');
        const q = query(alertasRef, where('activo', '==', true));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const alertaActiva = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data()
          };
          setAlerta(alertaActiva);
        }
      } catch (error) {
        console.error('Error al cargar la alerta:', error);
      }
    };

    cargarAlertaActiva();
  }, []);

  if (!alerta || !mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  {/* Container Principal */}
  <div className="bg-white rounded-sm shadow-xl  flex flex-col xl:flex-row relative overflow-hidden">

    {/* ❌ Botón de Cerrar */}
    <button
      onClick={() => setMostrar(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl z-10"
    >
      &times;
    </button>

    {/* 📷 Imagen (Siempre se ve completa) */}
    {alerta.imagen && (
      <div className="w-auto xl:max-w-md  flex items-center justify-center">
        <img 
          src={alerta.imagen} 
          alt="Alerta" 
          className="w-full h-auto  rounded-l-sm"
        />
      </div>
    )}

    {/* 📄 Contenido (Se adapta al espacio restante y tiene scroll si es necesario) */}
    <div className="flex-1 p-6 flex flex-col justify-between overflow-auto max-h-[35vh] sm:max-h-[35vh] xl:max-h-[35vh]">

      {/* 📌 Título */}
      <div className="flex justify-center items-start pb-4">
        <h2 className="text-xl xl:text-2xl font-bold text-gray-900 text-center" dangerouslySetInnerHTML={{ __html: alerta.titulo }}>
      
        </h2>
      </div>

      {/* 📌 Contenido con Scroll si es muy largo */}
      <div className="overflow-auto px-4 max-h-[50vh]">
        <div 
          className="text-gray-700 text-center"
          dangerouslySetInnerHTML={{ __html: alerta.contenido }}
        />
      </div>

    </div>

  </div>
</div>

  );
};

export default AlertaPopup;
