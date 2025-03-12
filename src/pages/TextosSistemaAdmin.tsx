import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import SimpleLoader from "../components/SimpleLoader/SimpleLoader";
import CustomQuillEditor, { convertQuillToTailwind, convertTailwindToQuill } from "@/components/CustomQuillEditor";
import ConfirmAlert from "@/components/ConfirmAlert";

const textosKeys = [
  { categoria: "quienes_somos", id: "origen", nombre: "Quienes Somos - Origen" },
  { categoria: "quienes_somos", id: "trabajamos", nombre: "Quienes Somos - Cómo Trabajamos" },
  { categoria: "quienes_somos", id: "temas", nombre: "Quienes Somos - Temas" },
  { categoria: "noticias", id: "informacion_importante", nombre: "Noticias - Información Importante" },
  { categoria: "denuncia", id: "texto", nombre: "Denuncia - Texto" },

  { categoria: "footer", id: "facebook", nombre: "Footer - Facebook" },
  { categoria: "footer", id: "instagram", nombre: "Footer - Instagram" },
  { categoria: "footer", id: "enlaces_relacionados", nombre: "Footer - Enlaces" },

  { categoria: "contacto", id: "contacto_correo", nombre: "Contacto - Correo" },
  { categoria: "contacto", id: "contacto_telefono", nombre: "Contacto - Teléfono" },
  { categoria: "contacto", id: "contacto_horario", nombre: "Contacto - Horario" },
];

const TextosSistemaAdmin: React.FC = () => {
  const [textos, setTextos] = useState<{ [key: string]: string }>({});
  const [savingStates, setSavingStates] = useState<{ [key: string]: boolean }>({});
  const [deletingStates, setDeletingStates] = useState<{ [key: string]: boolean }>({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false);
  const [textoAEliminar, setTextoAEliminar] = useState<{categoria: string, id: string, nombre: string} | null>(null);

  // Lista de campos que deberían usar input de texto simple
  const simpleTextFields = [
    "facebook",
    "instagram",
    "contacto_correo",
    "contacto_telefono",
    "contacto_horario"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newTextos: { [key: string]: string } = {};
        for (const { id, categoria } of textosKeys) {
          const docRef = doc(db, `textos_sistema/${categoria}/textos`, id);

          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const contenidoOriginal = docSnap.data().contenido || "";
            const contenidoConvertido = convertQuillToTailwind(contenidoOriginal);
            newTextos[id] = contenidoConvertido;
          } else {
            toast.warn(`No se encontró el documento: ${id}`);
          }
        }
        setTextos(newTextos);
      } catch (error) {
        console.error("Error obteniendo los textos:", error);
        toast.error("Error obteniendo los textos");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (id: string, value: string) => {
    setTextos((prev) => ({ ...prev, [id]: value }));
  };

  const handleRichTextChange = (id: string, value: string) => {
    const formattedValue = convertQuillToTailwind(value);
    setTextos((prev) => ({ ...prev, [id]: formattedValue }));
  };

  const handleSave = async (categoria: string, id: string) => {
    setSavingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const formattedText = convertTailwindToQuill(textos[id]);
      await setDoc(doc(db, `textos_sistema/${categoria}/textos`, id), { contenido: formattedText }, { merge: true });
      toast.success(`"${id}" guardado correctamente`);
    } catch (error) {
      console.error("Error guardando el texto:", error);
      toast.error("Error al guardar el texto");
    }
    setSavingStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleDelete = async (categoria: string, id: string, nombre: string) => {
    setTextoAEliminar({ categoria, id, nombre });
    setModalEliminarOpen(true);
  };

  const confirmarEliminar = async () => {
    if (!textoAEliminar) return;
    const { categoria, id } = textoAEliminar;

    setDeletingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await deleteDoc(doc(db, `textos_sistema/${categoria}/textos`, id));
      setTextos((prev) => ({ ...prev, [id]: "" })); 
      toast.success(`"${id}" borrado correctamente`);
    } catch (error) {
      console.error("Error borrando el texto:", error);
      toast.error("Error al borrar el texto");
    }
    setDeletingStates((prev) => ({ ...prev, [id]: false }));
    setModalEliminarOpen(false);
    setTextoAEliminar(null);
  };

  return (
    <div className="flex flex-col p-6 bg-white">
      <h1 className="text-3xl sm:text-5xl text-sky-500 font-normal mb-2 xl:mb-4 text-start">Gestión de Textos del Sistema</h1>
      <p className="text-lg sm:text-xl text-sky-500 font-light mb-4 xl:mb-10 text-start">Administra los textos del sistema</p>

      {initialLoading ? (
        <div className="w-full flex justify-center items-center min-h-[400px]">
          <SimpleLoader />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-6">
          {textosKeys.map(({ id, nombre, categoria }) => (
            <div key={id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">{nombre}</h2>

              {(savingStates[id] || deletingStates[id]) ? (
                <div className="flex justify-center items-center h-32">
                  <SimpleLoader />
                </div>
              ) : simpleTextFields.includes(id) ? (
                <input
                  type="text"
                  value={textos[id] ?? ""}
                  onChange={(e) => handleChange(id, e.target.value)}
                  className="w-full p-2 border rounded-md bg-white disabled:bg-gray-100"
                  placeholder={`Ingrese ${nombre.toLowerCase()}`}
                />
              ) : (
                <CustomQuillEditor
                  value={convertTailwindToQuill(textos[id] ?? "")}
                  onChange={(value) => handleRichTextChange(id, value)}
                />
              )}

              <div className="flex justify-end mt-3 gap-2">
                {(<button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => handleSave(categoria, id)}
                    disabled={savingStates[id] || deletingStates[id]}
                  >
                    {savingStates[id] ? "Guardando..." : "Guardar"}
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(categoria, id, nombre)}
                  disabled={savingStates[id] || deletingStates[id]}
                >
                  {deletingStates[id] ? "Borrando..." : "Borrar Texto"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmAlert
        isOpen={modalEliminarOpen}
        title={`¿Estás seguro de borrar ${textoAEliminar?.nombre}?`}
        message="Esta acción eliminará todo el contenido del texto y no se puede deshacer."
        confirmText="Sí, borrar"
        cancelText="No, cancelar"
        onConfirm={confirmarEliminar}
        onCancel={() => {
          setModalEliminarOpen(false);
          setTextoAEliminar(null);
        }}
        confirmButtonColor="bg-red-500"
      />
    </div>
  );
};

export default TextosSistemaAdmin;
