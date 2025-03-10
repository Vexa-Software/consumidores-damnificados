import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SimpleLoader from "../components/SimpleLoader/SimpleLoader";

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
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [initialLoading, setInitialLoading] = useState(true);

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
            newTextos[id] = docSnap.data().contenido || "";
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

  const handleSave = async (categoria: string, id: string) => {
    setSavingStates((prev) => ({ ...prev, [id]: true }));
    try {
      let dataToSave = textos[id];

      await setDoc(doc(db, `textos_sistema/${categoria}/textos`, id), { contenido: dataToSave }, { merge: true });
      toast.success(`"${id}" guardado correctamente`);
      setEditing((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error("Error guardando el texto:", error);
      toast.error("Error al guardar el texto");
    }
    setSavingStates((prev) => ({ ...prev, [id]: false }));
  };


  const handleDelete = async (categoria: string, id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este texto?")) return;
    setDeletingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await deleteDoc(doc(db, `textos_sistema/${categoria}/textos`, id));
      setTextos((prev) => ({ ...prev, [id]: "" })); 
      toast.success(`"${id}" eliminado correctamente`);
    } catch (error) {
      console.error("Error eliminando el texto:", error);
      toast.error("Error al eliminar el texto");
    }
    setDeletingStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleEdit = (id: string) => {
    setEditing((prev) => ({ ...prev, [id]: !prev[id] })); 
  };
    const quillRef = useRef<ReactQuill>(null);
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }], // 🟢 Agrega la opción de alineación
        ["link"],
        ["clean"],
      ],
      history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true,
      },
      clipboard: {
        matchVisual: false,
      },
    };
    
  
  return (
    <div className="flex flex-col items-center p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center text-sky-600">Gestión de Textos del Sistema</h1>
      
      {initialLoading ? (
        <div className="w-full flex justify-center items-center min-h-[400px]">
          <SimpleLoader />
        </div>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 gap-6">
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
                  disabled={!editing[id]}
                  className="w-full p-2 border rounded-md bg-white disabled:bg-gray-100"
                  placeholder={`Ingrese ${nombre.toLowerCase()}`}
                />
              ) : (
                <ReactQuill
                  value={textos[id] ?? ""}
                  onChange={(value) => handleChange(id, value)}
                  ref={quillRef}
				  modules={modules}
                  className="bg-white"
                  readOnly={!editing[id]}
                />
              )}

              <div className="flex justify-end mt-3 gap-2">
                {!editing[id] ? (
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(id)}
                    disabled={deletingStates[id]}
                  >
                    Editar
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => handleSave(categoria, id)}
                    disabled={savingStates[id] || deletingStates[id]}
                  >
                    {savingStates[id] ? "Guardando..." : "Guardar"}
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(categoria, id)}
                  disabled={savingStates[id] || deletingStates[id]}
                >
                  {deletingStates[id] ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextosSistemaAdmin;
