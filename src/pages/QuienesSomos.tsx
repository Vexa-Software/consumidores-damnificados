import React from "react";

const QuienesSomos: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center py-16 bg-white px-10">

            <h1 className="text-3xl 2xl:text-6xl font-bold text-center text-[#0E153A] mb-10">
                Quiénes Somos
            </h1>


            <div className="w-[85%] sm:w-[84%] lg:sm:w-[91%] 2xl:sm:w-[77%] grid grid-cols-1 lg:grid-cols-3 gap-12 text-[#324A6D] text-sm leading-relaxed">

                <div>
                    <h2 className="text-xl 2xl:text-2xl font-semibold text-[#324A6D] mb-4">
                        Nuestro <span className="font-extrabold">Origen</span>
                    </h2>
                    <p>
                        Consumidores Damnificados Asociación Civil nace en el año 2002,
                        época en que nuestro país se encontraba económica y políticamente colapsado
                        y los ciudadanos que no eran inversores calificados afrontaban impedimentos judiciales
                        para cobrar sus inversiones financieras en bonos públicos y privados (obligaciones negociables, etc.),
                        todos los cuales estaban en default o exhibían alta volatilidad, capitalización de mercado caótica,
                        contratos de opción incumplidos, etc. Esas personas estaban desperdigadas y recurrieron a consejeros legales
                        para encontrar una alternativa idónea en orden a concretar reclamos adecuados para proteger sus derechos.
                    </p>
                    <p className="mt-4">
                        Porque encarar personalmente un pleito
                        (con sus eventuales consecuencias y gastos)
                        es algo que rehúye toda persona particular.
                        Máxime cuando el perjuicio específico de cada uno no es cuantioso
                    </p>
                    <p className="mt-4">
                        Se concluyó entonces que el mecanismo adecuado
                        eran las acciones colectivas contempladas en la ley de defensa del consumidor (Ley 24.240, artículo 52),
                        promulgada en el año 1993 y poco usada en ese entonces para reclamos judiciales referidos a grandes grupos de personas.
                    </p>
                    <p className="mt-4">Ello así, porque al igual que en otros países europeos y americanos
                        (Alemania, Bélgica, Escocia, España, Francia, Grecia, Holanda, Italia, Portugal, Rusia, Suecia Brasil, Chile, Colombia y Perú, entre otros)
                        la ley argentina confiere aptitud jurídica para que una asociación de consumidores inscripta como tal,
                        represente tácitamente y sin mandato expreso de cada interesado,
                        a los afectados por una ilegalidad que produzca el mismo daño a muchas personas,
                        cada uno en su medida particular (se denominan ese tipo de derechos <span className="italic text-[#0E153A]">“intereses individuales homogéneos”</span>).
                    </p>
                    <p className="mt-4">
                        Tal es el origen de nuestra asociación.
                    </p>
                    <p className="mt-4">
                        Cabe agregar que también abarcamos cuestiones de índole ambiental,
                        de acuerdo a la ley 25.675 y análogas (ley 24051, etc.),
                        poseyendo una legitimación amplia sobre esa temática.
                    </p>
                </div>


                <div className="">
                    <h2 className="text-xl 2xl:text-2xl font-semibold text-[#324A6D] mb-4">
                        Cómo <span className="font-extrabold">Trabajamos</span>
                    </h2>
                    <p>
                        Nos desenvolvemos en tres escenarios: la evacuación de consultas particulares
                        <span className="italic text-[#0E153A]"> –en forma presencial en la sede de la asociación en C.A.B.A. y mucho más por correos electrónicos–</span>,
                        programas de educación del consumidor presenciales u online y también procesos judiciales de acciones colectivas,
                        por diversas patologías ambientales o económicas.
                    </p>
                    <p className="mt-4">
                        Estas últimas principalmente en el ámbito de los retails,
                        bancos y otras entidades financieras que otorgan préstamos con tasas abusivas,
                        cobran comisiones o cargos ilegales (entre otras patologías),
                        como así también en materia de mercado de capitales
                        respecto a empresas que captan ahorros de consumidores
                        pero incurren en mala praxis en diversos campos de la operatoria con títulos bursátiles.
                    </p>
                    <p className="mt-4">
                        Se involucró también la asociación en materia ambiental,
                        defendiendo la protección de humedales en el país,
                        verdaderos reservorios de oxígeno y vidas silvestres.
                    </p>
                    <p className="mt-4">
                        Dentro del plexo de sus voluntarios colaboradores hay especialistas
                        en diversas materias vinculadas con los objetivos institucionales de la asociación.
                    </p>



                </div>


                <div className="text-[#324A6D]">
                    <p className="pt-12">
                        Como ejemplo de los programas de educación e información a los usuarios y consumidores,
                        desarrollamos diversos temas de interés por medio de internet y/o presencialmente,
                        en la sede de la FUNDACION DE ESTUDIOS SUPERIORES E INVESTIGACION (FUNDESI).

                    </p>
                    <p className="">
                        Entre ellos:
                    </p>

                    <ul className="list-disc  space-y-1  pl-10 pt-4">
                        {[
                            "Sistemas administrativos de protección a los consumidores",
                            "Quejas y entes de control",
                            "Informaciones a las cuales el consumidor tiene el derecho de exigir",
                            "Información engañosa",
                            "Indemnizaciones posibles de obtener",
                            "Régimen de audiencias públicas para convalidar aumentos de tarifas",
                            "El derecho a la salud",
                            "Contratos bancarios simples",
                            "Contratos inmobiliarios",
                            "Contratos de seguros",
                            "Créditos on line",
                            "El consumidor en internet",
                            "Turismo y defensa del consumidor",
                            "Tarjetas de crédito",
                            "Inversiones en el mercado de capitales",
                            "Derechos de los inversores no profesionales",

                        ].map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <p className="pt-6">
                        En otro orden, contamos con una activa presencia en convocatorias del ENRE (temas de energía),
                        ORSNA (temas de aeropuertos) y diversos Organismos públicos de Defensa del Consumidor.
                    </p >
                    <p className="pt-6">
                        Integramos el Consejo Consultivo del CU (Control de Servicios Públicos de la Ciudad de Bs As)
                        y de la Dirección Nacional de Defensa del Consumidor.
                    </p>
                    <p className="pt-6">
                        Cabe señalar también que formulamos presentaciones institucionales ante la
                        Cámara de Diputados de la Nación en la etapa gestatoria de la que luego fue
                        la Ley 27.441, de Financiamiento Productivo.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuienesSomos;
