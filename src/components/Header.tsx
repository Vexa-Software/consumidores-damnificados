import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-background text-white flex z-20 w-full relative">
      <div className="container mx-auto px-2  flex gap-14 justify-center sm:justify-between items-center">
        {/* Logo */}
        <div className="logo flex  justify-between items-center  sm:px-16  lg:px-2">
          {/* Logo Desktop */}
          <Link to="/" className="hidden lg:block w-[431px] h-[52px]">
            <img
              src="/assets/img/consumidores-damnificados/consulogo.png"
              alt="Logo consumidores-damnificados"
              className="w-full h-full object-contain"
            />
          </Link>
          {/* Logo Mobile */}
          <Link to="/" className="lg:hidden w-[219px] sm:w-[80%] h-[71px] px-0 sm:px-0">
            <img
              src="/assets/img/consumidores-damnificados/consulogo.png"
              alt="Logo Consumidores-damnificados"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>


        {/* Navigation */}
        <nav
          className={`absolute top-[70px] left-0 w-full bg-white text-black flex flex-col items-center space-y-4 transition-all duration-300 lg:px-12 2xl:px-12 ${isMenuOpen ? 'h-auto opacity-100 py-8' : 'h-0 opacity-0 overflow-hidden'
            } lg:static lg:h-auto lg:opacity-100 lg:overflow-visible lg:flex lg:flex-row lg:py-0 lg:space-x-6 2xl:space-x-8 lg:justify-end lg:items-center lg:space-y-0`}
        >
          <Link to="/" className="custom-link transition font-normal py-2 px-4 lg:py-0 lg:px-0">
            Home
          </Link>
          <Link to="/quienes-somos" className="custom-link transition font-normal py-2 px-4 lg:py-0 lg:px-0">
            Quienes Somos
          </Link>
          <Link to="/avisos-judiciales" className="custom-link transition font-normal py-2 px-4 lg:py-0 lg:px-0">
            Avisos Judiciales
          </Link>
          <Link to="/denuncia" className="custom-link transition font-normal py-2 px-4 lg:py-0 lg:px-0">
            Denunciá
          </Link>
          <Link to="/noticias" className="custom-link transition font-normal py-2 px-4 lg:py-0 lg:px-0">
            {/* Linker bien */}
            Noticias
          </Link>
          <Link to="/contacto" className="custom-link transition font-normal py-2 px-4 lg:py-0 lg:px-0">
            Contacto
          </Link>
        </nav>




        {/* Icono menú hamburguesa para mobile */}
        <div className="lg:hidden  sm:px-16 ">
          <button
            className="text-black"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;