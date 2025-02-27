import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Denuncia from "./pages/Denuncia";
import NuestrosLogros from "./pages/NuestrosLogros";
import Contacto from "./pages/Contacto";
import Noticias from "./pages/Noticias";
import Layout from "./pages/Layout";
import LayoutAdmin from "./pages/LayoutAdmin";
import QuienesSomos from "./pages/QuienesSomos";
import Login from "./pages/Login"; // Importamos la nueva página de Login
import NuestrosLogrosAdmin from "./pages/NuestrosLogrosAdmin";
import NoticiasAdmin from "./pages/NoticiasAdmin";
import AlertasAdmin from "./pages/AlertasAdmin";
import PrivateRoute from './components/PrivateRoute';
import TextosSistemaAdmin from "./pages/TextosSistemaAdmin";
import NotFound from "./pages/NotFound";

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
      { path: "*", element: <NotFound /> }, // Ruta para manejar páginas no encontradas dentro del Layout
    ],
  },
  { path: "/login-admin", element: <Login /> },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <LayoutAdmin />
      </PrivateRoute>
    ),
    children: [
      { path: "nuestros-logros", element: <NuestrosLogrosAdmin /> },
      { path: "noticias", element: <NoticiasAdmin /> },
      { path: "alertas", element: <AlertasAdmin /> },
      { path: "textos-sistema", element: <TextosSistemaAdmin /> },
    ],
  },
  // Ruta para manejar cualquier otra ruta no definida fuera del Layout
  { 
    path: "*", 
    element: <Layout />,
    children: [
      { path: "*", element: <NotFound /> }
    ]
  },
]);
