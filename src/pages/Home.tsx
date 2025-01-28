import React from 'react';
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CountUp from "react-countup";
import { teamMembers } from "../utils/membersInfo"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Contacto from "./Contacto";
import { truncateText } from '../utils/string-utils';

const Home: React.FC = () => {

  return (
    <>
      <div
        className="bg-center h-[100vh] relative"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(56, 67, 112, 0.25) 0%, rgba(17, 20, 33, 0.25) 100%), url('/assets/img/banner-home.png')",
          backgroundSize: 'cover',
          minHeight: "100vh"
        }}
      >
        <div className="absolute inset-0 z-0 bg-[#23314B] opacity-10" />
        <div className="banner-home relative z-10 text-left h-[100vh] flex flex-col items-start justify-center px-4 md:px-8 lg:px-40">
          <style>
            {`
            @media (max-width: 1023px) {
              .banner-home {
                background-image: linear-gradient(to right, rgba(56, 67, 112, 0.5) 0%, rgba(17, 20, 33, 0.5) 100%), url('/assets/img/banner-home-md.png');
                background-size: cover;
                background-position: right 35%;
              }
            }
          `}
          </style>
          <div className="absolute inset-0 bg-[#23314B] opacity-10 z-0" />

          <div className="flex flex-col items-start relative z-20">
            {/* Titulo */}
            <h2 className="text-lg md:text-xl roboto-regular-italic mb-4 md:mb-6 bg-transparent text-white px-2">Nuestros expertos</h2>

            {/* Contenedor de imágenes */}
            <div className="img-container-home relative w-[150px] h-[80px] md:w-[200px] md:h-[100px]">
              <img
                src="/assets/img/experts/VALERIA_MUSSI.jpeg"
                alt="Nuestra experta Valeria Mussi"
                className="absolute w-[64px] h-[64px] md:w-[96px] md:h-[96px] rounded-full object-cover z-40"
              />
              <img
                src="/assets/img/experts/MARIELA_PRATO.jpeg"
                alt="Nuestra experta Mariela Prato"
                className="absolute w-[64px] h-[64px] md:w-[96px] md:h-[96px] rounded-full object-cover z-30"
                style={{ left: '25%' }}
              />
              <img
                src="/assets/img/experts/DANIEL_SPINA.jpeg"
                alt="Nuestro experto Daniel Spina"
                className="absolute w-[64px] h-[64px] md:w-[96px] md:h-[96px] rounded-full object-cover z-20"
                style={{ left: '50%' }}
              />
              <img
                src="/assets/img/experts/ENRIQUE_FALCON.jpeg"
                alt="Nuestro experto Enrique Falcon"
                className="absolute w-[64px] h-[64px] md:w-[96px] md:h-[96px] rounded-full object-cover z-10"
                style={{ left: '75%' }}
              />
              <span className="flex justify-end items-center w-[135%] h-[80%] md:h-full text-white text-xl">+</span>
            </div>
          </div>

          {/* Título principal */}
          <h1 className="custom-title-home w-[100%] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 relative z-0 leading-[2.5rem] md:leading-[3rem] lg:leading-[3.2rem]">
            <span className="text-primary bg-customSecondaryWhite ">Más</span>
            <span className="text-customPrimaryWhite">
              {' '} de <span className='text-customSecondaryWhite'>20 años</span> defendiendo tus derechos <br className="hidden md:block" />
              con compromiso y excelencia{' '}
              <span className="text-primary bg-customSecondaryWhite md:hidden">legal.</span>
              <span className="text-primary bg-customSecondaryWhite hidden md:inline">legal.</span>
            </span>
          </h1>


          {/* Subtítulo */}
          <h2 className="custom-subtitle-home w-[100%] sm:w-[619px] text-[16px] md:text-base lg:text-lg mb-4 md:mb-6 relative z-20 text-white lg:text-gray-300 sm:bg-transparent sm:p-0">
            Soluciones jurídicas de confianza en derecho del consumidor, mercado de capitales y más.
          </h2>

          {/* Botón consulta */}
          <a
            href="#contact-form"
            className="custom-button-home w-[100%] sm:w-[250px] text-center flex items-center justify-center bg-customBlue text-white px-6 py-2 md:px-8 md:py-3 hover:text-primary hover:bg-white text-sm md:text-lg font-medium shadow-md transition relative z-20"
          >
            Hacer una consulta
          </a>
        </div>


        <div className="flex flex-col  items-center bg-white pt-16 relative w-full">
          {/* Sección superior con imagen y texto */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full px-6 lg:px-[5rem]">
            {/* Imagen */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/assets/img/abogado-work.png"
                alt="Abogado trabajando"
                className="img-section2 z-20 shadow-lg w-full h-auto"
              />
            </div>
            {/* Texto */}
            <div className="w-full lg:w-1/2 text-center lg:text-right flex flex-col items-center lg:items-end mb-8">
              <h2 className="title-containerimg-section2 font-bold text-secondary mb-4 lg:mb-14 text-4xl md:text-5xl">La Firma</h2>
              <p className="p-containerimg-section2 text-primary leading-10 mb-6 max-w-[650px] text-[18px] md:text-2xl">
                <strong className="text-secondary">APM Abogados</strong>, fundado en el{' '}
                <strong className="text-secondary">año 2002</strong>, es un estudio jurídico especializado en
                <strong className="text-secondary"> derecho del consumidor, comercial y Mercado de capitales</strong>,
                incluyendo Acciones de Clase, tipo de proceso este último que hemos sustanciado en numerosas ocasiones
                ante la <strong className="text-secondary">Justicia Nacional</strong>, especialmente.
              </p>
              <Link
                to="/contacto"
                className="px-10 py-3 bg-customBlue text-white w-[50%] lg:w-min shadow hover:text-primary hover:bg-white border border-customBlue transition">
                Escribinos
              </Link>
            </div>
          </div>

          {/* Sección con estadísticas */}
          <div className="flex flex-wrap items-center justify-center gap-12 mt-24 w-full max-w-screen-lg">
            {/* Elemento 1 */}
            <div className="group-circle relative text-center group flex items-center justify-center">
              <div className="circle-estadistics-home absolute flex items-center justify-center rounded-full border-2 border-transparent group-hover:scale-110 group-hover:bg-[rgba(101,101,104,0.137)] transition-all duration-500">
                {/* Este div ya es el círculo */}
              </div>
              <div className="relative text-black group-hover:text-customGrey z-10">
                <div className="text-5xl font-bold text-customSecondaryGray">
                  <CountUp start={0} end={20} duration={2.5} enableScrollSpy scrollSpyOnce prefix="+" />
                </div>
                <div className="text-secondary font-bold group-hover:text-customGrey">años de experiencia</div>
              </div>
            </div>

            {/* Elemento 2 */}
            <div className="group-circle relative text-center group flex items-center justify-center">
              <div className="circle-estadistics-home absolute flex items-center justify-center rounded-full border-2 border-transparent group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative text-black group-hover:text-customGrey">
                <div className="text-5xl font-bold">
                  <CountUp start={0} end={2000} duration={2.5} prefix="+" separator="," enableScrollSpy scrollSpyOnce />
                </div>
                <div className="text-secondary font-bold group-hover:text-customGrey">causas judiciales</div>
              </div>
            </div>

            {/* Elemento 3 */}
            <div className="group-circle relative text-center group flex items-center justify-center">
              <div className="circle-estadistics-home absolute flex items-center justify-center rounded-full border-2 border-transparent group-hover:scale-110 transition-all duration-500"></div>
              <div className="relative text-black group-hover:text-customGrey">
                <div className="text-5xl font-bold text-customSecondaryGray">
                  <CountUp start={0} end={8} duration={2.5} prefix="+" separator="," enableScrollSpy scrollSpyOnce />
                </div>
                <div className="text-secondary font-bold group-hover:text-customGrey">áreas de práctica</div>
              </div>
            </div>
          </div>

          <div className="contain-practice px-6 md:px-16 py-12 bg-white">
            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">Áreas de práctica</h2>
            {/* Descripción */}
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              En nuestro estudio, brindamos soluciones legales integrales, adaptadas a las necesidades comerciales,
              financieras, laborales y administrativas de nuestros clientes, siempre con un enfoque estratégico y eficaz.
            </p>

            {/* Tarjetas */}
            <div className="container-cards-home flex flex-wrap justify-center items-center gap-10 p-4">
              {/* Tarjeta 1 */}
              <Link
                to="/areas-de-practica">
                <div className="cards-home group shadow-xl overflow-hidden bg-white flex flex-col items-center text-center transition-all duration-300 w-[270px] h-[490px] hover:h-[500px] sm:w-[380px] sm:h-[530px] sm:hover:h-[550px]">
                  <img
                    src="/assets/img/AREA_DERECHO_CONSUMO.jpg"
                    alt="Derecho de consumo"
                    className="object-cover w-[325px] h-[229px] mt-6"
                  />
                  <div className="p-4 relative">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Derecho de consumo</h4>
                    <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed px-2">
                      {truncateText('Se encarga de regular las relaciones entre los usuarios y consumidores con los proveedores. Su principal objetivo es proteger los derechos de los consumidores, garantizar la transparencia en las transacciones comerciales y promover el equilibrio en las relaciones de consumo.', 180)}
                    </p>
                    {/* Flecha que aparece en hover */}
                    <button className="absolute top-40 right-1/2 transform translate-x-1/2 opacity-0 lg:group-hover:opacity-100 text-primary border border-customBlue px-2 py-1 rounded-full shadow transition-all duration-300 mt-6 sm:mt-6">
                      ➔
                    </button>
                  </div>
                </div>
              </Link>

              {/* Tarjeta 2 */}
              <Link
                to="/areas-de-practica">
                <div className="cards-home group shadow-xl overflow-hidden bg-white flex flex-col items-center text-center transition-all duration-300 w-[270px] h-[490px] hover:h-[500px] sm:w-[380px] sm:h-[530px] sm:hover:h-[550px]">
                  <img
                    src="/assets/img/AREA_DERECHO_COMERCIAL.jpg"
                    alt="Derecho comercial"
                    className="flex object-cover w-[325px] h-[229px] mt-6"
                  />
                  <div className="p-4 relative">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Derecho comercial</h4>
                    <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed px-2">
                      {truncateText('Se encarga de regular las relaciones entre comerciantes, buscando proporcionar un marco normativo que fomente la seguridad jurídica y la confianza en el ámbito de los negocios.', 180)}
                    </p>
                    <button className="absolute top-40 right-1/2 transform translate-x-1/2 opacity-0 lg:group-hover:opacity-100 text-primary border border-customBlue px-2 py-1 rounded-full shadow transition-all duration-300 mt-6 sm:mt-6">
                      ➔
                    </button>
                  </div>
                </div>
              </Link>

              {/* Tarjeta 3 */}
              <Link
                to="/areas-de-practica">
                <div className="cards-home group shadow-xl overflow-hidden bg-white flex flex-col items-center text-center transition-all duration-300 w-[270px] h-[490px] hover:h-[500px] sm:w-[380px] sm:h-[530px] sm:hover:h-[550px]">
                  <img
                    src="/assets/img/AREA_DERECHO_CIVIL.jpg"
                    alt="Derecho civil"
                    className="flex  w-[325px] h-[229px] object-cover mt-6"
                  />

                  <div className="p-4 relative">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Derecho civil</h4>
                    <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed px-2">
                      {truncateText('Es una rama del derecho privado que regula las relaciones entre las personas físicas o jurídicas, en aspectos esenciales de la vida cotidiana.  Su finalidad principal es garantizar la convivencia armónica y proteger los derechos fundamentales, como la propiedad, la familia y la responsabilidad por daños.', 180)}
                    </p>
                    <button className="absolute top-40 right-1/2 transform translate-x-1/2 opacity-0 lg:group-hover:opacity-100 text-primary border border-customBlue px-2 py-1 rounded-full shadow transition-all duration-300 mt-6 sm:mt-6">
                      ➔
                    </button>
                  </div>
                </div>
              </Link>

              {/* Tarjeta 4 */}
              <Link
                to="/areas-de-practica">
                <div className="cards-home group shadow-xl overflow-hidden bg-white flex flex-col items-center text-center transition-all duration-300 w-[270px] h-[490px] hover:h-[500px] sm:w-[380px] sm:h-[530px] sm:hover:h-[550px]">
                  <img
                    src="/assets/img/AREA_DERECHO_LABORAL.jpg"
                    alt="Derecho laboral"
                    className=" flex object-cover w-[325px] h-[229px] mt-6"
                  />
                  <div className="p-4 relative">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Derecho de trabajo</h4>
                    <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed px-2 ">
                      {truncateText('Regula las relaciones laborales entre empleados y empleadores, procurando que los derechos y obligaciones de ambas partes se encuentren garantizados.', 180)}
                    </p>
                    <button className="absolute top-40 right-1/2 transform translate-x-1/2 opacity-0 lg:group-hover:opacity-100 text-primary border border-customBlue px-2 py-1 rounded-full shadow transition-all duration-300 mt-6 sm:mt-6">
                      ➔
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            {/* Botón */}
            <div className="text-center mt-12">
              <Link
                to="/areas-de-practica"
                className="px-8 py-4  bg-white text-primary hover:text-white font-medium shadow border border-customBlue hover:bg-customBlue transition">
                Ver todas las áreas
              </Link>
            </div>
          </div>
          {/* Miembros del estudio */}
          <section className="bg-amber-50 w-full">
            <div className="team-carousel text-center bg-lightYellow pb-32 pt-16">
              {/* Título */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Miembros del estudio</h2>
              <p className="text-gray-600 mb-16 max-w-2xl px-[5%] mx-auto">
                Nuestro equipo está formado por abogados expertos en diversas áreas del derecho, comprometidos con ofrecer
                soluciones legales efectivas y personalizadas para cada cliente.
              </p>

              {/* Carrusel */}
              <div className='h-[300px]'>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 2,
                      spaceBetween: 50,
                    },
                    1366: {
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  centeredSlides={true}
                  loop={true}
                >
                  {teamMembers.map((member, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col justify-center items-center">
                        <div className="relative group w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full overflow-hidden shadow-lg">
                          <img
                            src={member.img}
                            alt={member.name}
                            className="object-cover w-full h-full"
                          />
                          {/* Botón hover */}
                          <Link
                            to="/nuestro-equipo"
                            className="absolute inset-0 flex items-end justify-center bg-black/50 opacity-0 group-hover:opacity-70 transition-all"
                          >
                            <div className="p-2 mb-6 rounded-full shadow-md">
                              <span className="text-white text-lg border-2 px-2 py-1 rounded-full">
                                &rarr;
                              </span>
                            </div>
                          </Link>
                        </div>
                        <p className='mt-5 text-xl'>{member.name}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>

          <Contacto isHomePage={true} />
          <div className="flex w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
