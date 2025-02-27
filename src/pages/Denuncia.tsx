import React from 'react';

const Denuncia: React.FC = () => {
    return (
        <>
            <div className="w-full flex flex-col items-center py-16 bg-white px-10">

                <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center text-[#1C244B] mb-16">
                    Denunciá
                </h1>


                <div className="w-[77%] text-[#324A6D] mt-6 text-lg leading-relaxed">
                    <h1 className=" text-[#0E153A] font-semibold text-sm xl:text-xl text-left ">

                        <span>Tu denuncia es útil para que nuestra asociación se involucre:</span>
                    </h1>
                    <p className='mt-5 text-sm lg:text-lg'>Además, facilitará el reclamo si aportas algún comprobante que acredite la relación de consumo entre el proveedor y vos. Puede ser un mail pidiendo información sobre un bien o servicio, un ticket, factura, contrato de adhesión, una carta o cualquier otro medio.</p>



                    <h1 className="font-semibold text-sm xl:text-xl mt-6 text-[#0E153A]">¿Cómo denunciar?</h1>
                    <p className="mt-6 text-sm lg:text-lg">
                        Puede ser de forma personal, por teléfono, correo electrónico y/o correspondencia postal:
                    </p>

                    <ul className=" list-disc mt-4 space-y-2 pl-10 text-sm lg:text-lg">
                        <li>
                            <span className="font-semibold ">Personalmente: </span>
                            concurrir a Tte. Gral. J. D. Perón 315, Piso 6º, Of. 23 – CABA de
                            Lunes a Viernes (hábiles) de 12 a 16 horas.
                            Si prefieres que participe un profesional relacionado con la índole de tu consulta,
                            debes pedirla con una anticipación mínima de cinco días
                            a fin de que nosotros convoquemos a dicho especialista.
                        </li>
                        <li>
                            <span className="font-semibold">Teléfono: </span> comunicarse al{" "}
                            <span className="text-[#0E153A] font-semibold">+54 11 6884 0597 </span>
                            de Lunes a Viernes (hábiles) de 12 a 16 horas.
                            En su caso, dejar un mensaje y te responderemos a la brevedad.
                        </li>
                        <li>
                            <span className="font-semibold">Correo Electrónico:</span> enviar un email a{" "}
                            <a
                                href="mailto:consumidoresdamnificados@gmail.com"
                                className="text-[#D23A4B] hover:underline font-semibold"
                            >
                                consumidoresdamnificados@gmail.com
                            </a>
                        </li>
                        <li>
                            <span className="font-semibold">Correspondencia Postal: </span>
                            enviar una nota a Tte. Gral. J. D. Perón 315, Piso 6º, Of. 23, CP 1038 – CABA.
                        </li>

                    </ul>

                    <div className="mt-10">
                        <h1 className="font-bold italic text-sm xl:text-xl text-[#0E153A]">
                            Si sos consumidor final y tuviste algún problema con algún proveedor de bienes y servicios,
                            existen distintos canales para efectuar tu reclamo al margen de nuestra intervención:
                        </h1>


                        {[
                            { name: "A) Defensa del Consumidor de C.A.B.A. de forma digital ingresando al siguiente link: ", url: "https://buenosaires.gob.ar/tramites/denuncia-ante-defensa-al-consumidor" },
                            { name: "B) Ventanilla Única Federal de Defensa del Consumidor: Deberá ingresar al siguiente link completando la información solicitada en el formulario y enviarlo. Luego de ello, recibirá por correo electrónico el número de reclamo asignado y Defensa al Consumidor o la autoridad local se pondrá en contacto con usted a fin de informarte los pasos a seguir.", url: "https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario%20" },
                            { name: "C) Dirección del Sistema de Conciliación Previa en las Relaciones de Consumo del Consejo de la Magistratura de la Ciudad de Buenos Aires: Deberá ingresar desde su celular a la App “Mi reclamo” y seguir los pasos que allí se indican. Luego de la admisión de su reclamo, será citado a una audiencia online con un conciliador. Importante: Si tu pretensión en pesos es hasta 20 UMAS no necesitarás abogado, pero si supera este monto deberás estar acompañado en la audiencia online con un letrado que te patrocine." },
                            { name: "D) Dependiendo el tipo de servicio con el que hayas tenido problemas, podrás realizar tu denuncia en el ente regulador correspondiente, donde además encontraras información adicional respecto de cada uno de los servicios: " },
                            { name: "Banco Central de la República Argentina (BCRA)", url: "https://www.bcra.gov.ar" },
                            { name: "Ente Nacional de Comunicaciones", url: "https://www.enacom.gob.ar/" },
                            { name: "Comisión Nacional de Regulación del Transporte (CNRT)", url: "https://www.cnrt.gov.ar" },
                            { name: "Ente Nacional Regulador de la Electricidad (ENRE)", url: "https://www.enre.gov.ar" },
                            { name: "Ente Nacional Regulador del Gas (ENARGAS)", url: "https://www.enargas.gov.ar" },
                            { name: "Ente Regulador de Aguas y Saneamiento (ERAS)", url: "https://www.eras.gov.ar" },
                            { name: "Organismo de Control de la Energía Eléctrica de la Provincia de Buenos Aires (OCEBA)", url: "https://www.gba.gov.ar" },
                            { name: "Organismo Regulador del Sistema Nacional de Aeropuertos (ORSNA)", url: "https://www.orsna.gov.ar" },
                            { name: "Comisión Nacional de Valores", url: "https://www.cnv.gob.ar" }
                        ].map((ente, index) => (
                            <div key={index} className="mt-4">
                                <p className="text-sm lg:text-lg">{ente.name}</p>
                                <a href={ente.url} className="text-[#D23A4B] text-sm lg:text-lg hover:underline">{ente.url}</a>
                            </div>
                        ))}

                        <p className="mt-6 text-sm lg:text-lg">
                            También podes consultar tu municipio la existencia de oficinas de defensa del consumidor locales (OMIC), que variaran según la organización de cada provincia.
                        </p>


                    </div>

                </div>
            </div>
        </>
    );
};

export default Denuncia;
