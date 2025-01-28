
import { Link } from "react-router-dom";
import { truncateText } from '../utils/string-utils';

// Info
const cardsData = [
  {
    img: "/assets/img/AREA_ACCION_CLASE.jpg",
    alt: "Acciones de clase",
    title: "Acciones de clase",
    description:
      "Las acciones de clase son un mecanismo procesal que permite a un grupo de personas con intereses comunes demandar colectivamente en defensa de sus derechos. Este instrumento, en el cual somos pioneros en el derecho argentino, tiene como objetivo garantizar el acceso a la justicia y la eficiencia en la resolución de conflictos que afectan a múltiples individuos de manera similar.",
  },
  {
    img: "/assets/img/AREA_DERECHO_CONSUMO.jpg",
    alt: "Derecho de consumo",
    title: "Derecho de consumo",
    description:
      "Se encarga de regular las relaciones entre los usuarios y consumidores con los proveedores. Su principal objetivo es proteger los derechos de los consumidores, garantizar la transparencia en las transacciones comerciales y promover el equilibrio en las relaciones de consumo.",
  },
  {
    img: "/assets/img/AREA_MERCADO_CAPITALES.jpg",
    alt: "Mercado de Capitales",
    title: "Mercado de Capitales",
    description:
      "Es una rama del derecho financiero que regula las actividades relacionadas con la emisión, oferta, negociación y control de valores negociables en el mercado. Su finalidad principal es garantizar la transparencia, integridad y eficiencia en las operaciones, protegiendo a los inversores y fomentando el desarrollo del sistema financiero.",
  },
  {
    img: "/assets/img/AREA_DERECHO_COMERCIAL.jpg",
    alt: "Derecho comercial",
    title: "Derecho comercial",
    description:
      "Se encarga de regular las relaciones entre comerciantes, buscando proporcionar un marco normativo que fomente la seguridad jurídica y la confianza en el ámbito de los negocios.",
  },
  {
    img: "/assets/img/AREA_DERECHO_BANCARIO.jpg",
    alt: "Derecho bancario",
    title: "Derecho bancario",
    description:
      "Es la rama del derecho que regula las actividades y relaciones derivadas de la prestación de servicios bancarios y financieros. Comprende las normas que rigen a las entidades financieras, como bancos y otras instituciones de crédito, así como los contratos, operaciones y transacciones que involucran a estas entidades.",
  },
  {
    img: "/assets/img/AREA_DERECHO_ARBITRAL.jpg",
    alt: "Arbitraje",
    title: "Arbitraje",
    description:
      "Intervenimos y asesoramos en litigios comerciales llevados adelante ante diversos Tribunales de Arbitraje.",
  },
  {
    img: "/assets/img/AREA_DERECHO_CIVIL.jpg",
    alt: "Derecho civil",
    title: "Derecho civil",
    description:
      "Es una rama del derecho privado que regula las relaciones entre las personas físicas o jurídicas, en aspectos esenciales de la vida cotidiana.  Su finalidad principal es garantizar la convivencia armónica y proteger los derechos fundamentales, como la propiedad, la familia y la responsabilidad por daños.",
  },
  {
    img: "/assets/img/AREA_DERECHO_LABORAL.jpg",
    alt: "Derecho laboral",
    title: "Derecho laboral",
    description:
      "Regula las relaciones laborales entre empleados y empleadores, procurando que los derechos y obligaciones de ambas partes se encuentren garantizados.",
  },
  {
    img: "/assets/img/AREA_DERECHO_ADMINISTRATIVO.jpeg",
    alt: "Derecho administrativo",
    title: "Derecho administrativo",
    description:
      "Es la rama del derecho público que regula la actividad del Estado en su función administrativa, las relaciones entre la Administración Pública y los particulares, y los mecanismos de control sobre los actos del poder público. Su propósito principal es garantizar que las actuaciones de los órganos administrativos sean legales, transparentes y respeten los derechos de los ciudadanos."
  },
];

const CardsGrid = () => {
  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
      <div className="container-cards-home flex flex-wrap justify-center gap-6 p-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="cards-home group shadow-xl overflow-hidden bg-customBlue flex flex-col items-center text-center transition-all duration-300 w-[90%] min-h-[700px] h-[100%] md:w-[507px] md:min-h-[800px] md:h-[800px] md:hover:h-[830px]"
          >
            {/* Imagen */}
            <img
              src={card.img}
              alt={card.alt}
              className="object-cover w-full h-[35%] md:h-[368px]"
            />
            {/* Contenido */}
            <div className="p-4 relative w-full flex flex-col justify-between flex-grow">
              <div>
                <h3 className="title-cards-areasdepractica font-bold text-start text-white mb-2 px-4">
                  {card.title}
                </h3>
                <p className="p-cards-areasdepractica text-start text-white leading-relaxed px-4">
                  {truncateText(card.description, 500)}
                </p>
              </div>

              {/* Botón "Quiero asesorarme" */}
              <div
                className={`${window.innerWidth < 768
                    ? "opacity-100 mb-5"
                    : "opacity-0 group-hover:opacity-100"
                  } transition-opacity duration-500 mt-4`}
              >
                <Link
                  to="/contacto"
                  className="text-white border text-xl border-white hover:bg-white hover:text-primary px-4 py-2 shadow"
                >
                  Quiero asesorarme
                </Link>
              </div>

              {/* Flecha */}
              <div className="hidden lg:flex lg:flex-col lg:items-center">
                <span className="text-xl font-bold text-white border-[3px] border-white rounded-full px-4 p-2 transition-transform duration-300 transform group-hover:rotate-180">
                  ↓
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
