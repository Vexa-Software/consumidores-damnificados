import React, { useRef, useState } from "react";

interface AdminFormProps {
  storageKey: string;
  nuevoItem: { titulo: string; descripcion: string; fecha: string; imagen?: string };
  setNuevoItem: (item: any) => void;
  editando: boolean;
  setEditando: (editando: any) => void;
  handleGuardarEdicion: () => void; // ✅ Debe estar definido aquí
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
  handleGuardarEdicion, // ✅ Ahora está correctamente definido
  handleAgregarItem,
  errores,
  setErrores,
  validarCampos,
}) => {

  // ✅ Ref para resetear el input de archivo
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // ✅ Manejo de subida de imagen (SOLO si es noticia)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (storageKey !== "noticias") return; // Solo permitir si es noticia

    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrores((prev: any) => ({ ...prev, imagen: "Formato inválido. Solo JPG, JPEG o PNG." }));
        return;
      }
      if (file.size > maxSize) {
        setErrores((prev: any) => ({ ...prev, imagen: "La imagen no puede superar los 5MB." }));
        return;
      }

      setErrores((prev: any) => ({ ...prev, imagen: "" }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoItem({ ...nuevoItem, imagen: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (editando) {
      handleGuardarEdicion(); // ✅ Guardar edición sin preguntar
      resetFormulario(true); // ✅ No preguntar al guardar
    } else {
      if (!validarCampos()) return;
      handleAgregarItem();
      resetFormulario();
    }
  };

  const resetFormulario = (forceReset = false) => {
    if (!forceReset && editando && isDirty) {
      const confirmCancel = window.confirm("Tienes cambios sin guardar. ¿Seguro que quieres cancelar?");
      if (!confirmCancel) return; // ❌ Si el usuario cancela, no hacemos nada
    }

    setNuevoItem({ id: "", titulo: "", descripcion: "", fecha: "", imagen: "" });
    setEditando(false);
    setIsDirty(false); // ✅ Resetear "dirty"
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoItem({ ...nuevoItem, titulo: e.target.value });
    setErrores((prev: any) => ({ ...prev, titulo: "" }));
    setIsDirty(true);  // ✅ Detecta cambios en el formulario
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNuevoItem({ ...nuevoItem, descripcion: e.target.value });
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
      {/* Contenedor principal */}
      <div className=" w-[100%] sm:w-[100%] xl:w-[49%]">
        {/* Título */}
        <div className="mb-4 flex flex-col justify-between ">
          <label htmlFor="titulo" className="block text-xs font-medium text-sky-500 mb-1">
            Título (*)
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Ingrese el título"
            className="w-full p-2 border rounded text-xs outline-none focus:ring-2 focus:ring-sky-500"
            value={nuevoItem.titulo}
            onChange={handleChangeTitle}
          />
          {errores.titulo && <p className="text-red-500 text-sm">{errores.titulo}</p>}
        </div>

        <div className="flex flex-col sm:flex-col xl:flex-row mt-7 justify-between ">
          {/* Fecha de publicación */}
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
          {/* Input para subir imagen (SOLO si es noticia) */}
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
        {/* Descripción */}
        <div className="mb-0 xl:mb-4 2xl:mb-4 h-full">
          <label htmlFor="descripcion" className="block text-xs font-medium text-sky-500 mb-1">
            Descripción (*)
          </label>
          <textarea
            id="descripcion"
            placeholder="Ingrese descripción"
            className="w-full p-2 h-full sm:h-50 border rounded text-sm outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            rows={4}
            value={nuevoItem.descripcion}
            onChange={handleChangeDescription}
          />
          {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion}</p>}
        </div>



        {/* Botones de acción alineados al final */}
        <div className="flex justify-end sm:mt-0 xl:mt-4 2xl:mt-">
          <button
            className="bg-white border border-gray-300 text-sky-500 px-6 py-2 rounded-lg hover:bg-sky-100 transition text-sm mr-4"
            onClick={() => resetFormulario()} // ✅ Ahora solo pregunta en "Cancelar"
          >
            Cancelar
          </button>
          <button
            className="bg-sky-500 text-white px-9 py-2 rounded-lg hover:bg-sky-600 transition text-sm"
            onClick={handleSubmit} // ✅ Guardar no pregunta si es "dirty"
          >
            {editando ? "Guardar Edición" : "Crear"}
          </button>
        </div>
      </div>

    </div>

  );
};

export default AdminForm;
