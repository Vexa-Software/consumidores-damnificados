import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-customBlue text-white w-full py-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Columna Izquierda: Logo */}
        <div className="mb-6 flex flex-row items-center justify-center lg:mb-0">
          <img
            src="/assets/img/APM-abogados-logo.svg"
            alt="APM Abogados"
            className="w-[80%] md:w-full h-full object-contain"
          />
        </div>

        {/* Columna Derecha: Información de Contacto */}
        <div className="text-center md:text-right leading-relaxed flex flex-col md:flex-row md:items-center md:justify-end gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-10 text-base justify-end w-full">
            <div className="flex items-center">
              📍 <p className="ml-2">Gral. Juan D. Perón 315, 2° piso, CABA</p>
            </div>
            <div className="flex items-center">
              ☎ <p className="ml-2">Tel: 11-5766-2143</p>
            </div>
            <div className="flex items-center">
              ✉{" "}
              <a
                href="mailto:info@apmabogados.com.ar"
                className="ml-2 underline hover:text-gray-300"
              >
                info@apmabogados.com.ar
              </a>
            </div>
          </div>
        </div>


      </div>
    </footer>

  );
};

export default Footer;
