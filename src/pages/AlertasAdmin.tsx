import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import AdminSidebar from '@/components/AdminSidebar';
import imageCompression from "browser-image-compression";


const AlertasAdmin: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [activo, setActivo] = useState(false);
  const [alertas, setAlertas] = useState<any[]>([]);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [imagenUrl, setImagenUrl] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  useEffect(() => {
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    try {
      const alertasRef = collection(db, 'alertas');
      const querySnapshot = await getDocs(query(alertasRef));
      const alertasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlertas(alertasData);
    } catch (error) {
      console.error('Error al cargar alertas:', error);
      toast.error('Error al cargar las alertas');
    }
  };

  
  const subirImagen = async (): Promise<string | null> => {
    if (!archivo) return null;
  
    try {
      setCargando(true);
  
      console.log(`📂 Tamaño original: ${(archivo.size / 1024).toFixed(2)} KB`);
  
      
      const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 800, 
        useWebWorker: true,
      };
  
      console.log("⏳ Comenzando compresión...");
      const compressedFile = await imageCompression(archivo, options);
      console.log(`📉 Tamaño después de compresión: ${(compressedFile.size / 1024).toFixed(2)} KB`);
  
      const storageRef = ref(storage, `alertas/${compressedFile.name}`);
      await uploadBytes(storageRef, compressedFile);
      const imageUrl = await getDownloadURL(storageRef);
      
      console.log("✅ Imagen comprimida y subida con éxito:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("❌ Error al subir la imagen:", error);
      toast.error("Error al subir la imagen.");
      return null;
    } finally {
      setCargando(false);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCargando(true);
  
      let imageUrl = archivo ? await subirImagen() : null;
      console.log("🔗 URL de imagen final:", imageUrl);
  
      if (activo) {
        for (const alerta of alertas) {
          if (alerta.activo) {
            await updateDoc(doc(db, "alertas", alerta.id), { activo: false });
          }
        }
      }
  
      await addDoc(collection(db, "alertas"), {
        titulo,
        contenido,
        imagen: imageUrl || "",
        activo,
        fechaCreacion: new Date(),
      });
  
      toast.success("✅ Alerta creada exitosamente");
      setTitulo("");
      setContenido("");
      setArchivo(null);
      setImagenUrl(null);
      setActivo(false);
      cargarAlertas();
    } catch (error) {
      console.error("❌ Error al crear alerta:", error);
      toast.error("Error al crear la alerta");
    } finally {
      setCargando(false);
    }
  };
  

  return (
    <div className='flex px-4'>
      <AdminSidebar />
      <div className="py-8 px-4 max-w-[100%] sm:max-w-[75%] xl:sm:max-w-[85%]">
        <h1 className="text-3xl font-bold mb-6">Gestión de Alertas</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contenido</label>
            <ReactQuill value={contenido} onChange={setContenido} modules={modules} className="bg-white" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setArchivo(e.target.files[0]);
                  setImagenUrl(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            {imagenUrl && <img src={imagenUrl} alt="Vista previa" className="w-48 h-auto mt-2 rounded" />}
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} className="mr-2" />
              <span className="text-gray-700">Activar alerta</span>
            </label>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar Alerta"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlertasAdmin;
