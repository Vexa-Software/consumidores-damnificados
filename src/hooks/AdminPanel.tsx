import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminForm from "../components/AdminForm";
import {DataTableDemo} from "../components/Grid";
import { toast } from "react-toastify";
import { db } from "../firebase/config"; // Asegúrate de tener este archivo configurado correctamente
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";


interface Item {
    id: string;
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
        id: "",
        titulo: "",
        descripcion: "",
        fecha: "",
        imagen: "",
    });

    const [editando, setEditando] = useState<boolean>(false);
    const [itemEditadoId, setItemEditadoId] = useState<string | null>(null);

    const [errores, setErrores] = useState({ titulo: "", descripcion: "", fecha: "", imagen: "" });

    // Modales de confirmación
    const [modalEliminarOpen, setModalEliminarOpen] = useState<boolean>(false);
    const [itemAEliminar, setItemAEliminar] = useState<string | null>(null);

    const fetchItems = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, storageKey));
            const itemsData: Item[] = querySnapshot.docs.map((doc) => ({
                id: doc.id, // Firestore usa un ID string
                ...(doc.data() as Omit<Item, "id">), // Extrae los datos correctamente
            }));

            setItems(itemsData);
        } catch (error) {
            console.error("Error al obtener datos de Firestore:", error);
            toast.error("Error al obtener datos.");
        }
    };

   
    useEffect(() => {
       
        fetchItems();
    }, [storageKey]); // Se ejecuta cada vez que cambia storageKey
    
    

    // ✅ Validar campos
    const validarCampos = (): boolean => {
        let mensajesError = {
            titulo: "",
            descripcion: "",
            fecha: "",
            imagen: ""

        };

        if (nuevoItem.titulo.length < 3 || nuevoItem.titulo.length > 1000) {
            mensajesError.titulo = "El título debe tener entre 3 y 1000 caracteres";
        }
        if (nuevoItem.descripcion.length < 3 || nuevoItem.descripcion.length > 7000) {
            mensajesError.descripcion = "La descripción debe tener entre 3 y 7000 caracteres";
        }
        if (!nuevoItem.fecha) {
            mensajesError.fecha = "Debe ingresar una fecha";
        }

        if (Object.values(mensajesError).some(error => error !== "")) {
            setErrores(mensajesError);
            toast.error("Por favor, corrija los errores en el formulario");
            return false;
        }
        
        setErrores({ titulo: "", descripcion: "", fecha: "", imagen: "" });
        return true;
    };

    const handleAgregarItem = async () => {
        if (!validarCampos()) return;
    
        try {
            // 🔹 Guardar en Firestore SIN ID (Firestore genera el ID automáticamente)
            await addDoc(collection(db, storageKey), {
                titulo: nuevoItem.titulo,
                descripcion: nuevoItem.descripcion,
                fecha: nuevoItem.fecha,
                imagen: nuevoItem.imagen || "", // Si la imagen es opcional
            });
    
            // 🔹 Actualizar estado local con el ID de Firestore
           fetchItems();
            toast.success(`${title} agregado con éxito.`);
    
            // 🔹 Resetear formulario
            setNuevoItem({ id: "", titulo: "", descripcion: "", fecha: "", imagen: "" });
        } catch (error) {
            console.error("Error al agregar item:", error);
            toast.error("Hubo un error al agregar el item.");
        }
    };
    
    
    
    
    // ✅ Modal de confirmación para editar
    const handleEditarItem = (item: Item) => {
        setEditando(true);
        setItemEditadoId(item.id);
        setNuevoItem(item);
    };

    // ✅ Guardar edición
    const handleGuardarEdicion = async () => {
        if (!validarCampos() || !itemEditadoId) return;
    
        try {
            const itemRef = doc(db, storageKey, itemEditadoId);
            
            console.log("Editando el documento con ID:", itemEditadoId); // ✅ Verificar el ID
            console.log("Datos a actualizar:", nuevoItem); // ✅ Verificar datos
            
            await updateDoc(itemRef, {
                titulo: nuevoItem.titulo,
                descripcion: nuevoItem.descripcion,
                fecha: nuevoItem.fecha,
                imagen: nuevoItem.imagen || "",
            });
    
            // ✅ Actualizar el estado local correctamente
            const itemsActualizados = items.map((item) =>
                item.id === itemEditadoId ? { ...item, ...nuevoItem } : item
            );
    
            setItems(itemsActualizados);
            toast.success(`${title} editado con éxito.`);
    
            // ✅ Resetear el formulario
            setNuevoItem({ id: "", titulo: "", descripcion: "", fecha: "", imagen: "" });
            setEditando(false);
            setItemEditadoId(null);
        } catch (error) {
            console.error("Error al editar item:", error);
            toast.error("Hubo un error al editar el item.");
        }
    };
    
    

    // ✅ Modal de confirmación para eliminar
    const handleEliminarItem = (id: string) => {
        setModalEliminarOpen(true);
        setItemAEliminar(id);
    };

    const confirmarEliminar = async () => {
        if (!itemAEliminar) return;
    
        try {
            const docRef=doc(db, storageKey, itemAEliminar)
            await deleteDoc(docRef);
    
            // Filtrar el estado local
            fetchItems();
            toast.success(`${title} eliminado con éxito.`);
        } catch (error) {
            console.error("Error al eliminar item:", error);
            toast.error("Hubo un error al eliminar el ítem.");
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

<DataTableDemo/>

        </div>
    );
};

export default AdminPanel;
