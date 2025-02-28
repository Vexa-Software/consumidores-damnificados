import React from 'react';
import { useEffect, useState } from 'react';
import {  doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";


const Denuncia: React.FC = () => {
    const [textoDenuncia, setTextoDenuncia] = useState<string>("");

 useEffect(() => {
    const fetchTextoDenuncia = async () => {
      try {
        const docRef = doc(db, "textos_sistema", "denuncia", "textos", "texto");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setTextoDenuncia(docSnap.data().contenido);
        } else {
            setTextoDenuncia(""); 
        }
      } catch (error) {
        console.error("Error al obtener el texto de información importante:", error);
        toast.error("Error al cargar la información importante.");
      }
    };

    fetchTextoDenuncia();
  }, []);

    return (
        <>
            <div className="w-full flex flex-col items-center py-16 bg-white px-10">

                <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center text-[#1C244B] mb-16">
                    Denuncia
                </h1>


                <div className="w-[77%] text-[#324A6D] mt-6 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: textoDenuncia }}>
                   

                </div>
            </div>
        </>
    );
};

export default Denuncia;
