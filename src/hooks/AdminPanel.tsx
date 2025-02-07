import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminForm from "../components/AdminForm";
import { toast } from "react-toastify";

interface Item {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    imagen?: string;
}

interface AdminPanelProps {
    storageKey: string; // "noticias" o "avisosJudiciales"
    title: string; // "Noticias" o "Avisos Judiciales"
}

const AdminPanel: React.FC<AdminPanelProps> = ({ storageKey, title }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [nuevoItem, setNuevoItem] = useState<Item>({
        id: 0,
        titulo: "",
        descripcion: "",
        fecha: "",
        imagen: "",
    });

    const [editando, setEditando] = useState<boolean>(false);
    const [itemEditadoId, setItemEditadoId] = useState<number | null>(null);
    const [errores, setErrores] = useState({ titulo: "", descripcion: "", fecha: "", imagen: "" });

    // Modales de confirmación
    const [modalEliminarOpen, setModalEliminarOpen] = useState<boolean>(false);
    const [itemAEliminar, setItemAEliminar] = useState<number | null>(null);

    const [modalEditarOpen, setModalEditarOpen] = useState<boolean>(false);
    const [itemAEditar, setItemAEditar] = useState<Item | null>(null);

    useEffect(() => {
        const savedItems = localStorage.getItem(storageKey);
        if (savedItems) {
            setItems(JSON.parse(savedItems));
        }
    }, [storageKey]);

    // ✅ Validar campos
    const validarCampos = (): boolean => {
        if (nuevoItem.titulo.length < 3 || nuevoItem.titulo.length > 1000) {
            toast.error("El título debe tener entre 3 y 1000 caracteres.");
            return false;
        }
        if (nuevoItem.descripcion.length < 3 || nuevoItem.descripcion.length > 7000) {
            toast.error("La descripción debe tener entre 3 y 7000 caracteres.");
            return false;
        }
        if (!nuevoItem.fecha) {
            toast.error("Debe ingresar una fecha.");
            return false;
        }
        return true;
    };



    const handleAgregarItem = (onSuccess?: () => void) => {
        if (!validarCampos()) {
            return; // Si hay errores, salimos de la función sin modificar el estado
        }
    
        // ✅ Solo si pasa la validación, agregamos la noticia
        const nuevosItems = [...items, { ...nuevoItem, id: Date.now() }];
        setItems(nuevosItems);
        localStorage.setItem(storageKey, JSON.stringify(nuevosItems));
    
        toast.success(`${title} agregado con éxito.`);
    
        // ✅ Llamar a la función `onSuccess` si se proporciona
        if (onSuccess) {
            onSuccess();
        }
    };
    
    // ✅ Modal de confirmación para editar
    const handleEditarItem = (item: Item) => {
        setModalEditarOpen(true);
        setItemAEditar(item);
    };

    const confirmarEdicion = () => {
        if (!itemAEditar) return;

        setEditando(true);
        setItemEditadoId(itemAEditar.id);
        setNuevoItem(itemAEditar);
        setModalEditarOpen(false);
    };



    // ✅ Guardar edición
    const handleGuardarEdicion = () => {
        if (!validarCampos()) return;

        const itemsActualizados = items.map((item) =>
            item.id === itemEditadoId ? nuevoItem : item
        );

        setItems(itemsActualizados);
        localStorage.setItem(storageKey, JSON.stringify(itemsActualizados));

        setNuevoItem({ id: 0, titulo: "", descripcion: "", fecha: "", imagen: "" });
        setEditando(false);
        setItemEditadoId(null);
        toast.success(`${title} editado con éxito.`);
    };


    // ✅ Modal de confirmación para eliminar
    const handleEliminarItem = (id: number) => {
        setModalEliminarOpen(true);
        setItemAEliminar(id);
    };

    const confirmarEliminar = () => {
        if (itemAEliminar !== null) {
            const itemsActualizados = items.filter((item) => item.id !== itemAEliminar);
            setItems(itemsActualizados);
            localStorage.setItem(storageKey, JSON.stringify(itemsActualizados));
            toast.success(`${title} eliminado con éxito.`);
        }
        setModalEliminarOpen(false);
        setItemAEliminar(null);
    };

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="p-8 max-w-3xl mx-auto w-3/4">
                <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
                <AdminForm
                    storageKey={storageKey}
                    nuevoItem={nuevoItem}
                    setNuevoItem={setNuevoItem}
                    editando={editando}
                    handleAgregarItem={handleAgregarItem}
                    handleGuardarEdicion={handleGuardarEdicion}
                    errores={errores}
                    setErrores={setErrores}
                    validarCampos={validarCampos}
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
                        {items.map((item) => (
                            <tr key={item.id} className="border">
                                <td className="border p-2">{item.titulo}</td>
                                <td className="border p-2">{item.descripcion}</td>
                                <td className="border p-2">{item.fecha}</td>
                                <td className="border p-2 flex justify-center gap-2">
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEditarItem(item)}>Editar</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleEliminarItem(item.id)}>Eliminar</button>
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

export default AdminPanel;
