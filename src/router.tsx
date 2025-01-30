import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Denuncia from './pages/Denuncia';
import ElEstudio from './pages/ElEstudio';
import Contacto from './pages/Contacto';
import NuestroEquipo from './pages/NuestroEquipo';
import Layout from './pages/Layout.tsx';
import QuienesSomos from './pages/QuienesSomos.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/quienes-somos', element: <QuienesSomos /> },
      { path: '/denuncia', element: <Denuncia /> },
      { path: '/el-estudio', element: <ElEstudio /> },
      { path: '/nuestro-equipo', element: <NuestroEquipo /> },
      { path: '/contacto', element: <Contacto /> },
    ],
  },
]);
