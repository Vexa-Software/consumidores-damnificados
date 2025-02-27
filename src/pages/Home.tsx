import React from 'react';
import { useFetchNoticiasLogros } from "../hooks/useFetchNoticiasLogros";
import { NuestrosLogrosSlider } from "../components/NuestrosLogrosSlider";
import { NoticiasSlider } from "../components/NoticiasSlider";
import { Link } from 'react-router-dom';
import SimpleLoader from '@/components/SimpleLoader/SimpleLoader';
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { noticias, nuestrosLogros, loading } = useFetchNoticiasLogros();

    const navigate = useNavigate(); // Hook para navegar sin recargar la página
  
    const handleClick = (link: string) => {
      if (link.startsWith("http")) {
        // Si el link es externo, abrir en nueva pestaña
        window.open(link, "_blank");
      } else {
        // Si es interno (ej. "/denuncia"), navegar dentro de la SPA sin recargar
        navigate(link);
      }
    };

  return (
    <>

      <div className="relative w-full h-[auto] flex flex-col justify-center my-8 bg-gradient-to-r sm:py-16 lg:px-20 2xl:px-56"
        style={{
          backgroundImage: " url('/assets/img/consumidores-damnificados/Background.png')",
          backgroundSize: 'cover',
          minHeight: "59vh"
        }}>
        <div className='flex flex-col sm:flex-col lg:flex-row  2xl:flex-row    items-center justify-between px-12 sm:px-5 2xl:px-6 '>


          <div className="h-auto sm:h-[50%] lg:h-auto 2xl:h-auto w-[100%] sm:w-[80%] lg:w-[45%] 2xl:w-[45%] mb-6 sm:mb-10 lg:mb-0  ">
            <img
              src="/assets/img/consumidores-damnificados/img-banner-home.jpg"
              alt="Dirección de Defensa del Consumidor"
              className="w-full h-full object-cover  items-center"
            />
          </div>


          <div className="w-[1/2] sm:w-[80%] lg:w-[45%] 2xl:w-[45%] h-full flex flex-col justify-center items-center ">
            <h1 className="text-bg-customBlue text-center text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold">¡Conocé Tus Derechos!</h1>
            <p className="text-bg-customBlue mt-4 text-center text-sm lg:text-xl 2xl:text-2xl">
              Ofrecemos diferentes soluciones para que puedas llevar a cabo tus denuncias.
              Llevamos más de 20 años trabajando sobre los Derechos Financieros.
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

      <div className="w-full flex justify-center py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[65%]   lg:w-[78%] 2xl:w-[60%] h-[auto] sm:h-[auto] lg:h-[auto]">
          {[
            {
              title: "Dirección Nacional de Defensa del Consumidor y Arbitraje del Consumo",
              description:
                "Es el organismo oficial encargado de ejecutar las acciones para la aplicación y control de las políticas vinculadas con la defensa del consumidor.",
                link: "https://www.argentina.gob.ar/economia/industria-y-comercio/defensadelconsumidor",
            },
            
            {
              title: "Ley N° 24.240",
              description:
                "Normas de Protección y Defensa de los Consumidores. Autoridad de Aplicación. Procedimiento y Sanciones. Disposiciones Finales.",
                link: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/638/texact.htm",
            },
            {
              title: "Reclamos a nivel nacional",
              description:
                "Si tenés un problema con un producto o servicio adquirido o contratado en cualquier parte del país, podes hacer tu reclamo a través de la Ventanilla Única Federal de Defensa al Consumidor.",
                link: "/denuncia",
            },
            {
              title: "Reclamos en CABA",
              description:
                "Si tenés un problema con un producto o servicio en CABA, podes hacer tu reclamo de manera digital o presencial –además de la Ventanilla Única Federal de Defensa al Consumidor- ante la Defensa al Consumidor de CABA o ante el Consejo de la Magistratura de CABA.",
                link: "/denuncia",
              },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:scale-105 w-auto"
              onClick={() => handleClick(card.link)}
            >
              <h1 className="bg-sky-500 text-white text-center text-sm  font-semibold py-3 h-16 flex flex-col justify-center">
                {card.title}
              </h1>
              <div className="p-4 text-center text-sm text-gray-700">{card.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mx-auto ">

          <div className='bg-[#F7F7F7] my-16 py-16 flex flex-col gap-16'>
            <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center">Últimos Logros</h1>
            {loading ? <SimpleLoader /> : <NuestrosLogrosSlider items={nuestrosLogros} />}
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center">Últimas Noticias y Avisos Judiciales</h1>
          {loading ? <SimpleLoader /> : <NoticiasSlider items={noticias} />}
        </div>
      </div>
    </>
  );
};

export default Home;
