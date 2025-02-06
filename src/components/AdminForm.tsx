import React from "react";

interface AdminFormProps {
  nuevoItem: { titulo: string; descripcion: string; fecha: string };
  setNuevoItem: (item: any) => void;
  editando: boolean;
  handleGuardarEdicion: () => void;
  handleAgregarItem: () => void;
  
}

const AdminForm: React.FC<AdminFormProps> = ({
  nuevoItem,
  setNuevoItem,
  editando,
  handleGuardarEdicion,
  handleAgregarItem,
}) => {
  return (
    <div className="mb-6 p-4 border rounded-lg shadow-md bg-white w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Título"
        className="w-full mb-2 p-2 border rounded text-sm "
        value={nuevoItem.titulo}
        onChange={(e) => setNuevoItem({ ...nuevoItem, titulo: e.target.value })}
      />
      <textarea
        placeholder="Descripción"
        className="w-full mb-2 p-2 border rounded text-sm "
        value={nuevoItem.descripcion}
        onChange={(e) => setNuevoItem({ ...nuevoItem, descripcion: e.target.value })}
      />
      <input
        type="date"
        className="w-full mb-2 p-2 border rounded text-sm "
        value={nuevoItem.fecha}
        onChange={(e) => setNuevoItem({ ...nuevoItem, fecha: e.target.value })}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full text-sm "
        onClick={editando ? handleGuardarEdicion : handleAgregarItem}
      >
        {editando ? "Guardar Edición" : "Agregar"}
      </button>
    </div>
  );
};

export default AdminForm;
