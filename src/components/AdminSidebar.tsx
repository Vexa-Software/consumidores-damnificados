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
      navigate("/login-admin");
    } catch (error) {
      toast.error("Error al cerrar sesión");
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 text-white bg-gray-800 p-2 rounded-md sm:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={20} />
      </button>

      <div
        className={`h-full w-[300px] bg-white border-r border-sky-500 text-black p-4
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 sm:translate-x-0`}
      >
        <div className="flex-grow">
          <button
            className="absolute top-1 right-1 text-black sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>

          <ul>
            <li className={`mb-2 flex items-center ${location.pathname === "/admin/noticias" ? "bg-sky-500 rounded-full text-white" : "border rounded-full "}`}>
              <Link to="/admin/noticias" className="p-2 text-center flex items-center gap-2 w-full" onClick={() => setIsOpen(false)}>
                <FaRegNewspaper className={` text-xl 2xl:text-2xl ${location.pathname === "/admin/noticias" ? " text-white" : "text-sky-500 "}`} /> Noticias y Avisos Judiciales
              </Link>
            </li>
            <li className={`mb-2 flex items-center ${location.pathname === "/admin/nuestros-logros" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
              <Link to="/admin/nuestros-logros" className="p-2 text-center flex items-center gap-2 w-full" onClick={() => setIsOpen(false)}>
                <FaExclamationCircle className={` text-xl 2xl:text-2xl ${location.pathname === "/admin/nuestros-logros" ? " text-white" : "text-sky-500 "}`} /> Nuestros Logros
              </Link>
            </li>
            <li className={`mb-2 flex items-center ${location.pathname === "/admin/alertas" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
              <Link to="/admin/alertas" className="p-2 text-center flex items-center gap-2 w-full" onClick={() => setIsOpen(false)}>
                <FaExclamationCircle className={` text-xl 2xl:text-2xl ${location.pathname === "/admin/alertas" ? " text-white" : "text-sky-500 "}`} /> Alertas
              </Link>
            </li>
            <li className={`mb-2 flex items-center ${location.pathname === "/admin/textos-sistema" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
              <Link to="/admin/textos-sistema" className="p-2 text-center flex items-center gap-2 w-full" onClick={() => setIsOpen(false)}>
                <FaRegNewspaper className={` text-xl 2xl:text-2xl ${location.pathname === "/admin/textos-sistema" ? " text-white" : "text-sky-500 "}`} /> Textos Sistema
              </Link>
            </li>
          </ul>

          <button
            onClick={handleLogout}
            className="w-full mt-auto bg-white text-black py-2 rounded-md hover:text-red-600 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 sm:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default AdminSidebar;
