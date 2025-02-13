import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface Item {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string;
}

export function useFetchNoticiasAvisos() {
  const [noticias, setNoticias] = useState<Item[]>([]);
  const [avisos, setAvisos] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const fetchCollection = (storageKey: string, setState: (data: Item[]) => void) => {
      const q = query(collection(db, storageKey), orderBy("fecha", "desc"));

      return onSnapshot(q, (snapshot) => {
        const itemsData: Item[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Item, "id">),
        }));

        setState(itemsData.slice(0, 5)); 
        setLoading(false);
      });
    };

    const unsubscribeNoticias = fetchCollection("noticias", setNoticias);
    const unsubscribeAvisos = fetchCollection("avisosJudiciales", setAvisos);

    return () => {
      unsubscribeNoticias();
      unsubscribeAvisos();
    };
  }, []);

  return { noticias, avisos, loading };
}
