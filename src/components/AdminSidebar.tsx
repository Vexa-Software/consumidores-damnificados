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
    <FaBars size={20} />
  </button>

  {/* Sidebar */}
  <div
    className={`fixed top-0 left-0  bg-white border-r border-sky-500 text-black 
    pt-6 pr-4 pb-6   flex flex-col justify-between transform 
    ${isOpen ? "translate-x-0 h-[100%]" : "-translate-x-full "} 
    transition-transform sm:translate-x-0 sm:relative  
    w-64  z-50 `}
  >
    <div>
      {/* Botón "X" para cerrar Sidebar en Mobile */}
      <button
        className="absolute top-4 right-4 text-black sm:hidden"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes className="text-2xl" />
      </button>

      <ul>
        <li className={`mb-2 ${location.pathname === "/noticias-admin" ? "bg-sky-500 rounded-full text-white" : "border rounded-full "}`}>
          <Link to="/noticias-admin" className="block p-2  text-center" onClick={() => setIsOpen(false)}>
            Noticias y Avisos Judiciales
          </Link>
        </li>
        <li className={`mb-2 ${location.pathname === "/nuestros-logros-admin" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
          <Link to="/nuestros-logros-admin" className="block p-2  text-center" onClick={() => setIsOpen(false)}>
          Nuestros Logros
          </Link>
        </li>
        <li className={`mb-2 ${location.pathname === "/alertas-admin" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
          <Link to="/alertas-admin" className="block p-2  text-center" onClick={() => setIsOpen(false)}>
          Alertas
          </Link>
        </li>
      </ul>
    </div>

    {/* Botón de Cerrar Sesión en la parte inferior */}
    <button
      onClick={handleLogout}
      className="w-full mt-auto bg-white text-black py-2 rounded-md hover:text-red-600 transition"
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
