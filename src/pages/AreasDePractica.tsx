import React from 'react';
import CardsGrid from '../hooks/CardsGrid';
import { Link } from "react-router-dom";

const AreasDePractica: React.FC = () => {
  return <>

    <section className="areasdepractica-banner">
      <div className="flex flex-col-reverse gap-10  lg:flex-row items-center justify-between pb-10 lg:pb-0">
        {/* Columna de Información */}
        <div className='lg:w-[45%] px-[5%] lg:ps-[5%]'>
          <h2 className="font-bold text-4xl lg:text-5xl mb-5">Áreas de práctica</h2>
          <p className="text-md md:text-2xl">
            En nuestro estudio, brindamos asesoramiento <strong>integral</strong> en diversas áreas del derecho, con un enfoque especializado en las{" "}
            <strong>necesidades empresariales y particulares</strong>.
          </p>
          <p className="text-md md:text-2xl">
            Nos dedicamos a ofrecer <strong>soluciones legales</strong> en las áreas del derecho en las que el estudio se especializa.
          </p>
        </div>


        {/* Columna de Imagen */}
        <div className='h-[40%] lg:w-[50%]'>
          <img
            src="/assets/img/AREAS_PRACTICA.jpeg"
            alt="Áreas de práctica"
          />
        </div>
      </div>
    </section>

    {/* Cards */}
    <CardsGrid />

    {/* Desafio legal */}

    <section className="bg-gray-400 p-12">
      <div className="mx-auto  text-end flex flex-col items-end">
        <h2 className="font-bold text-3xl text-white mb-4">¿Tienes un desafío legal?</h2>
        <p className="text-primary text-md mb-6 leading-relaxed max-w-4xl">
          Nuestro equipo de abogados está listo para ofrecerte el asesoramiento y la representación que necesitas.
          Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar los mejores resultados.
        </p>
        <Link
          to="/contacto" className="bg-customBlue text-white font-semibold py-3 px-8 shadow-md hover:bg-white hover:text-primary transition duration-500">
          Hacer una consulta
        </Link>
      </div>
    </section>


  </>;
};

export default AreasDePractica;
