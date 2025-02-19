import React from 'react';
import { useFetchNoticiasAvisos } from "../hooks/useFetchNoticiasAvisos";
import { AvisosSlider } from "../components/AvisosSlider";
import { NoticiasSlider } from "../components/NoticiasSlider";
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
  const { noticias, avisos, loading } = useFetchNoticiasAvisos();

  return (
    <>

      <div className="relative w-full h-[auto] flex flex-col justify-center  bg-gradient-to-r sm:py-16 lg:px-20 2xl:px-56"
        style={{
          backgroundImage: " url('/assets/img/consumidores-damnificados/Background.png')",
          backgroundSize: 'cover',
          minHeight: "59vh"
        }}>
        <div className='flex flex-col sm:flex-col lg:flex-row  2xl:flex-row    items-center justify-between px-12 sm:px-5 2xl:px-4 '>


          <div className="h-auto sm:h-[50%] lg:h-auto 2xl:h-auto w-[100%] sm:w-[80%] lg:w-[45%] 2xl:w-[45%] mb-6 sm:mb-10 lg:mb-0  ">
            <img
              src="/assets/img/consumidores-damnificados/bannerpic.png"
              alt="Dirección de Defensa del Consumidor"
              className="w-full h-full object-cover  items-center"
            />
          </div>


          <div className="w-[1/2] sm:w-[80%] lg:w-[45%] 2xl:w-[45%] h-full flex flex-col justify-center items-center ">
            <h1 className="text-bg-customBlue text-center text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold">¡Conocé Tus Derechos!</h1>
            <p className="text-bg-customBlue mt-4 text-center text-sm lg:text-xl 2xl:text-2xl">
              Ofrecemos diferentes soluciones para que puedas llevar a cabo tus denuncias.
              Llevamos más de 10 años trabajando sobre los Derechos Financieros.
            </p>
            <div className="flex justify-center w-full">
              <Link to="/denuncia" >
                <button className="w-[186px] h-[48px] mt-6 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                  Denunciá
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center bg-gray-100 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-[65%]   lg:w-[78%] 2xl:w-[60%] h-[auto] sm:h-[auto] lg:h-[auto]">
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



      <div>


        <div className=" mx-auto ">


          {loading ? <p className="text-center">Cargando...</p> : <AvisosSlider items={avisos} />}

          {loading ? <p className="text-center">Cargando...</p> : <NoticiasSlider items={noticias} />}

        </div>





      </div>
    </>
  );
};

export default Home;
