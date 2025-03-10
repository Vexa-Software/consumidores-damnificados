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
      <div className="bg-white rounded-sm shadow-xl max-w-lg xl:max-w-2xl 2xl:max-w-4xl w-full h-1/2 2xl:h-1/2 relative flex flex-col xl:flex-row">


        <button
          onClick={() => setMostrar(false)}
          className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>


        {alerta.imagen && (
          <div className="w-full h-1/2 xl:h-full xl:w-1/2">
            <img
              src={alerta.imagen}
              alt="Alerta"
              className="w-full h-full object-cover rounded-l-sm"
            />
          </div>
        )}


        <div className="w-full xl:w-1/2 p-6  py-4 2xl:py-12 flex flex-col justify-between h-full xl:h-auto">


          <div className="flex justify-center items-start h-1/3 xl:h-1/3">
            <h2 className="text-xl 2xl:text-2xl font-bold text-gray-900 text-center"
            dangerouslySetInnerHTML={{ __html: alerta.titulo }}
            ></h2>
          </div>


          <div className="flex justify-center items-center h-2/3 xl:h-2/3">
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
