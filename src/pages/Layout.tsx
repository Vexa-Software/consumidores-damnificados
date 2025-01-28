import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../hooks/ScrollToTop';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
       <ScrollToTop />
      <Header />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
