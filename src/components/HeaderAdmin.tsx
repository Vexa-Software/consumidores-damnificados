import React from 'react';
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

interface HeaderAdminProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const HeaderAdmin: React.FC<HeaderAdminProps> = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <>
            <header className='fixed top-0 left-0 right-0 bg-white h-[100px] border-b border-sky-500 flex flex-row justify-between items-center z-40'>
                <div className='w-full flex flex-row justify-between items-center mx-16'>
                    <div className='flex items-center gap-4'>
                        <button
                            className="text-sky-500 bg-white border border-sky-500 p-2 rounded-md lg:hidden"
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                        <div className='columnaLogo'>
                            <img
                                src="/assets/img/consumidores-damnificados/consulogo.png"
                                alt="Logo"
                                className='w-full h-full object-contain'
                            />
                        </div>
                    </div>
                    <div className='columnaIcono w-[80px] flex flex-row justify-between items-center'>
                        <FaUser className="text-sky-500 text-xl" />
                        <h1 className='text-lg'>Admin</h1>
                    </div>
                </div>
            </header>
        </>
    );
};

export default HeaderAdmin;