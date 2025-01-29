import React from 'react';
import { Link } from "react-router-dom";


const Home: React.FC = () => {

  return (
    <>
      <div>






        <div className="relative w-full h-[63vh] flex justify-center items-center bg-gradient-to-r"
          style={{
            backgroundImage: " url('/assets/img/consumidores-damnificados/Background.png')",
            backgroundSize: 'cover',
            minHeight: "59vh"
          }}>

          {/* Imagen a la izquierda */}
          <div className="h-auto w-[38%] flex justify-center items-center py-4">
            <img
              src="/assets/img/consumidores-damnificados/bannerpic.png"
              alt="Dirección de Defensa del Consumidor"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido a la derecha */}
          <div className="w-1/2 h-full flex flex-col justify-center items-center px-36">
            <h1 className="text-bg-customBlue text-center text-6xl font-bold">¡Conocé Tus Derechos!</h1>
            <p className="text-bg-customBlue mt-4 text-center text-lg">
              Ofrecemos diferentes soluciones para que puedas llevar a cabo tus denuncias.
              Llevamos más de 10 años trabajando sobre los Derechos Financieros.
            </p>
            <div className="flex justify-center w-full"> {/* Añado este contenedor */}
              <button className="w-[186px] h-[48px] mt-6 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                Denunciá
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full flex justify-center bg-gray-100 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-[65%] h-[25vh]">
            {[
              {
                title: "Defensa Al Consumidor",
                description:
                  "Organismo oficial encargado de aplicar las leyes que protegen a los ciudadanos de Buenos Aires en su rol de consumidores de productos y servicios.",
              },
              {
                title: "COPREC",
                description:
                  "Si tenés un problema con un producto que compraste o un servicio que contrataste, reclamá para tener una audiencia de conciliación con el proveedor.",
              },
              {
                title: "Ley N° 24.240",
                description:
                  "Normas de Protección y Defensa de los Consumidores. Autoridad de Aplicación. Procedimiento y Sanciones. Disposiciones Finales.",
              },
              {
                title: "Ley N° 26.361",
                description:
                  "Modificación de la Ley N° 24.240. Disposiciones complementarias.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="bg-sky-500 text-white text-center font-semibold py-3">
                  {card.title}
                </div>
                <div className="p-4 text-center text-gray-700">{card.description}</div>
              </div>
            ))}
          </div>
        </div>






      </div>
    </>
  );
};

export default Home;
