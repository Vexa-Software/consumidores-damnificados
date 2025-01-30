import React from 'react';
import { Link } from "react-router-dom";

const Denuncia: React.FC = () => {
    return (
        <>
            <div className="w-full flex flex-col items-center py-16 bg-white px-10">
                {/* Título Principal */}
                <h1 className="text-5xl font-bold text-center text-[#1C244B] mb-16">
                    Denuncia
                </h1>

                {/* Subtítulo */}
                <div className="w-[77%] text-[#324A6D] mt-6 text-lg leading-relaxed">
                    <h4 className="text-2xl text-[#0E153A]  text-left w-[65%]">
                        <span className="">Tu Denuncia</span>{" "}
                        <span className="font-bold ">Es Muy Importante</span>
                    </h4>

                    {/* Información */}

                    <h1 className="font-semibold text-lg mt-6 text-[#0E153A]">¿Cómo denunciar?</h1>
                    <p className="mt-6">
                        Lo podés hacer de forma personal, por teléfono, correo electrónico, correspondencia postal y/o internet:
                    </p>

                    <ul className=" list-disc mt-4 space-y-2 pl-10">
                        <li>
                            <span className="font-semibold">Personalmente:</span> concurrir a Av. Presidente Roque Sáenz Peña 885 P4 – CABA de Lunes a Viernes (hábiles) de 12 a 16 horas.
                        </li>
                        <li>
                            <span className="font-semibold">Teléfono:</span> comunicarse al{" "}
                            <span className="text-[#0E153A] font-semibold">+54 11 6884 0597</span> de Lunes a Viernes (hábiles) de 12 a 16 horas.
                        </li>
                        <li>
                            <span className="font-semibold">Correo Electrónico:</span> enviar un correo electrónico a{" "}
                            <a
                                href="mailto:consumidoresdamnificados@gmail.com"
                                className="text-[#D23A4B] hover:underline font-semibold"
                            >
                                consumidoresdamnificados@gmail.com
                            </a>
                        </li>
                        <li>
                            <span className="font-semibold">Correspondencia Postal:</span> enviar una nota a la dirección Av. Presidente Roque Sáenz Peña 885 P4 – CABA.
                        </li>
                        <li>
                            <span className="font-semibold">Internet:</span> completar el formulario en el siguiente enlace:
                        </li>
                    </ul>

                    {/* COPREC */}
                    <div className="mt-6 text-center">
                        <p className="text-[#0E153A] font-semibold">COPREC</p>
                        <a
                            href="https://www.produccion.gob.ar/coprec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#D23A4B] hover:underline font-semibold"
                        >
                            produccion.gob.ar/coprec
                        </a>
                    </div>





                    <div className="mt-10">
                        <h1 className="font-bold text-xl text-[#0E153A]">
                            Si Tuviste Algún Problema Al Contratar Con Algún Proveedor De Bienes Y Servicios, Existen Distintos Canales Para Efectuar Tu Reclamo:
                        </h1>

                        {/* Organismos con URL en línea */}
                        {[
                            { name: "A) Defensa del Consumidor de C.A.B.A. en cualquier CGP cerca de tu barrio:", url: "buenosaires.gob.ar/defensaconsumidor/como-denunciar" },
                            { name: "B) Dirección Nacional de Defensa del Consumidor y Arbitraje de Consumo, donde encontrarás el “Sistema de Resolución de Conflictos en las Relaciones de Consumo” y al “Sistema Nacional de Arbitraje de Consumo”:", url: "consumidor.gob.ar" },
                            { name: "C) Dependiendo el tipo de servicio con el que hayas tenido problemas, podrás dirigir tu denuncia en el ente regulador correspondiente, donde además encontraras información adicional respecto de cada uno de los servicios:" },
                            { name: "Banco Central de la República Argentina (BCRA)", url: "bcra.gov.ar" },
                            { name: "Comisión Nacional de Comunicaciones (CNC)", url: "cnc.gov.ar" },
                            { name: "Comisión Nacional de Regulación del Transporte (CNRT)", url: "cnrt.gov.ar" },
                            { name: "Ente Nacional Regulador de la Electricidad (ENRE)", url: "enre.gov.ar" },
                            { name: "Ente Nacional Regulador del Gas (ENARGAS)", url: "enargas.gov.ar" },
                            { name: "Ente Regulador de Aguas y Saneamiento (ERAS)", url: "eras.gov.ar" },
                            { name: "Ente Único Regulador de los Servicios Públicos de la Ciudad Autónoma de Buenos Aires (EURSPCABA)", url: "entedelaciudad.gov.ar" },
                            { name: "Organismo de Control de la Energía Eléctrica de la Provincia de Buenos Aires (OCEBA)", url: "gba.gov.ar" },
                            { name: "Organismo Regulador del Sistema Nacional de Aeropuertos (ORSNA)", url: "orsna.gov.ar" },
                            { name: "Órgano de Control de Concesiones Viales (OCCOVI)", url: "occovi.gov.ar" },
                            { name: "Ente Nacional de Obras Hídricas de Saneamiento (ENHOSA)", url: "enhosa.gov.ar" },
                            { name: "Comité Federal de Radiodifusión (COMFER)", url: "comfer.gov.ar" },
                            { name: "Si estas en interior de nuestro país podés consultar la dirección de la oficina de la Dirección Nacional de Defensa del Consumidor en el siguiente link:", url: "consumidor.gob.ar/contacto" }
                        ].map((ente, index) => (
                            <div key={index} className="mt-4">
                                <p className="">{ente.name}</p>
                                <a href={ente.url} className="text-[#D23A4B] hover:underline">{ente.url}</a>
                            </div>
                        ))}

                        <p className="mt-6">
                            También podés consultar en las oficinas de tu municipio la existencia de oficinas de defensa del consumidor locales, que variaran según la organización de cada provincia.
                        </p>

                        <p className="mt-4">
                            Recordá que siempre es necesario, además de ser el titular de la relación de consumo –es decir, “la persona que contrató”- contar con algún comprobante que acredite la relación de consumo
                            entre el proveedor y vos. Puede ser un mail pidiendo información sobre un bien o servicio, un ticket, factura, contrato de adhesión, una carta o cualquier otro medio.
                            Sino estás seguro de si sos o fuiste víctima de un abuso por parte de un proveedor, sino estas seguro de si lo que te están cobrando es correcto, contáctanos, para brindarte asesoramiento e
                            indicarte los pasos a seguir (link al mail de contacto).
                        </p>

                        <p className="mt-4">
                            Si pensás que el proveedor o empresa que afectó tus derechos, realiza la misma operatoria con otros clientes, afectando sus derechos, contáctanos para que podamos asesorarte e investigar esa
                            cláusula u operatoria abusiva y eventualmente requerir -administrativa o judicialmente- al proveedor que la corrija.
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Denuncia;
