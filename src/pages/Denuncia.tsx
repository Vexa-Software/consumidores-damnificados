import React from 'react';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import SimpleLoader from "../components/SimpleLoader/SimpleLoader";

const Denuncia: React.FC = () => {
    const [textoDenuncia, setTextoDenuncia] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchTextoDenuncia = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "textos_sistema", "denuncia", "textos", "texto");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTextoDenuncia(docSnap.data().contenido);
                    setError(false);
                } else {
                    setTextoDenuncia("");
                    setError(true);
                }
            } catch (error) {
                console.error("Error al obtener el texto de denuncia:", error);
                toast.error("Error al cargar la información de denuncia");
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTextoDenuncia();
    }, []);

    return (
        <>
            <div className="w-full flex flex-col items-center py-16 bg-white px-10">
                <h1 className="text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold text-center text-[#1C244B] mb-16">
                    Denunciá
                </h1>

                {loading ? (
                    <div className="w-full flex justify-center items-center min-h-[200px]">
                        <SimpleLoader />
                    </div>
                ) : error ? (
                    <div className="w-[77%] text-red-500 mt-6 text-lg leading-relaxed text-center">
                        No se encontró la información sobre denuncias
                    </div>
                ) : (
                    <div className="w-[77%] text-[#324A6D] mt-6 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: textoDenuncia }} />
                )}
            </div>
        </>
    );
};

export default Denuncia;
