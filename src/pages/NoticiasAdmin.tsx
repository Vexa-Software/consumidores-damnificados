import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminForm from "../components/AdminForm";

interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
}

const NoticiasAdmin: React.FC = () => {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [nuevaNoticia, setNuevaNoticia] = useState<Noticia>({
        id: 0,
        titulo: "",
        descripcion: "",
        fecha: "",
    });
    const [editando, setEditando] = useState<boolean>(false);
    const [noticiaEditadaId, setNoticiaEditadaId] = useState<number | null>(null);

    const handleAgregarNoticia = () => {
        if (!nuevaNoticia.titulo || !nuevaNoticia.descripcion || !nuevaNoticia.fecha) return;

        const nuevasNoticias = [...noticias, { ...nuevaNoticia, id: Date.now() }];
        setNoticias(nuevasNoticias);
        localStorage.setItem("noticias", JSON.stringify(nuevasNoticias)); // Guardar en localStorage

        setNuevaNoticia({ id: 0, titulo: "", descripcion: "", fecha: "" });
    };

    // Modificar eliminación para actualizar localStorage
    const handleEliminarNoticia = (id: number) => {
        const noticiasActualizadas = noticias.filter((noticia) => noticia.id !== id);
        setNoticias(noticiasActualizadas);
        localStorage.setItem("noticias", JSON.stringify(noticiasActualizadas));
    };


    const handleEditarNoticia = (noticia: Noticia) => {
        setEditando(true);
        setNoticiaEditadaId(noticia.id);
        setNuevaNoticia(noticia); // Esto es correcto
    };
    
    const handleGuardarEdicion = () => {
        const noticiasActualizadas = noticias.map((noticia) => 
            noticia.id === noticiaEditadaId ? nuevaNoticia : noticia
        );
    
        setNoticias(noticiasActualizadas);
        localStorage.setItem("noticias", JSON.stringify(noticiasActualizadas)); // Guardar cambios en localStorage
    
        setNuevaNoticia({ id: 0, titulo: "", descripcion: "", fecha: "" });
        setEditando(false);
        setNoticiaEditadaId(null);
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
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                        onClick={() => handleEditarNoticia(noticia)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleEliminarNoticia(noticia.id)}
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

export default NoticiasAdmin;
