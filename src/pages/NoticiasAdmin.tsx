import React from "react";
import AdminPanel from "../hooks/AdminPanel";



const NoticiasAdmin: React.FC = () => {
    return <AdminPanel storageKey="noticias" title="Noticias y Avisos Judiciales" subtitle="Informacion de la noticia o aviso judicial" />;
};

export default NoticiasAdmin;
