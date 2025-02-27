import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import HeaderAdmin from '../components/HeaderAdmin';
import AdminSidebar from '../components/AdminSidebar';
import ScrollToTop from '../hooks/ScrollToTop';

const LayoutAdmin: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <HeaderAdmin />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin; 