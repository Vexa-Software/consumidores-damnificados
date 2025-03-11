import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import HeaderAdmin from '../components/HeaderAdmin';
import AdminSidebar from '../components/AdminSidebar';
import ScrollToTop from '../hooks/ScrollToTop';

const LayoutAdmin: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <HeaderAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex pt-[100px]">
        <div className="fixed w-[300px] h-full z-50">
          <AdminSidebar isOpen={isSidebarOpen} />
        </div>
        <div className="w-full lg:ml-[300px]">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin; 