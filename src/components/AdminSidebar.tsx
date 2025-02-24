import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaRegNewspaper, FaExclamationCircle } from "react-icons/fa";
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
  className={`fixed top-0 left-0 pl-4 sm:pl-0 h-[100vh] sm:h-[100vh] xl:h-[100%] 2xl:h-[100vh] w-72 bg-white border-r border-sky-500 text-black 
    pt-6 pr-4 pb-6 flex flex-col justify-between transform 
    ${isOpen ? "translate-x-0 " : "-translate-x-full "} 
    transition-transform sm:translate-x-0 sm:relative z-50 `}
>
        <div className="flex-grow overflow-y-auto">
          {/* Botón "X" para cerrar Sidebar en Mobile */}
          <button
            className="absolute top-1 right-1 text-black sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>

          <ul>
            <li className={`mb-2 flex items-center ${location.pathname === "/noticias-admin" ? "bg-sky-500 rounded-full text-white" : "border rounded-full "}`}>
              <Link to="/noticias-admin" className="p-2  text-center flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaRegNewspaper className={` text-xl 2xl:text-2xl ${location.pathname === "/noticias-admin" ? " text-white" : "text-sky-500 "}`} /> Noticias y Avisos Judiciales
              </Link>
            </li>
            <li className={`mb-2 flex items-center ${location.pathname === "/nuestros-logros-admin" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
              <Link to="/nuestros-logros-admin" className=" p-2 text-center flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaExclamationCircle className={` text-xl 2xl:text-2xl ${location.pathname === "/nuestros-logros-admin" ? " text-white" : "text-sky-500 "}`} /> Nuestros Logros
              </Link>
            </li>
            <li className={`mb-2 flex items-center ${location.pathname === "/alertas-admin" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
              <Link to="/alertas-admin" className="p-2 text-center flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaExclamationCircle className={` text-xl 2xl:text-2xl ${location.pathname === "/alertas-admin" ? " text-white" : "text-sky-500 "}`} /> Alertas
              </Link>
            </li>
            <li className={`mb-2 flex items-center ${location.pathname === "/textos-sistema-admin" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
              <Link to="/textos-sistema-admin" className="p-2 text-center flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaRegNewspaper className={` text-xl 2xl:text-2xl ${location.pathname === "/textos-sistema-admin" ? " text-white" : "text-sky-500 "}`} /> Textos Sistema
              </Link>
            </li>
          </ul>
           {/* Botón de Cerrar Sesión en la parte inferior */}
        <button
          onClick={handleLogout}
          className="w-full mt-auto bg-white text-black py-2 rounded-md hover:text-red-600 transition"
        >
          Cerrar Sesión
        </button>
        </div>

       
      </div>

      {/* Fondo oscuro para cerrar Sidebar en mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 sm:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>

  );
};

export default AdminSidebar;
