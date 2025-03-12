import React, { useRef, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import imageCompression from 'browser-image-compression';
import ConfirmAlert from "@/components/ConfirmAlert";
import { toast } from "react-toastify";
import CustomQuillEditor, { convertQuillToTailwind, convertTailwindToQuill } from "./CustomQuillEditor";
import { ExplicitAny } from "@/types/ExplicitAny";
import { Timestamp } from "firebase/firestore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface AdminFormProps {
  storageKey: string;
  nuevoItem: { titulo: string; descripcion: string; fecha: Timestamp | string; imagen?: string };
  setNuevoItem: (item: ExplicitAny) => void;
  editando: boolean;
  setEditando: (editando: ExplicitAny) => void;
  handleGuardarEdicion: () => void;
  handleAgregarItem: () => void;
  errores: { titulo: string; descripcion: string; fecha: string; imagen: string };
  setErrores: (errores: ExplicitAny) => void;
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

  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (storageKey !== "noticias") return;

    const file = event.target.files?.[0];
    if (!file) return;
    console.log(`📂 Tamaño original: ${(file.size / 1024).toFixed(2)} KB`);

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrores((prev: ExplicitAny) => ({ ...prev, imagen: "Formato inválido. Solo JPG, JPEG o PNG." }));
      return;
    }
    if (file.size > maxSize) {
      setErrores((prev: ExplicitAny) => ({ ...prev, imagen: "La imagen no puede superar los 5MB." }));
      return;
    }

    setErrores((prev: ExplicitAny) => ({ ...prev, imagen: "" }));

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("Debes iniciar sesión para subir imágenes.");
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


      toast.success("Imagen subida correctamente");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast.error("Error al subir la imagen");
      setErrores((prev: ExplicitAny) => ({ ...prev, imagen: "Error al subir la imagen." }));
    }
  };


  const resetFormulario = (forceReset = false, fromSuccessfulSave = false) => {
    if (!forceReset && isDirty && !fromSuccessfulSave) {
      setShowConfirmReset(true);
      return;
    }

    setNuevoItem({ id: "", titulo: "", descripcion: "", fecha: "", imagen: "" });
    setEditando(false);
    setIsDirty(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (editando) {
      handleGuardarEdicion();
      resetFormulario(false, true);
    } else {
      if (!validarCampos()) return;
      handleAgregarItem();
      resetFormulario(false, true);
    }
  };

  const handleChangeTitle = (value: string) => {
    setNuevoItem((prevItem: ExplicitAny) => ({
      ...prevItem,
      titulo: value
    }));
    setErrores((prev: ExplicitAny) => ({ ...prev, titulo: "" }));
    setIsDirty(true);
  };

  const handleChangeDescription = (value: string) => {
    const formattedValue = convertQuillToTailwind(value);
    setNuevoItem((prevItem: { titulo: string; descripcion: string; fecha: string; imagen?: string }) => ({
        ...prevItem,
        descripcion: formattedValue
    }));
    setErrores((prev: { titulo: string; descripcion: string; fecha: string; imagen: string }) => ({ ...prev, descripcion: "" }));
    setIsDirty(true);
  };

  const handleChangeDate = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setNuevoItem({ ...nuevoItem, fecha: newValue.format('YYYY-MM-DD') });
    }
    setErrores((prev: ExplicitAny) => ({ ...prev, fecha: "" }));
    setIsDirty(true);
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleImageUpload(e);
    setErrores((prev: ExplicitAny) => ({ ...prev, imagen: "" }));
    setIsDirty(true);
  };


  return (
    <>
      <div className="mb-6 bg-white w-full  rounded-lg flex flex-col  xl:flex-row justify-between sm:h-auto">

        <div className=" w-[100%] sm:w-[100%] xl:w-[49%]">

        <div className="mb-4 flex flex-col justify-between ">
          <label htmlFor="titulo" className="block text-xs font-medium text-sky-500 mb-1">
            Título (*)
          </label>
          <CustomQuillEditor value={nuevoItem.titulo} onChange={handleChangeTitle} />
          {errores.titulo && <p className="text-red-500 text-sm">{errores.titulo}</p>}
        </div>

        <div className="flex flex-col sm:flex-col xl:flex-row mt-7 justify-between ">
            <div className="mb-4 w-[100%] sm:w-[100%]  xl:w-[39%] flex flex-col justify-between">
              <label htmlFor="fecha" className="block text-xs font-medium text-sky-500 mb-1">
                Fecha de publicación (*)
              </label>
              <div className="relative">
                <DatePicker
                  value={dayjs(typeof nuevoItem.fecha === 'string' ? nuevoItem.fecha : nuevoItem.fecha.toDate())}
                  onChange={handleChangeDate}
                  format="DD/MM/YYYY"
                  className="w-full"
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errores.fecha,
                      helperText: errores.fecha
                    }
                  }}
                />
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
            <CustomQuillEditor value={convertTailwindToQuill(nuevoItem.descripcion)} onChange={handleChangeDescription} />
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

      <ConfirmAlert
        isOpen={showConfirmReset}
        title="Confirmar cancelación"
        message="Tienes cambios sin guardar. ¿Seguro que quieres cancelar?"
        confirmText="Sí, cancelar"
        cancelText="No, continuar editando"
        onConfirm={() => {
          setShowConfirmReset(false);
          resetFormulario(true);
        }}
        onCancel={() => setShowConfirmReset(false)}
      />
    </>
  );
};

export default AdminForm;
