
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../hooks/ScrollToTop';
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <div className="flex flex-col min-h-screen">
       <ScrollToTop />
       {!isLoginPage && <Header />}
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
