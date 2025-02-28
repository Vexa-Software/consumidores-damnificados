import React from 'react';
import { Outlet } from "react-router-dom";
import HeaderAdmin from '../components/HeaderAdmin';
import AdminSidebar from '../components/AdminSidebar';
import ScrollToTop from '../hooks/ScrollToTop';

const LayoutAdmin: React.FC = () => {

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <HeaderAdmin />
      <div className="flex pt-[100px]">
        <div className="fixed w-[300px] h-full">
          <AdminSidebar />
        </div>
        <div className="ml-[300px] w-full">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin; 