import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Denuncia from "./pages/Denuncia";
import Logros from "./pages/Logros";
import Contacto from "./pages/Contacto";
import Noticias from "./pages/Noticias";
import Layout from "./pages/Layout";
import QuienesSomos from "./pages/QuienesSomos";
import Login from "./pages/Login"; // Importamos la nueva página de Login
import LogrosAdmin from "./pages/LogrosAdmin";
import NoticiasAdmin from "./pages/NoticiasAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quienes-somos", element: <QuienesSomos /> },
      { path: "/logros", element: <Logros /> },
      { path: "/denuncia", element: <Denuncia /> },
      { path: "/noticias", element: <Noticias /> },
      { path: "/contacto", element: <Contacto /> },
    ],
  },
  { path: "/login", element: <Login /> }, // Ruta de Login fuera del Layout
  { path: "/logros-admin", element: <LogrosAdmin /> },
  { path: "/noticias-admin", element: <NoticiasAdmin/> },
]);
