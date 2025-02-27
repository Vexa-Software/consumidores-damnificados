import React from 'react';
import { FaUser } from "react-icons/fa";
const HeaderAdmin: React.FC = () => {
    return (
        <>
            <header className='fixed top-0 left-0 right-0 bg-white h-[100px] border-b border-sky-500 flex flex-row justify-between items-center z-50'>
                <div className='w-full flex flex-row justify-between items-center mx-16'>
                    <div className='columnaLogo '>
                        <img
                            src="/assets/img/consumidores-damnificados/consulogo.png"
                            alt="Logo"
                            className='w-full h-full object-contain '
                        >

                        </img>

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