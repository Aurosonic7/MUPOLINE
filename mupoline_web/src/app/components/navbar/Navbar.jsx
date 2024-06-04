"use client";
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

const logo = '/image/LOGO.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status, data } = useSession();
    const router = useRouter();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleSignOut = async () => {
        signOut();
        router.push('/pages/login');
    };

    const menuLinks = [
        { href: "/", label: "Inicio", visible: true },
        { href: "/#nosotros", label: "Nosotros", visible: true },
        { href: "/pages/Obras", label: "Obras", visible: status === "authenticated" },
        { href: "/pages/Administradores", label: "Trabajadores", visible: status === "authenticated" && data?.user?.isAdmin },
        { href: "/pages/login", label: "LOGIN", visible: status !== "authenticated" }
    ];

    return (
        <nav className="bg-gradient-to-r from-white via-40% to-gray-300 to-90% fixed top-0 left-0 right-0 z-50 ">
            <div className="mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex ml-5">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="hidden lg:block h-8 w-auto" src={logo} alt="Logo" />
                            <a href="/" className="text-black font-bold text-lg font-inria-sans m-3">MUPOLINE</a>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="m-3 flex items-baseline space-x-4">
                            {menuLinks.filter(link => link.visible).map((link, index) => (
                                <a key={index} href={link.href} className={`text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${link.label === "LOGIN" ? "bg-red-500" : ""}`} style={{ backgroundColor: link.label === "LOGIN" ? "#B97322" : "" }}>
                                    {link.label}
                                </a>
                            ))}
                            {status === "authenticated" && (
                                <button onClick={handleSignOut} className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: '#B97322' }}>
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleNavbar} className="text-black-300 hover:bg-gray-700 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
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
                    {menuLinks.filter(link => link.visible).map((link, index) => (
                        <a key={index} href={link.href} className={`text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${link.label === "LOGIN" ? "bg-red-500" : ""}`} style={{ backgroundColor: link.label === "LOGIN" ? "#B97322" : "" }}>
                            {link.label}
                        </a>
                    ))}
                    {status === "authenticated" && (
                        <button onClick={handleSignOut} className="text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" style={{ backgroundColor: '#B97322' }}>
                            Sign Out
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
