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
        <div className="flex flex-col sm:flex-row">
            <AdminSidebar />
            <div className="p-4 sm:p-8 w-full sm:w-3/4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Noticias</h1>
                <AdminForm
                    nuevoItem={nuevaNoticia}
                    setNuevoItem={setNuevaNoticia}
                    editando={editando}
                    handleAgregarItem={handleAgregarNoticia}
                    handleGuardarEdicion={handleGuardarEdicion}
                />

                {/* Input para subir imagen */}
                <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} className="mb-2 text-xs " />
                {nuevaNoticia.imagen && (
                    <img src={nuevaNoticia.imagen} alt="Vista previa" className="w-full  h-auto mb-2 rounded-lg " />
                )}

               <div className="overflow-x-auto w-full">
  <table className="w-full table-fixed border-collapse border border-gray-300 text-xs ">
    <thead>
      <tr className="bg-gray-200">
        <th className="border py-2 w-1/6">Título</th>
        <th className="border py-2 w-2/6">Descripción</th>
        <th className="border py-2 w-1/6">Fecha</th>
        <th className="border py-2 w-1/6">Imagen</th>
        <th className="border py-2 w-1/6">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {noticias.map((noticia) => (
        <tr key={noticia.id} className="border">
          <td className="border p-1 truncate max-w-[100px]">{noticia.titulo}</td>
          <td className="border p-1 max-w-[250px] sm:max-w-[400px] truncate">
            <p className="overflow-hidden line-clamp-3">{noticia.descripcion}</p>
          </td>
          <td className="border p-1">{noticia.fecha}</td>
          <td className="border p-1 ">
            {noticia.imagen && (
              <img src={noticia.imagen} alt="Noticia" className=" w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover " />
            )}
          </td>
          <td className="border p-2 flex flex-wrap justify-center gap-2">
            <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs " onClick={() => handleEditarNoticia(noticia)}>
              Editar
            </button>
            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs " onClick={() => handleEliminarNoticia(noticia.id)}>
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            </div>
        </div>
    );
};

export default NoticiasAdmin;

