import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, getDocs, updateDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import imageCompression from "browser-image-compression";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface Alerta {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string;
  activo: boolean;
  contenido: string;
  fechaCreacion?: any;
}


const AlertasAdmin: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [activo, setActivo] = useState(false);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [imagenUrl, setImagenUrl] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [alertaEditadaId, setAlertaEditadaId] = useState<string | null>(null);
  const [modalEliminarOpen, setModalEliminarOpen] = useState<boolean>(false);
  const [alertaAEliminar, setAlertaAEliminar] = useState<string | null>(null);
  const [modalActivarOpen, setModalActivarOpen] = useState<boolean>(false);
  const [alertaAActivar, setAlertaAActivar] = useState<Alerta | null>(null);
  const [alertaActiva, setAlertaActiva] = useState<Alerta | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [modalActivarFormularioOpen, setModalActivarFormularioOpen] = useState<boolean>(false);


  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }], // 🟢 Agrega la opción de alineación
      ["link"],
      ["clean"],
    ],
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
    clipboard: {
      matchVisual: false,
    },
  };
  
  useEffect(() => {
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    try {
      const alertasRef = collection(db, 'alertas');
      const q = query(alertasRef, orderBy("fechaCreacion", "desc"));
      const querySnapshot = await getDocs(q);
      const alertasData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Formatear la fecha para la tabla
        let fechaFormateada = 'N/A';
        if (data.fechaCreacion) {
          const fecha = data.fechaCreacion.toDate();
          fechaFormateada = fecha.toLocaleDateString();
        }

        return {
          id: doc.id,
          ...data,
          fecha: fechaFormateada,
          // Adaptar campos para la grilla
          titulo: data.titulo || '',
          descripcion: data.contenido || '',
          imagen: data.imagen || '',
          activo: data.activo || false,
          contenido: data.contenido || ''
        };
      });

      // Encontrar la alerta activa si existe
      const alertaActiva = alertasData.find(alerta => alerta.activo);
      setAlertaActiva(alertaActiva || null);

      setAlertas(alertasData);
    } catch (error) {
      console.error('Error al cargar alertas:', error);
      toast.error('Error al cargar las alertas');
    }
  };

  const abrirImagen = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.info("No hay imagen disponible para esta alerta");
    }
  };

  const handleCambiarEstado = async (alerta: Alerta, nuevoEstado: boolean) => {
    // Si estamos desactivando, simplemente actualizar
    if (!nuevoEstado) {
      await actualizarEstadoAlerta(alerta.id, nuevoEstado);
      return;
    }

    // Si estamos activando y ya hay una alerta activa diferente
    const alertaActivaExistente = alertas.find(a => a.activo && a.id !== alerta.id);
    if (alertaActivaExistente) {
      setAlertaAActivar(alerta);
      setModalActivarOpen(true);
    } else {
      // No hay otra alerta activa, activar directamente
      await actualizarEstadoAlerta(alerta.id, true);
    }
  };

  const confirmarActivacion = async () => {
    if (!alertaAActivar) return;

    try {
      setCargando(true);

      // Desactivar la alerta activa actual
      const alertaActivaExistente = alertas.find(a => a.activo && a.id !== alertaAActivar.id);
      if (alertaActivaExistente) {
        await updateDoc(doc(db, "alertas", alertaActivaExistente.id), { activo: false });
      }

      // Activar la nueva alerta
      await updateDoc(doc(db, "alertas", alertaAActivar.id), { activo: true });

      toast.success("Estado de alerta actualizado exitosamente");
      cargarAlertas();
    } catch (error) {
      console.error("❌ Error al actualizar estado:", error);
      toast.error("Error al actualizar el estado de la alerta");
    } finally {
      setCargando(false);
      setModalActivarOpen(false);
      setAlertaAActivar(null);
    }
  };

  const actualizarEstadoAlerta = async (alertaId: string, nuevoEstado: boolean) => {
    try {
      setCargando(true);
      await updateDoc(doc(db, "alertas", alertaId), { activo: nuevoEstado });
      toast.success(` Alerta ${nuevoEstado ? 'activada' : 'desactivada'} exitosamente`);
      cargarAlertas();
    } catch (error) {
      console.error("❌ Error al actualizar estado:", error);
      toast.error("Error al actualizar el estado de la alerta");
    } finally {
      setCargando(false);
    }
  };

  const columns: ColumnDef<Alerta>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "titulo",
      header: "Título",
      cell: ({ row }) => <div className="capitalize min-w-[100%] max-w-[200px] ">{row.getValue("titulo")}</div>,
    },
    {
      accessorKey: "descripcion",
      header: "Contenido",
      cell: ({ row }) => {
        const contenido = row.getValue("descripcion") as string;
        // Mostrar solo una parte del contenido para evitar que la tabla sea muy grande
        const contenidoCorto = contenido?.length > 100
          ? contenido.substring(0, 100) + "..."
          : contenido;
        return <div className="min-w-[100%] w-[300px] sm:w-[400px] xl:w-[500px] max-w-[500px]">{contenidoCorto}</div>;
      },
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => <div className="text-center">{row.getValue("fecha")}</div>,
    },
    {
      accessorKey: "activo",
      header: "Estado",
      cell: ({ row }) => {
        const activo = row.getValue("activo") as boolean;
        const alerta = row.original;

        return (
          <div className="flex flex-col items-center gap-1">
            <Switch
              checked={activo}
              onCheckedChange={(checked) => handleCambiarEstado(alerta, checked)}
              disabled={cargando}
            />
            <span className={`px-2 py-1 rounded text-xs ${activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {activo ? 'Activa' : 'Inactiva'}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "imagen",
      header: "Imagen",
      cell: ({ row }) => {
        const imagen = row.getValue("imagen") as string;
        return (
          <div className="text-center">
            {imagen ? (
              <Button
                variant="outline"
                className="bg-sky-500 text-white text-xs py-1 px-2"
                onClick={() => abrirImagen(imagen)}
              >
                Ver imagen
              </Button>
            ) : (
              <span className="text-gray-400 text-sm">Sin imagen</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      enableHiding: false,
      cell: ({ row }) => {
        const alerta = row.original;
        return (
          <div className="flex flex-col justify-between gap-2">
            <Button variant="outline" className="bg-yellow-500 text-white" onClick={() => handleEditarAlerta(alerta)}>
              Editar
            </Button>
            <Button variant="outline" className="bg-red-500 text-white" onClick={() => handleEliminarAlerta(alerta.id)}>
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];

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

      console.log("Imagen comprimida y subida con éxito:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("❌ Error al subir la imagen:", error);
      toast.error("Error al subir la imagen.");
      return null;
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setTitulo("");
    setContenido("");
    setArchivo(null);
    setImagenUrl(null);
    setActivo(false);
    setEditando(false);
    setAlertaEditadaId(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoEstado = e.target.checked;

    // Si estamos desactivando, simplemente actualizar el estado
    if (!nuevoEstado) {
      setActivo(false);
      return;
    }

    // Si estamos activando y ya hay una alerta activa diferente
    const alertaActivaExistente = alertas.find(a => a.activo && (!editando || a.id !== alertaEditadaId));
    if (alertaActivaExistente) {
      // Mostrar modal de confirmación
      setModalActivarFormularioOpen(true);
    } else {
      // No hay otra alerta activa, activar directamente
      setActivo(true);
    }
  };

  const confirmarActivacionFormulario = () => {
    setActivo(true);
    setModalActivarFormularioOpen(false);
  };

  const cancelarActivacionFormulario = () => {
    setModalActivarFormularioOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCargando(true);

      let imageUrl = archivo ? await subirImagen() : imagenUrl;

      if (editando && alertaEditadaId) {
        // Actualizar alerta existente
        const alertaRef = doc(db, "alertas", alertaEditadaId);

        // Si la alerta editada se activa, desactivar las demás
        if (activo) {
          for (const alerta of alertas) {
            if (alerta.id !== alertaEditadaId && alerta.activo) {
              await updateDoc(doc(db, "alertas", alerta.id), { activo: false });
            }
          }
        }

        await updateDoc(alertaRef, {
          titulo,
          contenido,
          imagen: imageUrl || "",
          activo
        });

        toast.success("Alerta actualizada exitosamente");
      } else {
        // Crear nueva alerta
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

        toast.success("Alerta creada exitosamente");
      }

      limpiarFormulario();
      cargarAlertas();
    } catch (error) {
      console.error("❌ Error al gestionar alerta:", error);
      toast.error(editando ? "Error al actualizar la alerta" : "Error al crear la alerta");
    } finally {
      setCargando(false);
    }
  };

  const handleEditarAlerta = (alerta: Alerta) => {
    setEditando(true);
    setAlertaEditadaId(alerta.id);
    setTitulo(alerta.titulo);
    setContenido(alerta.contenido); // Usamos el campo contenido directamente
    setImagenUrl(alerta.imagen || null);
    setActivo(alerta.activo || false);

    // Scroll hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminarAlerta = (id: string) => {
    setModalEliminarOpen(true);
    setAlertaAEliminar(id);
  };

  const confirmarEliminar = async () => {
    if (!alertaAEliminar) return;

    try {
      const docRef = doc(db, "alertas", alertaAEliminar);
      await deleteDoc(docRef);

      toast.success("Alerta eliminada exitosamente");
      cargarAlertas();
    } catch (error) {
      console.error("❌ Error al eliminar alerta:", error);
      toast.error("Error al eliminar la alerta");
    }

    setModalEliminarOpen(false);
    setAlertaAEliminar(null);
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
  };

  const table = useReactTable({
    data: alertas,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex h-screen px-4">
      <div className="flex flex-col flex-grow h-screen max-w-[100%]">
        <div className="flex-grow px-4">
          <h1 className="text-3xl sm:text-5xl text-sky-500 font-normal mb-2 xl:mb-4 text-start">Gestión de Alertas</h1>
          <p className="text-lg sm:text-xl text-sky-500 font-light mb-4 xl:mb-10 text-start">Administra las alertas del sistema</p>

          <form onSubmit={handleSubmit} className="max-w-8xl mb-8 flex flex-col  xl:flex-row justify-between">
            <div className='  w-[100%] sm:w-[100%] xl:w-[49%]'>
              <div className="mb-4 flex flex-col justify-between ">
                <label className="block text-xs font-medium text-sky-500 mb-1">Título (*)</label>
                <ReactQuill value={titulo} onChange={setTitulo} ref={quillRef} modules={modules} className="bg-white  text-gray-700 shadow border rounded" />
                {/* <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  
                /> */}
              </div>


              <div className="flex flex-col justify-between mb-4 w-[50%]">
                <label className="block text-xs font-medium text-sky-500 mb-1">Imagen(*)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setArchivo(e.target.files[0]);
                      setImagenUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="w-full p-2 h-10 border rounded text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
                {imagenUrl && <img src={imagenUrl} alt="Vista previa" className="w-48 h-auto mt-2 rounded" />}
              </div>


            </div>
            <div className='flex flex-col justify-between w-[100%] sm:w-[100%] xl:w-[49%] '>
              <div className="mb-4">
                <label className="block text-xs font-medium text-sky-500 mb-1 ">Contenido(*)</label>
                <ReactQuill value={contenido} onChange={setContenido} ref={quillRef} modules={modules} className="bg-white  text-gray-700 shadow border rounded" />
              </div>
              <div className='flex flex-row justify-between'>
                <div className="mb-4 ">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activo}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700 ">Activar alerta</span>
                  </label>
                </div>

                <div className="flex space-x-4 justify-end">
                  <button
                    type="submit"
                    className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition text-sm"
                    disabled={cargando}
                  >
                    {cargando ? "Guardando..." : editando ? "Actualizar Alerta" : "Guardar Alerta"}
                  </button>

                  {editando && (
                    <button
                      type="button"
                      onClick={cancelarEdicion}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>

          <div className="mt-8">
            <div className="w-full">
              <div className="flex items-center py-4">
                <Input
                  placeholder="Buscar por título..."
                  value={(table.getColumn("titulo")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("titulo")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No hay alertas disponibles.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} de{" "}
                  {table.getFilteredRowModel().rows.length} filas seleccionadas.
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {modalEliminarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-bold mb-4">¿Estás seguro de eliminar esta alerta?</p>
            <div className="flex flex-row justify-evenly">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setModalEliminarOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmarEliminar}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para activar */}
      {modalActivarOpen && alertaAActivar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <p className="text-lg font-bold mb-2">Confirmar activación</p>
            <p className="mb-4">
              Ya existe una alerta activa: <span className="font-semibold">{alertaActiva?.titulo}</span>.
              Si continúas, esta alerta se desactivará y se activará la nueva alerta: <span className="font-semibold">{alertaAActivar.titulo}</span>.
            </p>
            <div className="flex flex-row justify-evenly">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setModalActivarOpen(false);
                  setAlertaAActivar(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={confirmarActivacion}
                disabled={cargando}
              >
                {cargando ? "Procesando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para activar desde formulario */}
      {modalActivarFormularioOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <p className="text-lg font-bold mb-2">Confirmar activación</p>
            <p className="mb-4">
              Ya existe una alerta activa: <span className="font-semibold">{alertaActiva?.titulo}</span>.
              Si continúas, esta alerta se desactivará y se activará la nueva alerta.
            </p>
            <div className="flex flex-row justify-evenly">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={cancelarActivacionFormulario}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={confirmarActivacionFormulario}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertasAdmin;
