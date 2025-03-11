import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegNewspaper, FaExclamationCircle, FaTrophy, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <div
      className={`h-full w-[300px] bg-white border-r border-sky-500 text-black p-4
        ${isOpen ? "translate-x-0" : "-translate-x-[270px]"} 
        transition-transform duration-300`}
    >
      <div className="flex-grow">
        <ul>
          <li className={`mb-2 flex items-center ${location.pathname === "/admin/noticias" ? "bg-sky-500 rounded-full text-white" : "border rounded-full "}`}>
            <Link to="/admin/noticias" className="p-2 text-center flex items-center gap-2 w-full">
              <FaRegNewspaper className={`text-xl 2xl:text-2xl ${location.pathname === "/admin/noticias" ? " text-white" : "text-sky-500 "}`} /> Noticias y Avisos Judiciales
            </Link>
          </li>
          <li className={`mb-2 flex items-center ${location.pathname === "/admin/nuestros-logros" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
            <Link to="/admin/nuestros-logros" className="p-2 text-center flex items-center gap-2 w-full">
              <FaTrophy className={`text-xl 2xl:text-2xl ${location.pathname === "/admin/nuestros-logros" ? " text-white" : "text-sky-500 "}`} /> Nuestros Logros
            </Link>
          </li>
          <li className={`mb-2 flex items-center ${location.pathname === "/admin/alertas" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
            <Link to="/admin/alertas" className="p-2 text-center flex items-center gap-2 w-full">
              <FaExclamationCircle className={`text-xl 2xl:text-2xl ${location.pathname === "/admin/alertas" ? " text-white" : "text-sky-500 "}`} /> Alertas
            </Link>
          </li>
          <li className={`mb-2 flex items-center ${location.pathname === "/admin/textos-sistema" ? "bg-sky-500 rounded-full text-white" : "border rounded-full"}`}>
            <Link to="/admin/textos-sistema" className="p-2 text-center flex items-center gap-2 w-full">
              <FaFileAlt className={`text-xl 2xl:text-2xl ${location.pathname === "/admin/textos-sistema" ? " text-white" : "text-sky-500 "}`} /> Textos Sistema
            </Link>
          </li>
        </ul>

        <hr className="my-6 border-t border-gray-300" />
        <button
          onClick={handleLogout}
          className="w-full mt-auto bg-white text-black py-2 rounded-md hover:text-red-600 transition flex flex-row justify-center items-center gap-2"
        >
          <FaSignOutAlt className="text-xl 2xl:text-2xl text-sky-500" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
