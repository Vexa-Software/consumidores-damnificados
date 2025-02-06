import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

interface Item {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string;
}

interface PaginatedListProps {
  storageKey: string; // Clave en localStorage ("avisosJudiciales" o "noticias")
  title: string; // Título principal ("Avisos Judiciales" o "Últimas Noticias")
}

const PaginatedList: React.FC<PaginatedListProps> = ({ storageKey, title }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemsMostrados, setItemsMostrados] = useState<number>(3); // Mostrar inicialmente 3 elementos
  const pdfUrl = "/assets/pdf/EDICTO-MAPFRE.pdf"; // Cambia esta ruta por la correcta

  useEffect(() => {
    const savedItems = localStorage.getItem(storageKey);
    if (savedItems) {
      const parsedItems: Item[] = JSON.parse(savedItems);
        
      // Ordenar por fecha más reciente primero
      parsedItems.sort((a: Item, b: Item) => 
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );

      setItems(parsedItems);
      
    }
  }, [storageKey]);

  // Función para cargar más elementos
  const handleCargarMas = () => {
    setItemsMostrados((prev) => prev + 3); // Cargar 3 más
  };

  return (
    <div className="max-w-full px-[12%] lg:px-[7.5%] 2xl:px-[13%] p-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-center mb-6">{title}</h1>

      {storageKey === "noticias" && (
        <div className="bg-white p-6 rounded-lg  mb-6  ">
          {/* Encabezado con ícono */}
          <div className="flex items-center space-x-4">
            <FaInfoCircle className="text-[#1C244B] text-xl 2xl:text-4xl" />
            <h1 className="text-sm sm:text-[90%] lg:text-lg 2xl:text-xl font-bold text-[#1C244B]">INFORMACIÓN IMPORTANTE.-</h1>
          </div>

          {/* Contenido */}
          <p className="text-gray-500 text-[80%] sm:text-[90%] 2xl:text-lg text-justify mt-4 ">
            Se hace saber que ante el Juzgado Nacional de Primera Instancia en lo Comercial Nº 8, Secretaría N° 15, sito en Libertad 533, planta baja, de esta Ciudad, tramita el proceso colectivo
            caratulado “Proconsumer y Otro c/ Sumiplan S.A. de Ahorro P/F Determinados y Otro s/ Sumarísimo (Expte N° 7545/2007)” y que se ha dispuesto la publicación de avisos a fin de hacer
            saber a los clientes y ex clientes personas físicas que hayan sido prestatarios, mutuarios y/o clientes con saldos en descubierto y que abonaron cargos por seguro de vida a Sumiplan S.A
            de Ahorro Para Fines Determinados, que la Asociaciones de Defensa del Consumidor “Proconsumer” y “Consumidores Damnificados Asociación Civil” han demandado a la mencionada
            entidad para que proceda a la devolución del cargo por seguro de vida colectivo sobre saldo deudor por considerar que sus clientes y ex clientes han abonado dichos conceptos en
            exceso (sobreprecio) como también por no disminuir el cargo por tal concepto a medida que los préstamos iban siendo amortizados. El artículo 54 de la Ley N° 24.240 (texto según Ley N°
            26.361) establece: “La sentencia que haga lugar a la pretensión hará cosa juzgada para el demandado y para todos los consumidores o usuarios que se encuentren en similares
            condiciones, excepto de aquellos que manifiesten su voluntad en contrario previo a la sentencia…” En consecuencia los clientes o ex clientes de “Sumiplan S.A. Para Fines Determinados”
            que hubieren abonado cargos por cualquier concepto vinculado a los seguros de vida, durante el periodo comprendido entre Marzo de 2004 y el presente, y que no quieran ser
            beneficiados por la sentencia que eventualmente se dicte, deberán comunicar su decisión dentro de los 30 días de efectuada esta comunicación a la Asociación “Consumidores
            Damnificados Asociación Civil”, previo al dictado de la sentencia. La comunicación deberá efectuarse por escrito a través del siguiente correo
            electrónico  a través de una nota presentada en la sede de la parte actora sita en Tte. Gral. Juan D. Perón 315, piso 6°, of. “23” de lunes a viernes de 09:00 hs a 13:00 hs sin necesidad de intervención de
            letrado. Por el contrario, los clientes y ex clientes de la entidad bancaria demandada que quieran ser beneficiados por una eventual sentencia favorable que se dicte, no deben realizar
            ninguna manifestación y en caso de denegarse el reclamo colectivo, subsistirá la vía judicial individual
            .<br />
            <br />
            Estimados consumidores y usuarios que son o hayan sido clientes de Argos Compañía de Seguros SA: queremos informarles que en la fecha 11 de marzo del 2011, iniciamos contra la
            mencionada compañía de seguros un juicio colectivo por supuestas irregularidades al momento de pagar las indemnizaciones por siniestros de “robo o destrucción total” durante el
            periodo marzo/2001 hasta la fecha. Lo cuestionado sería que, al momento de liquidar el pago del siniestro, no se descontaría la carga financiera (intereses) por elegir pagar la póliza en
            cuotas.
            <br />
            <br />
            Aquellos que no quieran ser representados por esta asociación de consumidores y por ende, ser incluidos en esta acción, lo pueden comunicar directamente al juzgado por carta simple o
            correo electrónico, hasta el momento previo a que se dicte sentencia.
            El juzgado interviniente es el Juzgado Nacional en Comercial Nº21 Sec. 41 ubicado en M.T. Alvear 1840 3º PISO, de la CABA y su correo electrónico es jncomercial21.sec41@pjn.gov.ar. Les
            informamos que la causa se encuentra denominada “Consumidores Damnificados Asociación Civil c/ Argos Compañía Argentina de Seguros Generales S.A. S/ Ordinario” y lleva el número
            5830/2011.
            <br />
            <br />
            Para mayor información consultar{" "}
            <a href="https:/www.argos-seguros.com" target="_blank" className="text-blue-600 underline">
              www.argos-seguros.com
            </a>{" "}
            y{" "}
            <a href="https:// www.consumidoresdamnificados.org.ar" target="_blank" className="text-blue-600 underline">
              www.consumidoresdamnificados.org.ar
            </a>
            .
          </p>
          <div className="flex items-center space-x-4 mt-16">
            <h1 className="text-lg sm:text-[90%] lg:text-lg 2xl:text-xl font-medium text-[#1C244B]">Notificaciones <span className="font-bold">Publicas</span></h1>
          </div>

          <p className="text-gray-500 text-[80%] sm:text-[90%] 2xl:text-lg text-justify mt-4">Ver documento Edicto MAPFRE {" "}
            <a
              href={pdfUrl}
              download="Edicto-MAPFRE.pdf"
              className="text-blue-600 underline" >aqui</a>.</p>
        </div>
      )}

      {/* Mostrar elementos paginados */}
      {items.slice(0, itemsMostrados).map((item) => (
        <div
          key={item.id}
          className="bg-[#F7F7F7] w-full p-6 my-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:space-x-4"
        >
  {/* Mostrar imagen si es una noticia y si tiene imagen */}
  {storageKey === "noticias" && item.imagen && (
            <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                <img src={item.imagen} alt="Noticia" className="w-full h-[200px] sm:w-[200px] sm:h-[300px] 2xl:w-[300px] 2xl:h-[300px] object-cover rounded-lg mb-4 sm:mb-0" />
            </div>
        )}

          {/* Si es "avisosJudiciales", muestra el icono de check, si es "noticias", no muestra nada */}
          {storageKey === "avisos-judiciales" && (
            <div className="flex justify-center sm:justify-start">
              <FaCheckCircle className="text-sky-500 text-3xl sm:text-4xl lg:text-5xl flex-shrink-0 mb-2" />
            </div>
          )}

          {/* Contenedor de contenido */}
          <div className="flex-1">
            {/* Título y fecha alineados horizontalmente en sm */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center ">
              <h1 className="font-bold text-sm sm:text-[90%] lg:text-lg 2xl:text-xl text-[#1C244B] mb-2 sm:text-start">{item.titulo}</h1>
              <span className="text-[#1C244B] text-sm sm:text-[90%] lg:text-lg 2xl:text-xl font-medium mb-2 sm:ml-4">{item.fecha}</span>
            </div>

            {/* Descripción alineada a la izquierda en sm y ocupando todo el ancho en mobile */}
            <p className="text-gray-500 text-[80%] sm:text-[90%] 2xl:text-lg text-justify">{item.descripcion}</p>
          </div>
        </div>
      ))}

      {/* Botón "Cargar más" */}
      {itemsMostrados < items.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleCargarMas}
            className="bg-sky-500 text-white px-6 py-2 rounded-md  hover:bg-sky-600 transition"
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedList;
