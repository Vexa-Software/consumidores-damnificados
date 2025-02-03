import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminForm from "../components/AdminForm";

interface Logro {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

const LogrosAdmin: React.FC = () => {
  const [logros, setLogros] = useState<Logro[]>([]);
  const [nuevoLogro, setNuevoLogro] = useState<Logro>({
    id: 0,
    titulo: "",
    descripcion: "",
    fecha: "",
  });
  const [editando, setEditando] = useState<boolean>(false);
  const [logroEditadoId, setLogroEditadoId] = useState<number | null>(null);

  const handleAgregarLogro = () => {
    if (!nuevoLogro.titulo || !nuevoLogro.descripcion || !nuevoLogro.fecha) return;
    
    const nuevosLogros = [...logros, { ...nuevoLogro, id: Date.now() }];
    setLogros(nuevosLogros);
    localStorage.setItem("logros", JSON.stringify(nuevosLogros)); // Guardar en localStorage

    setNuevoLogro({ id: 0, titulo: "", descripcion: "", fecha: "" });
};

// Modificar eliminación para actualizar localStorage
const handleEliminarLogro = (id: number) => {
    const logrosActualizados = logros.filter((logro) => logro.id !== id);
    setLogros(logrosActualizados);
    localStorage.setItem("logros", JSON.stringify(logrosActualizados));
};


const handleEditarLogro = (logro: Logro) => {
    setEditando(true);
    setLogroEditadoId(logro.id);
    setNuevoLogro(logro);
};

const handleGuardarEdicion = () => {
    const logrosActualizados = logros.map((logro) =>
        logro.id === logroEditadoId ? nuevoLogro : logro
    );

    setLogros(logrosActualizados);
    localStorage.setItem("logros", JSON.stringify(logrosActualizados)); // Guardar en localStorage

    setNuevoLogro({ id: 0, titulo: "", descripcion: "", fecha: "" });
    setEditando(false);
    setLogroEditadoId(null);
};


  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-8 max-w-3xl mx-auto w-3/4">
        <h1 className="text-3xl font-bold mb-6 text-center">Administrar Logros</h1>
        <AdminForm
          nuevoItem={nuevoLogro}
          setNuevoItem={setNuevoLogro}
          editando={editando}
          handleAgregarItem={handleAgregarLogro}
          handleGuardarEdicion={handleGuardarEdicion}
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Título</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {logros.map((logro) => (
              <tr key={logro.id} className="border">
                <td className="border p-2">{logro.titulo}</td>
                <td className="border p-2">{logro.descripcion}</td>
                <td className="border p-2">{logro.fecha}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEditarLogro(logro)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleEliminarLogro(logro.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogrosAdmin;
