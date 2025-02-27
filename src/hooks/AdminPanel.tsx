import React, { useState, useEffect } from "react";
import AdminForm from "../components/AdminForm";
import { DataTableDemo } from "../components/Grid";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";


interface Item {
    id: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    imagen?: string;
}

interface AdminPanelProps {
    storageKey: string;
    title: string;
    subtitle:string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ storageKey, title, subtitle }) => {
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


    const [modalEliminarOpen, setModalEliminarOpen] = useState<boolean>(false);
    const [itemAEliminar, setItemAEliminar] = useState<string | null>(null);

    const fetchItems = async () => {
        try {
            const q = query(collection(db, storageKey), orderBy("fecha", "desc"));
            const querySnapshot = await getDocs(q);
            const itemsData: Item[] = querySnapshot.docs.map((doc) => ({
                id: doc.id, 
                ...(doc.data() as Omit<Item, "id">), 
            }));


            setItems(itemsData);
        } catch (error) {
            console.error("Error al obtener datos de Firestore:", error);
            toast.error("Error al obtener datos.");
        }
    };


    useEffect(() => {

        fetchItems();
    }, [storageKey]); 



    
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
           
            await addDoc(collection(db, storageKey), {
                titulo: nuevoItem.titulo,
                descripcion: nuevoItem.descripcion,
                fecha: nuevoItem.fecha,
                imagen: nuevoItem.imagen || "", 
            });

          
            fetchItems();
            toast.success(`${title} agregado con éxito.`);

       
            setNuevoItem({ id: "", titulo: "", descripcion: "", fecha: "", imagen: "" });
        } catch (error) {
            console.error("Error al agregar item:", error);
            toast.error("Hubo un error al agregar el item.");
        }
    };




   
    const handleEditarItem = (item: Item) => {
        setEditando(true);
        setItemEditadoId(item.id);
        setNuevoItem(item);
    };

   
    const handleGuardarEdicion = async () => {
        if (!validarCampos() || !itemEditadoId) return;

        try {
            const itemRef = doc(db, storageKey, itemEditadoId);

            console.log("Editando el documento con ID:", itemEditadoId); 
            console.log("Datos a actualizar:", nuevoItem);

            await updateDoc(itemRef, {
                titulo: nuevoItem.titulo,
                descripcion: nuevoItem.descripcion,
                fecha: nuevoItem.fecha,
                imagen: nuevoItem.imagen || "",
            });

           
            const itemsActualizados = items.map((item) =>
                item.id === itemEditadoId ? { ...item, ...nuevoItem } : item
            );

            setItems(itemsActualizados);
            toast.success(`${title} editado con éxito.`);

           
            setNuevoItem({ id: "", titulo: "", descripcion: "", fecha: "", imagen: "" });
            setEditando(false);
            setItemEditadoId(null);
        } catch (error) {
            console.error("Error al editar item:", error);
            toast.error("Hubo un error al editar el item.");
        }
    };



    
    const handleEliminarItem = (id: string) => {
        setModalEliminarOpen(true);
        setItemAEliminar(id);
    };

    const confirmarEliminar = async () => {
        if (!itemAEliminar) return;

        try {
            const docRef = doc(db, storageKey, itemAEliminar)
            await deleteDoc(docRef);

            
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
        <div className="flex h-screen px-4">       
        <div className="flex flex-col flex-grow h-screen  max-w-[100%]">
            <div className=" flex-grow pb-8 px-4 ">
                <h1 className="text-3xl sm:text-5xl text-sky-500 font-normal mb-2 xl:mb-4 text-start">{title}</h1>
                <p className="text-lg sm:text-xl text-sky-500 font-light mb-4 xl:mb-10 text-start">{subtitle}</p>

               
                <AdminForm
                    storageKey={storageKey}
                    nuevoItem={nuevoItem}
                    setNuevoItem={setNuevoItem}
                    editando={editando}
                    setEditando={setEditando}
                    handleAgregarItem={handleAgregarItem}
                    handleGuardarEdicion={handleGuardarEdicion}
                    errores={errores}
                    setErrores={setErrores}
                    validarCampos={validarCampos}
                />

               
                <div className=" max-h-[500px]">
                    <DataTableDemo
                        data={items}
                        onEdit={handleEditarItem}
                        onDelete={handleEliminarItem}
                        storageKey={storageKey}
                    />
                </div>
            </div>

           
        </div>

      
        {modalEliminarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg">
                    <p className="text-lg font-bold mb-4">¿Estás seguro de eliminar esta noticia?</p>
                    <div className="flex flex-row justify-evenly">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setModalEliminarOpen(false)}>Cancelar</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmarEliminar}>Confirmar</button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
};

export default AdminPanel;
