import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../hooks/ScrollToTop';
import AlertaPopup from '../components/AlertaPopup';
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isLoginPage && <Header />}
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      {isHomePage && <AlertaPopup />}
      <Footer />
    </div>
  );
}
