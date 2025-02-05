import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminForm from "../components/AdminForm";

interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    imagen?: string; // Nueva propiedad para almacenar la imagen
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

    useEffect(() => {
        const noticiasGuardadas = localStorage.getItem("noticias");
        if (noticiasGuardadas) {
            setNoticias(JSON.parse(noticiasGuardadas));
        }
    }, []);

    // Manejo de subida de imagen
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.type)) {
                alert("Solo se permiten imágenes en formato JPG, JPEG o PNG.");
                return;
            }
            if (file.size > maxSize) {
                alert("El tamaño máximo permitido es de 5MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaNoticia({ ...nuevaNoticia, imagen: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAgregarNoticia = () => {
        if (!nuevaNoticia.titulo || !nuevaNoticia.descripcion || !nuevaNoticia.fecha) return;

        const nuevasNoticias = [...noticias, { ...nuevaNoticia, id: Date.now() }];
        nuevasNoticias.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setNoticias(nuevasNoticias);
        localStorage.setItem("noticias", JSON.stringify(nuevasNoticias));

        setNuevaNoticia({ id: 0, titulo: "", descripcion: "", fecha: "", imagen: "" });
    };

    const handleEliminarNoticia = (id: number) => {
        const noticiasActualizadas = noticias.filter((noticia) => noticia.id !== id);
        setNoticias(noticiasActualizadas);
        localStorage.setItem("noticias", JSON.stringify(noticiasActualizadas));
    };

    const handleEditarNoticia = (noticia: Noticia) => {
        setEditando(true);
        setNoticiaEditadaId(noticia.id);
        setNuevaNoticia(noticia);
    };

    const handleGuardarEdicion = () => {
        const noticiasActualizadas = noticias.map((noticia) =>
            noticia.id === noticiaEditadaId ? nuevaNoticia : noticia
        );

        setNoticias(noticiasActualizadas);
        localStorage.setItem("noticias", JSON.stringify(noticiasActualizadas));

        setNuevaNoticia({ id: 0, titulo: "", descripcion: "", fecha: "", imagen: "" });
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

                {/* Input para subir imagen */}
                <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} className="mb-2" />
                {nuevaNoticia.imagen && (
                    <img src={nuevaNoticia.imagen} alt="Vista previa" className="w-full h-auto mb-2 rounded-lg" />
                )}

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Título</th>
                            <th className="border p-2">Contenido</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Imagen</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticias.map((noticia) => (
                            <tr key={noticia.id} className="border">
                                <td className="border p-2">{noticia.titulo}</td>
                                <td className="border p-2">{noticia.descripcion}</td>
                                <td className="border p-2">{noticia.fecha}</td>
                                <td className="border p-2">
                                    {noticia.imagen && <img src={noticia.imagen} alt="Noticia" className="w-16 h-16 rounded-lg" />}
                                </td>
                                <td className="border p-2 flex justify-center gap-2">
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEditarNoticia(noticia)}>Editar</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => handleEliminarNoticia(noticia.id)}>Eliminar</button>
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

