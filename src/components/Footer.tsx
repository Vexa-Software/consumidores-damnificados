import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2A2A2B] text-white w-full py-6">
      <div className="container mx-auto flex flex-col sm:flex-row lg:flex-row justify-between items-center px-16 sm:px-20 lg:px-16">
        {/* Columna Izquierda: Logo */}
        <div className="flex items-center justify-center lg:justify-start mb-6 lg:mb-0">
          <img
            src="/assets/img/consumidores-damnificados/footer-logo.png"
            alt="Consumidores Damnificados"
            className="w-[180px] object-contain"
          />
        </div>

        {/* Columna Centro: Enlaces Relacionados */}
        <div className="text-center text-sm text-gray-400 flex flex-col lg:flex-row lg:items-center lg:gap-4">
          <span className="text-white font-medium">Enlaces Relacionados:</span>
          {[
            { name: "ssn.gov.ar", url: "https://ssn.gov.ar" },
            { name: "enre.gov.ar", url: "https://enre.gov.ar" },
            { name: "enargas.gov.ar", url: "https://enargas.gov.ar" },
            { name: "cns.gov.ar", url: "https://cns.gov.ar" },
            { name: "cnrt.gov.ar", url: "https://cnrt.gov.ar" },
          ].map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Columna Derecha: Iconos de Redes Sociales con Fondo Blanco */}
        <div className="flex items-center gap-4 mt-6 lg:mt-0">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-2 rounded-full text-[#2A2A2B] hover:bg-gray-300 transition text-xl w-10 h-10 flex items-center justify-center"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-2 rounded-full text-[#2A2A2B] hover:bg-gray-300 transition text-xl w-10 h-10 flex items-center justify-center"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
