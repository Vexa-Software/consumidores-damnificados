import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { collection, onSnapshot, query, doc, getDoc, where, orderBy, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import SimpleLoader from "../components/SimpleLoader/SimpleLoader";
import { convertQuillToTailwind } from "@/components/CustomQuillEditor";

interface Item {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string;
}

interface PaginatedListProps {
  storageKey: string;
  title: string;
}

const PaginatedList: React.FC<PaginatedListProps> = ({ storageKey, title }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [infoLoading, setInfoLoading] = useState<boolean>(true);
  const [itemsMostrados, setItemsMostrados] = useState<number>(3);
  const [infoImportante, setInfoImportante] = useState<string>("");
  const [infoError, setInfoError] = useState<boolean>(false);

  useEffect(() => {
    const fetchInfoImportante = async () => {
      setInfoLoading(true);
      try {
        const docRef = doc(db, "textos_sistema", "noticias", "textos", "informacion_importante");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInfoImportante(docSnap.data().contenido);
          setInfoError(false);
        } else {
          setInfoImportante("");
          setInfoError(true);
        }
      } catch (error) {
        console.error("Error al obtener el texto de información importante:", error);
        toast.error("Error al cargar la información importante.");
        setInfoError(true);
      } finally {
        setInfoLoading(false);
      }
    };

    fetchInfoImportante();
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      const q = query(
        collection(db, storageKey),
        where("isDeleted", "!=", true),
        orderBy("fecha", "desc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const formatearFecha = (fecha: Timestamp | string) => {
          if (fecha instanceof Timestamp) {
            return fecha.toDate().toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
          }
          return String(fecha);
        };

        const itemsData: Item[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            titulo: data.titulo,
            descripcion: data.descripcion,
            fecha: formatearFecha(data.fecha),
            imagen: data.imagen
          };
        });

        setItems(itemsData);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error al obtener datos en tiempo real:", error);
      toast.error("Error al obtener datos.");
      setLoading(false);
    }
  }, [storageKey]);


  const handleCargarMas = () => {
    setItemsMostrados((prev) => prev + 3);
  };

  return (
    <div className="max-w-full px-[12%] lg:px-[7.5%] 2xl:px-[13%] p-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-center mb-6">{title}</h1>


      {storageKey === "noticias" && (
        <div className="bg-white p-6 rounded-lg  mb-6  ">

          <div className="flex items-center space-x-4">
            <FaInfoCircle className="text-[#1C244B] text-xl 2xl:text-4xl" />
            <h1 className="text-sm sm:text-[90%] lg:text-lg 2xl:text-xl font-bold text-[#1C244B]">INFORMACIÓN IMPORTANTE.-</h1>
          </div>

          {infoLoading ? (
            <div className="flex justify-center items-center h-32">
              <SimpleLoader />
            </div>
          ) : infoError ? (
            <p className="text-red-500 text-[80%] sm:text-[90%] 2xl:text-lg text-center mt-4">
              No se encontró la información importante
            </p>
          ) : (
            <p className="text-gray-500 text-[80%] sm:text-[90%] 2xl:text-lg text-justify mt-4 "  dangerouslySetInnerHTML={{ __html: convertQuillToTailwind(infoImportante) }}>
            </p>
          )}
        </div>
      )}


      {loading ? (
        <div className="flex justify-center items-center h-40">
          <SimpleLoader />
        </div>
      ) : (
        items.slice(0, itemsMostrados).map((item) => (
          <div
            key={item.id}
            className="w-full p-6 my-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:space-x-4"
          >

            {storageKey === "noticias" && item.imagen && (
              <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                <img
                  src={item.imagen}
                  alt="Noticia"
                  className="w-full h-[200px] sm:w-[200px] sm:h-[300px] 2xl:w-[300px] 2xl:h-[300px] object-cover rounded-lg mb-4 sm:mb-0"
                />
              </div>
            )}


            {storageKey === "nuestrosLogros" && (
              <div className="flex justify-center sm:justify-start">
                <FaCheckCircle className="text-sky-500 text-3xl sm:text-4xl lg:text-5xl flex-shrink-0 mb-2" />
              </div>
            )}


            <div className="flex-1">

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center  ">
                <h1 className={`font-bold text-sm sm:text-[90%] lg:text-lg 2xl:text-xl text-[#1C244B] mb-2 sm:text-start sm:w-[60%] md:w-auto}`} dangerouslySetInnerHTML={{ __html: item.titulo }}>
                 
                </h1>
                <span className="text-[#1C244B] text-sm sm:text-[90%] lg:text-lg 2xl:text-xl font-medium mb-2 sm:ml-4">
                  {item.fecha}
                </span>
              </div>


              <p className="text-gray-500 text-[80%] sm:text-[90%] 2xl:text-lg " dangerouslySetInnerHTML={{ __html: item.descripcion }}>

              </p>
            </div>
          </div>
        ))
      )}


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
