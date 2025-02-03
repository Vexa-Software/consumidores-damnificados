import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-1/4 h-screen bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-4">Panel de Administración</h2>
      <ul>
        <li className={`mb-2 ${location.pathname === "/logros-admin" ? "bg-gray-600" : ""}`}>
          <Link to="/logros-admin" className="block p-2">Administrar Logros</Link>
        </li>
        <li className={`mb-2 ${location.pathname === "/noticias-admin" ? "bg-gray-600" : ""}`}>
          <Link to="/noticias-admin" className="block p-2">Administrar Noticias</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
