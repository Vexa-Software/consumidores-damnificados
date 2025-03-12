import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, query, getDocs, updateDoc, doc, deleteDoc, orderBy, where } from 'firebase/firestore';

import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import imageCompression from "browser-image-compression";
import "react-quill/dist/quill.snow.css";
import CustomQuillEditor, { convertQuillToTailwind, convertTailwindToQuill } from "../components/CustomQuillEditor";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
import ConfirmAlert from "@/components/ConfirmAlert";

interface Alerta {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string;
  activo: boolean;
  contenido: string;
  fechaCreacion?: any;
  isDeleted?: boolean;
}


const AlertasAdmin: React.FC = () => {
  const navigate = useNavigate();
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
  const [isDirty, setIsDirty] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [errores, setErrores] = useState({
    titulo: '',
    contenido: '',
    imagen: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
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
  
  const handleTituloChange = (value: string) => {
    setTitulo(value);
    setIsDirty(true);
  };

  const handleContenidoChange = (value: string) => {
    setContenido(value);
    setIsDirty(true);
  };

  useEffect(() => {
    cargarAlertas();
  }, []);

  // Efecto para manejar el evento beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        const message = "Tienes cambios sin guardar. ¿Seguro que quieres salir?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const handleNavigation = (path: string) => {
    if (isDirty) {
      const confirmNavigation = window.confirm("Tienes cambios sin guardar. ¿Seguro que quieres salir?");
      if (!confirmNavigation) {
        return false;
      }
    }
    navigate(path);
    return true;
  };

  const cargarAlertas = async () => {
    try {
      const alertasRef = collection(db, 'alertas');
      const q = query(alertasRef, 
        where("isDeleted", "!=", true),
        orderBy("fechaCreacion", "desc")
      );
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
          contenido: data.contenido || '',
          isDeleted: data.isDeleted || false
        };
      });

      // Encontrar la alerta activa si existe
      const alertaActiva = alertasData.find(alerta => alerta.activo);
      setAlertaActiva(alertaActiva || null);

      setAlertas(alertasData);
    } catch (error) {
      console.error('Error al cargar alertas:', error);
      toast.error('Error al cargar las alertas. Por favor, intente nuevamente.');

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
      toast.error("Error al actualizar el estado de la alerta. Por favor, intente nuevamente.");
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
      toast.error("Error al actualizar el estado de la alerta. Por favor, intente nuevamente.");
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

      toast.success("Imagen comprimida y subida con éxito");
      return imageUrl;
    } catch (error) {
      toast.error("Error al subir la imagen. Por favor, intente nuevamente.");
      return null;
    } finally {
      setCargando(false);
    }
  };

  const resetFormulario = (forceReset = false, fromSuccessfulSave = false) => {
    if (!forceReset && isDirty && !fromSuccessfulSave) {
      setShowConfirmReset(true);
      return;
    }

    setTitulo("");
    setContenido("");
    setArchivo(null);
    setImagenUrl(null);
    setActivo(false);
    setEditando(false);
    setAlertaEditadaId(null);
    setIsDirty(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const limpiarFormulario = () => {
    resetFormulario(false, true);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoEstado = e.target.checked;
    setIsDirty(true);

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
    
    if (!validarCampos()) {
      toast.error("Por favor, completa los campos obligatorios");
      return;
    }

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
          contenido: convertQuillToTailwind(contenido),
          imagen: imageUrl || "",
          activo,
          isDeleted: false
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
          contenido: convertQuillToTailwind(contenido),
          imagen: imageUrl || "",
          activo,
          fechaCreacion: new Date(),
          isDeleted: false
        });

        toast.success("Alerta creada exitosamente");
      }

      setIsDirty(false);
      limpiarFormulario();
      cargarAlertas();
    } catch (error) {
      console.error("❌ Error al gestionar alerta:", error);
      toast.error(editando ? "Error al actualizar la alerta. Por favor, intente nuevamente." : "Error al crear la alerta. Por favor, intente nuevamente.");
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
      await updateDoc(docRef, {
        isDeleted: true,
        activo: false // Desactivamos la alerta al borrarla
      });

      toast.success("Alerta eliminada exitosamente");
      cargarAlertas();
    } catch (error) {
      console.error("❌ Error al eliminar alerta:", error);
      toast.error("Error al eliminar la alerta. Por favor, intente nuevamente.");

    }

    setModalEliminarOpen(false);
    setAlertaAEliminar(null);
  };

  const cancelarEdicion = () => {
    if (isDirty) {
      const confirmCancel = window.confirm("Tienes cambios sin guardar. ¿Seguro que quieres cancelar?");
      if (!confirmCancel) return;
    }
    limpiarFormulario();
    setIsDirty(false);
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

  const validarCampos = () => {
    let erroresTemp = {
      titulo: '',
      contenido: '',
      imagen: ''
    };
    let isValid = true;

    // Solo validamos la imagen como obligatoria
    if (!archivo && !imagenUrl) {
      erroresTemp.imagen = 'La imagen es obligatoria';
      isValid = false;
    }

    setErrores(erroresTemp);
    return isValid;
  };

  return (
    <div className="flex h-screen px-4">
      <div className="flex flex-col flex-grow h-screen max-w-[100%]">
        <div className="flex-grow px-4">
          <h1 className="text-3xl sm:text-5xl text-sky-500 font-normal mb-2 xl:mb-4 text-start">Gestión de Alertas</h1>
          <p className="text-lg sm:text-xl text-sky-500 font-light mb-4 xl:mb-10 text-start">Administra las alertas del sistema</p>

          <form onSubmit={handleSubmit} className="max-w-8xl mb-8 flex flex-col  xl:flex-row justify-between">
            <div className='  w-[100%] sm:w-[100%] xl:w-[49%]'>
              <div className="mb-4 flex flex-col justify-between ">
                <label className="block text-xs font-medium text-sky-500 mb-1">Título</label>
                <CustomQuillEditor value={convertTailwindToQuill(titulo)} onChange={(value) => setTitulo(convertQuillToTailwind(value))} />
              </div>

              <div className="flex flex-col justify-between mb-4 w-[50%]">
                <label className="block text-xs font-medium text-sky-500 mb-1">Imagen (*)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setArchivo(e.target.files[0]);
                      setImagenUrl(URL.createObjectURL(e.target.files[0]));
                      setIsDirty(true);
                      setErrores(prev => ({ ...prev, imagen: '' }));
                    }
                  }}
                  className="w-full p-2 h-10 border rounded text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errores.imagen && <p className="text-red-500 text-xs mt-1">{errores.imagen}</p>}
                {imagenUrl && <img src={imagenUrl} alt="Vista previa" className="w-48 h-auto mt-2 rounded" />}
              </div>
            </div>
            <div className='flex flex-col justify-between w-[100%] sm:w-[100%] xl:w-[49%] '>
              <div className="mb-4">
                <label className="block text-xs font-medium text-sky-500 mb-1">Contenido</label>
                <CustomQuillEditor value={convertTailwindToQuill(contenido)} onChange={(value) => setContenido(convertQuillToTailwind(value))} />
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
                    type="button"
                    onClick={cancelarEdicion}
                    className="bg-white border border-gray-300 text-sky-500 px-6 py-2 rounded-lg hover:bg-sky-100 transition text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition text-sm"
                    disabled={cargando}
                  >
                    {cargando ? "Guardando..." : editando ? "Actualizar Alerta" : "Guardar Alerta"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-8">
            <div className="w-full">
              <div className="flex flex-col items-start gap-2 py-4">
                <label htmlFor="titulo" className="mr-2">Buscar por título:</label>
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
      <ConfirmAlert
        isOpen={modalEliminarOpen}
        title="¿Estás seguro de eliminar esta alerta?"
        message="Esta acción no se puede deshacer."
        confirmText="Eliminar"
        onConfirm={confirmarEliminar}
        onCancel={() => setModalEliminarOpen(false)}
      />

      {/* Modal de confirmación para activar */}
      <ConfirmAlert
        isOpen={modalActivarOpen && !!alertaAActivar}
        title="Confirmar activación"
        message={`Ya existe una alerta activa: ${alertaActiva?.titulo}. Si continúas, esta alerta se desactivará y se activará la nueva alerta: ${alertaAActivar?.titulo}.`}
        confirmText="Activar"
        onConfirm={confirmarActivacion}
        onCancel={() => {
          setModalActivarOpen(false);
          setAlertaAActivar(null);
        }}
        isLoading={cargando}
      />

      {/* Modal de confirmación para activar desde formulario */}
      <ConfirmAlert
        isOpen={modalActivarFormularioOpen}
        title="Confirmar activación"
        message={`Ya existe una alerta activa: ${alertaActiva?.titulo}. Si continúas, esta alerta se desactivará y se activará la nueva alerta.`}
        confirmText="Activar"
        onConfirm={confirmarActivacionFormulario}
        onCancel={cancelarActivacionFormulario}
      />

      {/* Modal de confirmación para resetear formulario */}
      <ConfirmAlert
        isOpen={showConfirmReset}
        title="Confirmar cancelación"
        message="Tienes cambios sin guardar. ¿Seguro que quieres cancelar?"
        confirmText="Sí, cancelar"
        cancelText="No, continuar editando"
        onConfirm={() => {
          setShowConfirmReset(false);
          resetFormulario(true);
        }}
        onCancel={() => setShowConfirmReset(false)}
      />
    </div>
  );
};

export default AlertasAdmin;
