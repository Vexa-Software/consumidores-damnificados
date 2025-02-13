import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Sesión cerrada exitosamente");
      navigate("/login");
    } catch (error) {
      toast.error("Error al cerrar sesión");
      console.error("Error al cerrar sesión:", error);
    }
  };

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
        className={`fixed top-0 left-0 w-64 h-[%100] bg-gray-800 text-white p-6 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform sm:translate-x-0 sm:w-1/4 sm:relative z-50`}
      >
        <div>
          {/* Botón "X" para cerrar Sidebar en Mobile */}
          <button
            className="absolute top-4 right-4 text-white sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="text-2xl" />
          </button>

          <h2 className="text-xl font-bold mb-4">Panel de Administración</h2>
          <ul>
            <li className={`mb-2 ${location.pathname === "/avisos-judiciales-admin" ? "bg-gray-600" : ""}`}>
              <Link to="/avisos-judiciales-admin" className="block p-2" onClick={() => setIsOpen(false)}>
                Avisos Judiciales
              </Link>
            </li>
            <li className={`mb-2 ${location.pathname === "/noticias-admin" ? "bg-gray-600" : ""}`}>
              <Link to="/noticias-admin" className="block p-2" onClick={() => setIsOpen(false)}>
                Noticias
              </Link>
            </li>
          </ul>
        </div>

        {/* Botón de Cerrar Sesión en la parte inferior */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Fondo oscuro para cerrar Sidebar en mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 sm:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default AdminSidebar;
