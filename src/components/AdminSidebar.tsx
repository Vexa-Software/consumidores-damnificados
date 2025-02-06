import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Estado del sidebar en mobile

  return (
    <>
      {/* Botón Hamburguesa en Mobile */}
      <button
        className="fixed top-4 left-4 text-white bg-gray-800 p-2 rounded-md sm:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform sm:translate-x-0 sm:w-1/4 sm:relative z-50`}
      >
        <h2 className="text-xl font-bold mb-4">Panel de Administración</h2>
        <ul>
          <li
            className={`mb-2 ${location.pathname === "/logros-admin" ? "bg-gray-600" : ""}`}
          >
            <Link to="/logros-admin" className="block p-2" onClick={() => setIsOpen(false)}>
              Administrar Logros
            </Link>
          </li>
          <li
            className={`mb-2 ${location.pathname === "/noticias-admin" ? "bg-gray-600" : ""}`}
          >
            <Link to="/noticias-admin" className="block p-2" onClick={() => setIsOpen(false)}>
              Administrar Noticias
            </Link>
          </li>
        </ul>
      </div>

      {/* Fondo oscuro para cerrar Sidebar en mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;

