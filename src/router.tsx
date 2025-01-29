import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Denuncia from './pages/Denuncia';
import AreasDePractica from './pages/AreasDePractica';
import ElEstudio from './pages/ElEstudio';
import Contacto from './pages/Contacto';
import NuestroEquipo from './pages/NuestroEquipo';
import Layout from './pages/Layout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/denuncia', element: <Denuncia /> },
      { path: '/areas-de-practica', element: <AreasDePractica /> },
      { path: '/el-estudio', element: <ElEstudio /> },
      { path: '/nuestro-equipo', element: <NuestroEquipo /> },
      { path: '/contacto', element: <Contacto /> },
    ],
  },
]);
