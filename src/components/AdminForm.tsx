import React, { useRef } from "react";

interface AdminFormProps {
  storageKey: string;
  nuevoItem: { titulo: string; descripcion: string; fecha: string; imagen?: string };
  setNuevoItem: (item: any) => void;
  editando: boolean;
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
  handleGuardarEdicion, // ✅ Ahora está correctamente definido
  handleAgregarItem,
  errores,
  setErrores,
  validarCampos,
}) => {

  // ✅ Ref para resetear el input de archivo
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      handleGuardarEdicion(); // Llamamos la función directamente
      resetFormulario(); // Solo se ejecuta después de editar
    } else {

      if(!validarCampos()){
        return;
      }
      handleAgregarItem(); // Llamamos la función directamente
      resetFormulario();
    }
  };

  const resetFormulario = () => {
    setNuevoItem({ id: 0, titulo: "", descripcion: "", fecha: "", imagen: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 🔵 Resetear input de imagen
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoItem({ ...nuevoItem, titulo: e.target.value });
    setErrores((prev: any) => ({ ...prev, titulo: "" }));
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNuevoItem({ ...nuevoItem, descripcion: e.target.value });
    setErrores((prev: any) => ({ ...prev, descripcion: "" }));
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoItem({ ...nuevoItem, fecha: e.target.value });
    setErrores((prev: any) => ({ ...prev, fecha: "" }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e);
    setErrores((prev: any) => ({ ...prev, imagen: "" }));
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow-md bg-white w-full max-w-md mx-auto">

      <div className="mb-4">
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          id="titulo"
          type="text"
          placeholder="Título"
          className="w-full mb-2 p-2 border rounded text-sm"
          value={nuevoItem.titulo}
          onChange={handleChangeTitle}
        />
        {errores.titulo && <p className="text-red-500 text-sm">{errores.titulo}</p>}
      </div>


      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          placeholder="Descripción"
          className="w-full mb-2 p-2 border rounded text-sm "
          value={nuevoItem.descripcion}
          onChange={handleChangeDescription}
        />
        {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion}</p>}
      </div>


      <div className="mb-4">
        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha
        </label>
        <input
          id="fecha"
          type="date"
          className="w-full mb-2 p-2 border rounded text-sm"
          value={nuevoItem.fecha}
          onChange={handleChangeDate}
        />

        {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
      </div>

      {/* Input para subir imagen (SOLO si es noticia) */}
      {storageKey === "noticias" && (
        <div className="mb-4">
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
            Imagen
          </label>
          <input
            id="imagen"
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleChangeImage}
            className="w-full mb-2 p-2 border rounded text-sm"
          />
          {errores.imagen && <p className="text-red-500 text-sm">{errores.imagen}</p>}
        </div>
      )}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full text-sm"
        onClick={handleSubmit} // Usar la nueva función que maneja la limpieza del formulario
      >
        {editando ? "Guardar Edición" : "Agregar"}
      </button>
    </div>
  );
};

export default AdminForm;
