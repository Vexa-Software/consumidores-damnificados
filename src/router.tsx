import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Denuncia from "./pages/Denuncia";
import NuestrosLogros from "./pages/NuestrosLogros";
import Contacto from "./pages/Contacto";
import Noticias from "./pages/Noticias";
import Layout from "./pages/Layout";
import QuienesSomos from "./pages/QuienesSomos";
import Login from "./pages/Login"; // Importamos la nueva página de Login
import NuestrosLogrosAdmin from "./pages/NuestrosLogrosAdmin";
import NoticiasAdmin from "./pages/NoticiasAdmin";
import PrivateRoute from './components/PrivateRoute';
import HeaderAdmin from "./components/HeaderAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quienes-somos", element: <QuienesSomos /> },
      { path: "/nuestros-logros", element: <NuestrosLogros /> },
      { path: "/denuncia", element: <Denuncia /> },
      { path: "/noticias", element: <Noticias /> },
      { path: "/contacto", element: <Contacto /> },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/nuestros-logros-admin",
    element: (
      <PrivateRoute>
        <HeaderAdmin/>
        <NuestrosLogrosAdmin />
      </PrivateRoute>
    ),
  },
  {
    path: "/noticias-admin",
    element: (
      <PrivateRoute>
        <HeaderAdmin/>
        <NoticiasAdmin />
      </PrivateRoute>
    ),
  },
]);
