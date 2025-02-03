import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Denuncia from "./pages/Denuncia";
import ElEstudio from "./pages/ElEstudio";
import Contacto from "./pages/Contacto";
import NuestroEquipo from "./pages/NuestroEquipo";
import Layout from "./pages/Layout";
import QuienesSomos from "./pages/QuienesSomos";
import Login from "./pages/Login"; // Importamos la nueva página de Login

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quienes-somos", element: <QuienesSomos /> },
      { path: "/denuncia", element: <Denuncia /> },
      { path: "/el-estudio", element: <ElEstudio /> },
      { path: "/nuestro-equipo", element: <NuestroEquipo /> },
      { path: "/contacto", element: <Contacto /> },
    ],
  },
  { path: "/login", element: <Login /> }, // Ruta de Login fuera del Layout
]);
