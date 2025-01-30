import React from "react";

const QuienesSomos: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center py-16 bg-white px-10">
            {/* Título */}
            <h1 className="text-3xl font-bold text-center text-[#0E153A] mb-10">
                Quiénes Somos
            </h1>

            {/* Contenedor en tres columnas */}
            <div className="w-[85%] sm:w-[84%] lg:sm:w-[91%] 2xl:sm:w-[77%] grid grid-cols-1 lg:grid-cols-3 gap-12 text-[#324A6D] text-sm leading-relaxed">
                {/* Columna 1 - Nuestro Origen */}
                <div>
                    <h2 className="text-xl font-bold text-[#0E153A] mb-4">
                        Nuestro <span className="font-extrabold">Origen</span>
                    </h2>
                    <p>
                        Consumidores Damnificados Asociación Civil se remonta al año
                        2002, época en que nuestro país se encontraba económica y
                        políticamente colapsado (corralito financiero, estado de sitio y
                        varios presidentes nacionales en solo algunos meses) y época
                        en que los propios ciudadanos no encontraban alternativas
                        judiciales para cobrar sus inversiones en bonos públicos y
                        privados (obligaciones negociables) todos los cuales estaban
                        en default. Esos ciudadanos estaban desperdigados y
                        acudieron a consejos legales para encontrar una alternativa
                        idónea para los reclamos judiciales que protejan  sus derechos.
                    </p>
                    <p className="mt-4">
                        Se concluyó que el mecanismo adecuado eran (son) las
                        acciones colectivas contempladas en la ley de defensa del
                        consumidor, 24.240, artículo 52
                    </p>
                    <p className="mt-4">
                        A tal fin se agruparon varias decenas en una asociación civil, y
                        con todas las formalidades legales del caso la crearon e
                        inscribieron en la Inspección General de Justicia , en la
                        Secretaría de Comercio Interior y en los respectivos Registros de
                        Asociaciones de defensa del consumidores
                    </p>
                    <p className="mt-4">Ocurrió ello en el año 2004.</p>
                    <p className="mt-4">
                        Los sucesivos nombres fueron “Damnificados Financieros”,
                        “Consumidores Financieros” y el actual “Consumidores
                        Damnificados”
                    </p>
                </div>

                {/* Columna 2 - Cómo Trabajamos */}
                <div className="">
                    <h2 className="text-xl font-bold text-[#324A6D] mb-4">
                        Cómo <span className="font-extrabold">Trabajamos</span>
                    </h2>
                    <p>
                        Nos desenvolvemos en tres escenarios: la evacuación de consultas particulares
                        <span className="italic text-[#0E153A]"> –sea en forma presencial en la sede de la asociación en C.A.B.A. y mucho más por correos electrónicos del público–</span>,
                        programas de educación del consumidor y también los procesos judiciales de acciones colectivas, por diversas
                        patologías ambientales o económicas.
                    </p>
                    <p className="mt-4">
                        Estas últimas principalmente en el ámbito de los retails, los
                        bancos y otras entidades financieras, planes de ahorro y
                        préstamo para compra de vehículos  y además en reclamos
                        vinculados al valor perjudicado de acciones bursátiles no por
                        las naturales oscilaciones del mercado sino por la mala praxis
                        de las empresas emisoras .
                    </p>
                    <p className="mt-4">
                        Se involucró también la asociación en materia ambiental,
                        defendiendo la protección de humedales en el país, verdaderos
                        reservorios de oxígeno y vidas silvestres
                    </p>
                    <p className="mt-4">
                        Dentro del plexo de sus voluntarios colaboradores hay
                        especialistas en diversas materias vinculadas con los objetivos
                        institucionales de la asociación.
                    </p>
                    <p className="mt-4">
                        Cabe asimismo precisar que se concretaron ,  concitando una
                        importante cantidad de personas, “jornadas” gratuitas de
                        capacitación en la acogedora sede de una tradicional
                        Fundación de estudios de pos grado en derecho, en el
                        microcentro de la ciudad de Buenos Aires.
                    </p>
                </div>

                {/* Columna 3 - Ejemplos (sin título) */}
                <div className="text-[#324A6D]">
                    <p className="pt-12">
                        Como ejemplo de esos programas , los temas que se contemplan
                        son los siguientes :
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
                            "Créditos obtenidos 'on line'",
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
                        En otro orden, siempre tuvo activa presencia en gestiones ante : A)
                        ENRE; B) ORSNA; C) UNIREN.
                    </p >
                    <p className="pt-6">
                        También integramos  el consejo de usuarios de Enargas
                        (CUENARGAS)
                    </p>
                    <p className="pt-6">
                        Asimismo formulamos presentaciones institucionales ante la
                        Cámara de Diputados de la Nación en la etapa gestatoria de la
                        que luego fue la Ley 27.441, de Financiamiento Productivo.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuienesSomos;
