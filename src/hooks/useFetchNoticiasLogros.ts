import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";

interface Item {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string;
}

export function useFetchNoticiasLogros() {
  const [noticias, setNoticias] = useState<Item[]>([]);
  const [nuestrosLogros, setNuestrosLogros] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticiasQuery = query(
          collection(db, "noticias"),
          where("isDeleted", "!=", true),
          orderBy("fecha", "desc")
        );
        const logrosQuery = query(
          collection(db, "nuestrosLogros"),
          where("isDeleted", "!=", true),
          orderBy("fecha", "desc")
        );

        const [noticiasSnapshot, logrosSnapshot] = await Promise.all([
          getDocs(noticiasQuery),
          getDocs(logrosQuery),
        ]);

        const formatearFecha = (fecha: Timestamp | string) => {
          if (fecha instanceof Timestamp) {
            return fecha.toDate().toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
          }
          return String(fecha);
        };

        const noticiasData = noticiasSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            titulo: data.titulo,
            descripcion: data.descripcion,
            fecha: formatearFecha(data.fecha),
            imagen: data.imagen
          };
        });

        const logrosData = logrosSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            titulo: data.titulo,
            descripcion: data.descripcion,
            fecha: formatearFecha(data.fecha),
            imagen: data.imagen
          };
        });

        setNoticias(noticiasData);
        setNuestrosLogros(logrosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { noticias, nuestrosLogros, loading };
}
