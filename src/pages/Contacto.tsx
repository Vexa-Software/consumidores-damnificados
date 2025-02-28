
import React, { useEffect, useState } from "react";
import {  doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const Contacto: React.FC = () => {
  const [infoContacto, setInfoContacto] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newTextos: { [key: string]: string } = {};

        for (const id of ["contacto_correo", "contacto_telefono", "contacto_horario"]) {
          const docRef = doc(db, "textos_sistema", "contacto", "textos", id);
          const docSnap = await getDoc(docRef);

          // 🔥 Solo traemos el contenido
          newTextos[id] = docSnap.exists() ? docSnap.data().contenido || "" : "";
        }

        setInfoContacto(newTextos);
      } catch (error) {
        console.error("❌ Error obteniendo los textos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-16 bg-white px-10">

      <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center text-[#1C244B] mb-10">
        Contáctenos
      </h1>


      <div className="w-[95%]  flex flex-col sm:flex-col lg:flex-row justify-between items-center gap-10 lg:px-[2%]  2xl:px-[9%]">

        <div className="w-full sm:w-[88%] lg:w-[50%] 2xl:w-[60%]">
          <iframe
            title="Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52591.75837350345!2d-58.44939347062024!3d-34.61177975937742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacbf24ac26f%3A0x2f287524c3b7501d!2sTte.%20Gral.%20Juan%20Domingo%20Per%C3%B3n%20315%2C%20C1038AAG%20CABA%2C%20Argentina!5e0!3m2!1sen!2sar!4v1706567890123!5m2!1sen!2sar"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>


        <div className="w-full sm:w-[88%] lg:w-[50%] 2xl:w-[45%] flex flex-col justify-center space-y-2 sm:space-y-6 2xl:space-y-8 sm:mt-6 lg:mt-0 2xl:mt-0">
          <p className="text-[#324A6D] text-sm sm:text-lg lg:text-lg 2xl:text-lg">
            <span className="font-semibold">Domicilio:</span> Tte. Gral. Juan D. Perón 315 P6 ofic.23 – C1038 – CABA
          </p>

          <p className="text-[#324A6D] text-sm sm:text-lg lg:text-lg 2xl:text-lg flex flex-row justify-start" >
          <strong>Horario de atención: </strong> {" "}
           
            <p className="ml-2" dangerouslySetInnerHTML={{ __html: infoContacto["contacto_horario"] }} />
          </p>

          <p className="text-[#324A6D] text-sm sm:text-lg lg:text-lg 2xl:text-lg flex flex-row justify-start" >
          <strong>Teléfono: </strong> {" "}
          <p className="ml-2" dangerouslySetInnerHTML={{ __html: infoContacto["contacto_telefono"] }} />
          </p>

          <p className="text-[#324A6D] text-sm sm:text-lg lg:text-lg 2xl:text-lg flex flex-row justify-start">
          <strong>Correo Electrónico: </strong> {" "}
            
            <a href="mailto:consumidoresdamnificados@gmail.com" className=" hover:underline">
            <p className="ml-2" dangerouslySetInnerHTML={{ __html: infoContacto["contacto_correo"] }} />
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contacto;
