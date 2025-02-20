import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import AdminSidebar from '@/components/AdminSidebar';

const AlertasAdmin: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [activo, setActivo] = useState(false);
  const [alertas, setAlertas] = useState<any[]>([]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  useEffect(() => {
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    try {
      const alertasRef = collection(db, 'Alertas');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activo) {
        // Desactivar todas las alertas existentes
        for (const alerta of alertas) {
          if (alerta.activo) {
            await updateDoc(doc(db, 'Alertas', alerta.id), {
              activo: false
            });
          }
        }
      }

      await addDoc(collection(db, 'Alertas'), {
        titulo,
        contenido,
        activo,
        fechaCreacion: new Date()
      });

      toast.success('Alerta creada exitosamente');
      setTitulo('');
      setContenido('');
      setActivo(false);
      cargarAlertas();
    } catch (error) {
      console.error('Error al crear alerta:', error);
      toast.error('Error al crear la alerta');
    }
  };

  return (
    <div className='flex px-4 '>
      <AdminSidebar />
      <div className="py-8 px-4 max-w-[100%] sm:max-w-[75%] xl:sm:max-w-[85%]">

        <h1 className="text-3xl font-bold mb-6">Gestión de Alertas</h1>
        
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contenido
            </label>
            <ReactQuill
              value={contenido}
              onChange={setContenido}
              modules={modules}
              className="bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={activo}
                onChange={(e) => setActivo(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700">Activar alerta</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Alerta
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Alertas Existentes</h2>
          <div className="grid gap-4">
            {alertas.map((alerta) => (
              <div
                key={alerta.id}
                className="border p-4 rounded shadow"
              >
                <h3 className="font-bold">{alerta.titulo}</h3>
                <div dangerouslySetInnerHTML={{ __html: alerta.contenido }} />
                <p className="mt-2">
                  Estado: {alerta.activo ? 'Activa' : 'Inactiva'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertasAdmin; 