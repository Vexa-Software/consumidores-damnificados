import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AlertaPopup: React.FC = () => {
  const [alerta, setAlerta] = useState<any>(null);
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    const cargarAlertaActiva = async () => {
      try {
        const alertasRef = collection(db, 'Alertas');
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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative">
        <button
          onClick={() => setMostrar(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{alerta.titulo}</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: alerta.contenido }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertaPopup; 