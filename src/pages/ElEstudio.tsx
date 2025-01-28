import React from "react";

const ElEstudio: React.FC = () => {
  return (
    <div>
      <section className="areasdepractica-banner">
      <div className="flex flex-col-reverse gap-10  2xl:flex-row items-center justify-between pb-10 2xl:pb-0">
        {/* Columna de Información */}
        <div className='2xl:w-[45%] px-[5%] 2xl:ps-[5%]'>
          <h2 className="font-bold text-4xl 2xl:text-5xl mb-5">El estudio</h2>
          <p className="text-md md:text-2xl">
          Somos un  <strong>equipo</strong> de abogados especializados en diversas áreas del derecho, enfocados en ofrecer  <strong>soluciones legales{" "}
            eficaces</strong> y adaptadas a las <strong>necesidades</strong> de nuestros clientes.{" "}
          Con un compromiso firme con la etica y la excelencia, {" "}
          trabajamos para <strong>proteger y optimizar</strong> los intereses de quienes {" "}
          nos eligen, con técnicas y métodos de trabajo orientados a la {" "}
          <strong>resolución de conflictos.</strong>
          </p>
        </div>


        {/* Columna de Imagen */}
        <div className='h-[40%] 2xl:w-[50%]'>
          <img
            src="/assets/img/EL_ESTUDIO.jpeg"
            alt="Áreas de práctica"
          />
        </div>
      </div>
    </section>

      <section className="section-white-elestudio bg-white  flex items-start justify-start p-[5%]">
          {/* Columna izquierda */}
          {/* Recogiendo investigaciones de las asociaciones civiles de defensa
del consumidor sumado a las consultas y quejas de las personas que
acuden a ellas y luego derivan a este estudio jurídico, pudieron llevarse
adelante acciones judiciales no solo en temas financieros clásicos , como
el reproche de intereses usurarios, cobro de gastos inexistentes, falta de
información, abuso de posición dominante, etcétera, sino también en un
área muy específica y con poco desarrollo que requiere de conocimientos
especiales, tal como lo es el mercado de capitales.
En ambos campos se alcanzó, primero con las explicaciones teóricas
brindada por la asociación y luego con acciones judiciales encomendadas a
este estudio, una idónea protección de los consumidores, los cuales de
otra manera no se hubieran involucrado en un reclamo formal, por temor
a los gastos que podrían afrontar, complejidades de un pleito,
desconocimiento del tema, etcétera. Pero gracias a la legitimación activa
que le otorga la ley 24.240 a las asociaciones en defensa del consumidor -
ratificada por la Corte Suprema de Justicia de la Nación-, se reciben
muchas consultas y/o quejas que si resultan genuinas luego se derivan a
este estudio para entablar los reclamos correspondientes en nombre de
los consumidores representados por la Asociación.
Dada la natural confidencialidad que requieren las personas
respecto a sus inversiones, las acciones de clase son un mecanismo ideal
para resguardar los derechos de los consumidores, preservando siempre
sus identidades.
El sistema de acciones de clase posee una larga historia en países
como Alemania, Bélgica, Brasil, Chile, España, Francia, Grecia, Holanda,
Italia, entre otros, encontrándose en Argentina en un continuo desarrollo,
del cual formamos parte hace más de 20 años. */}



          {/* Columna derecha */}
            <p className="text-md md:text-lg whitespace-pre-wrap">{`Recogiendo investigaciones de las asociaciones civiles de defensa
del consumidor sumado a las consultas y quejas de las personas que
acuden a ellas y luego derivan a este estudio jurídico, pudieron llevarse
adelante acciones judiciales no solo en temas financieros clásicos , como
el reproche de intereses usurarios, cobro de gastos inexistentes, falta de
información, abuso de posición dominante, etcétera, sino también en un
área muy específica y con poco desarrollo que requiere de conocimientos
especiales, tal como lo es el mercado de capitales.
En ambos campos se alcanzó, primero con las explicaciones teóricas
brindada por la asociación y luego con acciones judiciales encomendadas a
este estudio, una idónea protección de los consumidores, los cuales de
otra manera no se hubieran involucrado en un reclamo formal, por temor
a los gastos que podrían afrontar, complejidades de un pleito,
desconocimiento del tema, etcétera. Pero gracias a la legitimación activa
que le otorga la ley 24.240 a las asociaciones en defensa del consumidor -
ratificada por la Corte Suprema de Justicia de la Nación-, se reciben
muchas consultas y/o quejas que si resultan genuinas luego se derivan a
este estudio para entablar los reclamos correspondientes en nombre de
los consumidores representados por la Asociación.
Dada la natural confidencialidad que requieren las personas
respecto a sus inversiones, las acciones de clase son un mecanismo ideal
para resguardar los derechos de los consumidores, preservando siempre
sus identidades.
El sistema de acciones de clase posee una larga historia en países
como Alemania, Bélgica, Brasil, Chile, España, Francia, Grecia, Holanda,
Italia, entre otros, encontrándose en Argentina en un continuo desarrollo,
del cual formamos parte hace más de 20 años.`}
            </p>
      </section>

      <section className="relative h-[400px] bg-cover bg-center " style={{ backgroundImage: "url('/assets/img/maps-img.png')" }}>
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-customBlue/50"></div>
        <div className="elestudio-maps-contain absolute inset-0 flex flex-col justify-center items-center md:items-start md:ps-10 text-center text-white   bg-customBlue/30">
          <div className="flex flex-col justify-center items-start text-center">
            <h3 className="text-2xl font-bold mb-4">Podés encontrarnos en:</h3>
            <p className="text-4xl w-[381px] text-start  font-medium mb-6">Tte. General Juan D. Perón 315, 2° piso, CABA</p>
            <a
              href="https://www.google.com/maps/place/Tte.+General+Juan+D.+Perón+315,+CABA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-3 bg-customBlue text-white font-semibold border border-customBlue hover:bg-white hover:text-primary shadow-md transition"
            >
              Ver en Maps
            </a>
          </div>
        </div>
        {/* Contenido centrado */}

      </section>



    </div>

  );
};

export default ElEstudio;
