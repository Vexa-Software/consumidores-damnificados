import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import SimpleLoader from './SimpleLoader/SimpleLoader';

interface Alerta {
  id: string;
  imagen: string;
  titulo: string;
  contenido: string;
  activo: boolean;
  isDeleted: boolean;
}

const limpiarContenidoHtml = (html: string): string => {
  // Elimina espacios en blanco
  const contenidoLimpio = html.trim();
  
  // Verifica si solo contiene etiquetas vacías como <p><br></p> o <P><br></P>
  if (contenidoLimpio.replace(/<[pP]><br\s*\/?><\/[pP]>/g, '').trim() === '') {
    return '';
  }
  
  return contenidoLimpio;
};

const AlertaPopup: React.FC = () => {
  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [mostrar, setMostrar] = useState(true);
  const [imagenCargada, setImagenCargada] = useState(false);

  useEffect(() => {
    const cargarAlertaActiva = async () => {
      try {
        const alertasRef = collection(db, 'alertas');
        const q = query(
          alertasRef, 
          where('activo', '==', true),
          where('isDeleted', '!=', true)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          const alertaActiva = {
            id: querySnapshot.docs[0].id,
            titulo: limpiarContenidoHtml(data.titulo || ''),
            contenido: limpiarContenidoHtml(data.contenido || ''),
            imagen: data.imagen,
            activo: data.activo,
            isDeleted: data.isDeleted
          } as Alerta;
          setAlerta(alertaActiva);

          if (alertaActiva.imagen) {
            const img = new Image();
            img.onload = () => setImagenCargada(true);
            img.src = alertaActiva.imagen;
          }
        }
      } catch (error) {
        console.error('Error al cargar la alerta:', error);
      }
    };

    cargarAlertaActiva();
  }, []);

  if (!alerta || !mostrar) return null;

  if (alerta.imagen && !imagenCargada) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <SimpleLoader />
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={() => setMostrar(false)}
    >
      <div 
        className="bg-white rounded-sm shadow-xl flex flex-col md:flex-row md:max-h-full max-h-[85vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setMostrar(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl z-10"
        >
          &times;
        </button>

        <div className="w-auto xl:max-w-md flex items-center justify-center">
          <img 
            src={alerta.imagen} 
            alt="Alerta" 
            className={`${(alerta.titulo || alerta.contenido) ? 'w-[70%] md:w-full' : 'w-full'} h-auto rounded-l-sm`}
          />
        </div>

        {(alerta.titulo || alerta.contenido) && (
          <div className="flex-1 p-6 flex flex-col justify-start gap-4 overflow-auto">
            {alerta.titulo && (
              <div className="flex justify-center items-start pb-4">
                <h2 className="text-xl xl:text-2xl font-bold text-gray-900 text-center" dangerouslySetInnerHTML={{ __html: alerta.titulo }} />
              </div>
            )}

            {alerta.contenido && (
              <div className="overflow-auto px-4 max-h-[50vh]">
                <div 
                  className="text-gray-700 text-center"
                  dangerouslySetInnerHTML={{ __html: alerta.contenido }}
                />
              </div>
            )}
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
