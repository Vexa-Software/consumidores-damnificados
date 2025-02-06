import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminForm from "../components/AdminForm";

interface AvisosJudiciales {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

const AvisosJudicialesAdmin: React.FC = () => {
  const [avisosJudiciales, setAvisosJudiciales] = useState<AvisosJudiciales[]>([]);
  const [nuevoAvisosJudiciales, setNuevoAvisosJudiciales] = useState<AvisosJudiciales>({
    id: 0,
    titulo: "",
    descripcion: "",
    fecha: "",
  });
  const [editando, setEditando] = useState<boolean>(false);
  const [avisosJudicialesEditadoId, setAvisosJudicialesEditadoId] = useState<number | null>(null);

  const handleAgregarAvisosJudiciales = () => {
    if (!nuevoAvisosJudiciales.titulo || !nuevoAvisosJudiciales.descripcion || !nuevoAvisosJudiciales.fecha) return;
    
    const nuevosAvisosJudiciales = [...avisosJudiciales, { ...nuevoAvisosJudiciales, id: Date.now() }];
    setAvisosJudiciales(nuevosAvisosJudiciales);
    localStorage.setItem("avisos-judiciales", JSON.stringify(nuevosAvisosJudiciales));

    setNuevoAvisosJudiciales({ id: 0, titulo: "", descripcion: "", fecha: "" });
  };

  const handleEliminarAvisosJudiciales = (id: number) => {
    const avisosJudicialesActualizados = avisosJudiciales.filter((avisosJudiciales) => avisosJudiciales.id !== id);
    setAvisosJudiciales(avisosJudicialesActualizados);
    localStorage.setItem("avisos-judiciales", JSON.stringify(avisosJudicialesActualizados));
  };

  const handleEditarAvisosJudiciales = (avisosJudiciales: AvisosJudiciales) => {
    setEditando(true);
    setAvisosJudicialesEditadoId(avisosJudiciales.id);
    setNuevoAvisosJudiciales(avisosJudiciales);
  };

  const handleGuardarEdicion = () => {
    const avisosJudicialesActualizados = avisosJudiciales.map((avisosJudiciales) =>
      avisosJudiciales.id === avisosJudicialesEditadoId ? nuevoAvisosJudiciales : avisosJudiciales
    );

    setAvisosJudiciales(avisosJudicialesActualizados);
    localStorage.setItem("avisos-judiciales", JSON.stringify(avisosJudicialesActualizados));

    setNuevoAvisosJudiciales({ id: 0, titulo: "", descripcion: "", fecha: "" });
    setEditando(false);
    setAvisosJudicialesEditadoId(null);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <AdminSidebar />
      <div className="p-4 sm:p-8 w-full sm:w-3/4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center"> Avisos Judiciales</h1>
        <AdminForm
          nuevoItem={nuevoAvisosJudiciales}
          setNuevoItem={setNuevoAvisosJudiciales}
          editando={editando}
          handleAgregarItem={handleAgregarAvisosJudiciales}
          handleGuardarEdicion={handleGuardarEdicion}
        />
        <table className="w-full border-collapse border border-gray-300 text-xs ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Título</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {avisosJudiciales.map((avisosJudiciales) => (
              <tr key={avisosJudiciales.id} className="border">
                <td className="border p-2">{avisosJudiciales.titulo}</td>
                <td className="border p-2">{avisosJudiciales.descripcion}</td>
                <td className="border p-2">{avisosJudiciales.fecha}</td>
                <td className="border p-2 flex flex-wrap justify-center gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs "
                    onClick={() => handleEditarAvisosJudiciales(avisosJudiciales)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs "
                    onClick={() => handleEliminarAvisosJudiciales(avisosJudiciales.id)}
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

export default AvisosJudicialesAdmin;

