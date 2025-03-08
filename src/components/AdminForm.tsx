import React, { useRef, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import imageCompression from 'browser-image-compression';
import ReactQuill from 'react-quill';

interface AdminFormProps {
  storageKey: string;
  nuevoItem: { titulo: string; descripcion: string; fecha: string; imagen?: string };
  setNuevoItem: (item: any) => void;
  editando: boolean;
  setEditando: (editando: any) => void;
  handleGuardarEdicion: () => void;
  handleAgregarItem: () => void;
  errores: { titulo: string; descripcion: string; fecha: string; imagen: string };
  setErrores: (errores: any) => void;
  validarCampos: () => boolean;
}

const AdminForm: React.FC<AdminFormProps> = ({
  storageKey,
  nuevoItem,
  setNuevoItem,
  editando,
  setEditando,
  handleGuardarEdicion,
  handleAgregarItem,
  errores,
  setErrores,
  validarCampos,
}) => {


  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDirty, setIsDirty] = useState(false);
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
  
  


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (storageKey !== "noticias") return;

    const file = event.target.files?.[0];
    if (!file) return;
    console.log(`📂 Tamaño original: ${(file.size / 1024).toFixed(2)} KB`);

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrores((prev: any) => ({ ...prev, imagen: "Formato inválido. Solo JPG, JPEG o PNG." }));
      return;
    }
    if (file.size > maxSize) {
      setErrores((prev: any) => ({ ...prev, imagen: "La imagen no puede superar los 5MB." }));
      return;
    }

    setErrores((prev: any) => ({ ...prev, imagen: "" }));

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Debes iniciar sesión para subir imágenes.");
        return;
      }
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };


      const compressedFile = await imageCompression(file, options);
      console.log(`📉 Tamaño después de compresión: ${(compressedFile.size / 1024).toFixed(2)} KB`);

      const storage = getStorage();
      const storageRef = ref(storage, `noticias/${user.uid}/${file.name}`);


      const snapshot = await uploadBytes(storageRef, compressedFile);


      const downloadURL = await getDownloadURL(snapshot.ref);
      setNuevoItem({ ...nuevoItem, imagen: downloadURL });


      console.log("Imagen subida correctamente:", downloadURL);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setErrores((prev: any) => ({ ...prev, imagen: "Error al subir la imagen." }));
    }
  };


  const handleSubmit = () => {
    if (editando) {
      handleGuardarEdicion();
      resetFormulario(true);
    } else {
      if (!validarCampos()) return;
      handleAgregarItem();
      resetFormulario();
    }
  };

  const resetFormulario = (forceReset = false) => {
    if (!forceReset && editando && isDirty) {
      const confirmCancel = window.confirm("Tienes cambios sin guardar. ¿Seguro que quieres cancelar?");
      if (!confirmCancel) return;
    }

    setNuevoItem({ id: "", titulo: "", descripcion: "", fecha: "", imagen: "" });
    setEditando(false);
    setIsDirty(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChangeTitle = (value: string) => {
    setNuevoItem((prevItem: any) => ({
      ...prevItem, // 🔹 Mantiene `titulo` y `fecha`
      titulo: value // 🔹 Solo cambia `descripcion`
  }));
    setErrores((prev: any) => ({ ...prev, titulo: "" }));
    setIsDirty(true);

    
  };

  const handleChangeDescription = (value: string) => {
    setNuevoItem((prevItem: any) => ({
        ...prevItem, // 🔹 Mantiene `titulo` y `fecha`
        descripcion: value // 🔹 Solo cambia `descripcion`
    }));
    setErrores((prev: any) => ({ ...prev, descripcion: "" }));
    setIsDirty(true);
};

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoItem({ ...nuevoItem, fecha: e.target.value });
    setErrores((prev: any) => ({ ...prev, fecha: "" }));
    setIsDirty(true);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e);
    setErrores((prev: any) => ({ ...prev, imagen: "" }));
    setIsDirty(true);
  };


  return (
    <div className="mb-6 bg-white w-full  rounded-lg flex flex-col  xl:flex-row justify-between sm:h-auto">

      <div className=" w-[100%] sm:w-[100%] xl:w-[49%]">

        <div className="mb-4 flex flex-col justify-between ">
          <label htmlFor="titulo" className="block text-xs font-medium text-sky-500 mb-1">
            Título (*)
          </label>
          <ReactQuill value={nuevoItem.titulo} onChange={handleChangeTitle} ref={quillRef} modules={modules} className="bg-white  text-gray-700 shadow border rounded" />
          {/* <input
            id="titulo"
            type="text"
            placeholder="Ingrese el título"
            className="w-full p-2 border rounded text-xs outline-none focus:ring-2 focus:ring-sky-500"
            value={nuevoItem.titulo}
            onChange={handleChangeTitle}
          /> */}
          {errores.titulo && <p className="text-red-500 text-sm">{errores.titulo}</p>}
        </div>

        <div className="flex flex-col sm:flex-col xl:flex-row mt-7 justify-between ">

          <div className="mb-4 w-[100%] sm:w-[100%]  xl:w-[39%] flex flex-col justify-between">
            <label htmlFor="fecha" className="block text-xs font-medium text-sky-500 mb-1">
              Fecha de publicación (*)
            </label>
            <div className="relative">
              <input
                id="fecha"
                type="date"
                className="w-full  p-2 h-10 border rounded text-xs outline-none focus:ring-2 focus:ring-sky-500"
                value={nuevoItem.fecha}
                onChange={handleChangeDate}
              />
              {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
            </div>
          </div>

          {storageKey === "noticias" && (
            <div className="mb-4 w-[100%] sm:w-[100%] xl:w-[59%]">
              <label htmlFor="imagen" className="block text-xs font-medium text-sky-500 mb-1">
                Imagen de portada
              </label>
              <input
                id="imagen"
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChangeImage}
                className="w-full p-2 h-10 border rounded text-xs outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errores.imagen && <p className="text-red-500 text-sm">{errores.imagen}</p>}
            </div>

          )}
        </div>
      </div>


      <div className="flex flex-col justify-between w-[100%] sm:w-[100%] xl:w-[49%] ">

        <div className="mb-0 xl:mb-4 2xl:mb-4 h-full">
          <label htmlFor="descripcion" className="block text-xs font-medium text-sky-500 mb-1">
            Descripción (*)
          </label>
          <ReactQuill value={nuevoItem.descripcion} onChange={handleChangeDescription} ref={quillRef} modules={modules} className="bg-white  text-gray-700 shadow border rounded" />
          {/* <textarea
            id="descripcion"
            placeholder="Ingrese descripción"
            className="w-full p-2 h-full sm:h-50 border rounded text-sm outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            rows={4}
            value={nuevoItem.descripcion}
            onChange={handleChangeDescription}
          /> */}
          {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion}</p>}
        </div>




        <div className="flex justify-end sm:mt-0 xl:mt-4 2xl:mt-">
          <button
            className="bg-white border border-gray-300 text-sky-500 px-6 py-2 rounded-lg hover:bg-sky-100 transition text-sm mr-4"
            onClick={() => resetFormulario()}
          >
            Cancelar
          </button>
          <button
            className="bg-sky-500 text-white px-9 py-2 rounded-lg hover:bg-sky-600 transition text-sm"
            onClick={handleSubmit}
          >
            {editando ? "Guardar Edición" : "Crear"}
          </button>
        </div>
      </div>

    </div>

  );
};

export default AdminForm;
