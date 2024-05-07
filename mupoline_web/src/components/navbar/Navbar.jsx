"use client";
import { useState } from 'react';
const logo = '/image/LOGO.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-white via-gray-200 to-afafaf">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex ml-5">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="hidden lg:block h-8 w-auto" src={logo} alt="Logo" />
                            <a href="#" className="text-black font-bold text-lg font-inria-sans m-3">MUPOLINE</a>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="m-3 flex items-baseline space-x-4">
                            <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Nosotros</a>
                            <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{backgroundColor:'#B97322'}}>LOGIN</a>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleNavbar} className="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Elementos del menú para dispositivos móviles */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Inicio</a>
                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Acerca de</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
