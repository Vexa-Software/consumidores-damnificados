import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminForm from "../components/AdminForm";
import { toast } from "react-toastify";

interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    imagen?: string;
}

const NoticiasAdmin: React.FC = () => {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [nuevaNoticia, setNuevaNoticia] = useState<Noticia>({
        id: 0,
        titulo: "",
        descripcion: "",
        fecha: "",
        imagen: "",
    });
    const [editando, setEditando] = useState<boolean>(false);
    const [noticiaEditadaId, setNoticiaEditadaId] = useState<number | null>(null);

    // Modales para eliminar y editar
    const [modalEliminarOpen, setModalEliminarOpen] = useState<boolean>(false);
    const [noticiaAEliminar, setNoticiaAEliminar] = useState<number | null>(null);

    const [modalEditarOpen, setModalEditarOpen] = useState<boolean>(false);
    const [noticiaAEditar, setNoticiaAEditar] = useState<Noticia | null>(null);

    // Estados de errores
    const [errores, setErrores] = useState({
        titulo: "",
        descripcion: "",
        fecha: "",
        imagen: "",
    });

    useEffect(() => {
        const noticiasGuardadas = localStorage.getItem("noticias");
        if (noticiasGuardadas) {
            setNoticias(JSON.parse(noticiasGuardadas));
        }
    }, []);

    //  Función para validar campos
    const validarCampos = (): boolean => {
        let esValido = true;
        const nuevosErrores = { titulo: "", descripcion: "", fecha: "", imagen: "" };

        if (nuevaNoticia.titulo.length < 3 || nuevaNoticia.titulo.length > 1000) {
            nuevosErrores.titulo = "El título debe tener entre 3 y 1000 caracteres.";
            esValido = false;
        }
        if (nuevaNoticia.descripcion.length < 3 || nuevaNoticia.descripcion.length > 7000) {
            nuevosErrores.descripcion = "La descripción debe tener entre 3 y 7000 caracteres.";
            esValido = false;
        }
        if (!nuevaNoticia.fecha) {
            nuevosErrores.fecha = "Debe ingresar una fecha.";
            esValido = false;
        }

        setErrores(nuevosErrores);
        return esValido;
    };

    //  Función para agregar noticia
    const handleAgregarNoticia = () => {
        if (!validarCampos()) {
            toast.error("Corrige los errores antes de guardar.");
            return;
        }

        const nuevasNoticias = [...noticias, { ...nuevaNoticia, id: Date.now() }];
        nuevasNoticias.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setNoticias(nuevasNoticias);
        localStorage.setItem("noticias", JSON.stringify(nuevasNoticias));

        setNuevaNoticia({ id: 0, titulo: "", descripcion: "", fecha: "", imagen: "" });
        toast.success("Noticia agregada con éxito");
    };

    //  Mostrar modal de confirmación antes de editar
    const handleEditarNoticia = (noticia: Noticia) => {
        setModalEditarOpen(true);
        setNoticiaAEditar(noticia);
    };

    //  Confirmar edición de noticia
    const confirmarEdicion = () => {
        if (!noticiaAEditar) return;

        setEditando(true);
        setNoticiaEditadaId(noticiaAEditar.id);
        setNuevaNoticia(noticiaAEditar);
        setModalEditarOpen(false);
    };

    //  Guardar la edición de la noticia
    const handleGuardarEdicion = () => {
        if (!validarCampos()) {
            toast.error("Corrige los errores antes de guardar.");
            return;
        }

        const noticiasActualizadas = noticias.map((noticia) =>
            noticia.id === noticiaEditadaId ? nuevaNoticia : noticia
        );

        setNoticias(noticiasActualizadas);
        localStorage.setItem("noticias", JSON.stringify(noticiasActualizadas));

        setNuevaNoticia({ id: 0, titulo: "", descripcion: "", fecha: "", imagen: "" });
        setEditando(false);
        setNoticiaEditadaId(null);
        toast.success("Noticia editada con éxito");
    };

    //  Mostrar modal de confirmación antes de eliminar
    const handleEliminarNoticia = (id: number) => {
        setModalEliminarOpen(true);
        setNoticiaAEliminar(id);
    };

    //  Confirmar eliminación de noticia
    const confirmarEliminar = () => {
        if (noticiaAEliminar !== null) {
            const noticiasActualizadas = noticias.filter((noticia) => noticia.id !== noticiaAEliminar);
            setNoticias(noticiasActualizadas);
            localStorage.setItem("noticias", JSON.stringify(noticiasActualizadas));
            toast.success("Noticia eliminada con éxito");
        }
        setModalEliminarOpen(false);
        setNoticiaAEliminar(null);
    };

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="p-8 max-w-3xl mx-auto w-3/4">
                <h1 className="text-3xl font-bold mb-6 text-center">Administrar Noticias</h1>
                <AdminForm
                    nuevoItem={nuevaNoticia}
                    setNuevoItem={setNuevaNoticia}
                    editando={editando}
                    handleAgregarItem={handleAgregarNoticia}
                    handleGuardarEdicion={handleGuardarEdicion}
                />

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Título</th>
                            <th className="border p-2">Contenido</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticias.map((noticia) => (
                            <tr key={noticia.id} className="border">
                                <td className="border p-2">{noticia.titulo}</td>
                                <td className="border p-2">{noticia.descripcion}</td>
                                <td className="border p-2">{noticia.fecha}</td>
                                <td className="border p-2 flex justify-center gap-2">
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEditarNoticia(noticia)}>Editar</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => handleEliminarNoticia(noticia.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Confirmación para eliminar */}
            {modalEliminarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-lg font-bold mb-4">¿Estás seguro de eliminar esta noticia?</p>
                        <div className="flex flex-row justify-evenly">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setModalEliminarOpen(false)}>Cancelar</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmarEliminar}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación para editar */}
            {modalEditarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg ">
                        <p className="text-lg font-bold mb-4">¿Quieres editar esta noticia?</p>
                        <div className="flex flex-row justify-evenly">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setModalEditarOpen(false)}>Cancelar</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={confirmarEdicion}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoticiasAdmin;
