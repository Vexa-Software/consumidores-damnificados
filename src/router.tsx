import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Denuncia from "./pages/Denuncia";
import AvisosJudiciales from "./pages/AvisosJudiciales";
import Contacto from "./pages/Contacto";
import Noticias from "./pages/Noticias";
import Layout from "./pages/Layout";
import QuienesSomos from "./pages/QuienesSomos";
import Login from "./pages/Login"; // Importamos la nueva página de Login
import AvisosJudicialesAdmin from "./pages/AvisosJudicialesAdmin";
import NoticiasAdmin from "./pages/NoticiasAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quienes-somos", element: <QuienesSomos /> },
      { path: "/avisos-judiciales", element: <AvisosJudiciales /> },
      { path: "/denuncia", element: <Denuncia /> },
      { path: "/noticias", element: <Noticias /> },
      { path: "/contacto", element: <Contacto /> },
    ],
  },
  { path: "/login", element: <Login /> }, // Ruta de Login fuera del Layout
  { path: "/avisos-judiciales-admin", element: <AvisosJudicialesAdmin /> },
  { path: "/noticias-admin", element: <NoticiasAdmin/> },
]);
