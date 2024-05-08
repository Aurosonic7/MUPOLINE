"use client";
import { useState } from 'react';

const logo = '/image/LOGO.png';
const instagram = '/image/insta.png';
const whatsapp = '/image/whatsapp.png';
const X = '/image/X.png';
const facebook = '/image/facebook.png';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-white via-gray-200 to-afafaf text-black py-8">
            <div className="max-w-full mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-1 ">
                        <img className="h-30 w-auto mb-4 ml-2 md:ml-0" src={logo} alt="Logo" />
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-lg font-bold mb-4">Direccion</h2>
                        <p>Av. Independencia 607, esquina con García Vigil,
                        Col. Oaxaca Centro,C.P. 68000Oaxaca de Juárez, OaxacaTels.:
                        (951) 516 56 45, 514 34 33</p>
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-lg font-bold mb-2">Redes Sociales</h2>
                        <div className="flex">
                            <img src={whatsapp} alt="whatsapp" className="w-10 h-10 mx-2" />
                            <img src={facebook} alt="facebook" className="w-10 h-10 mx-2" />
                            <img src={instagram} alt="instagram" className="w-10 h-10 mx-2" />
                            <img src={X} alt="X" className="w-10 h-10 mx-2" />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-lg font-bold mb-4">Horarios</h2>
                        <p>Martes a domingos de 10 a 18 hrs.
                        Entrada general $20 maestros y estudiantes $10
                        Niños menores de 12 años no pagan.INAPAM $10.00</p>
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-lg font-bold mb-4">Avisos de Privacidad</h2>
                        <ul>
                            <li>Aviso</li>
                            <li>Participa</li>
                            <li>Denuncia</li>
                        </ul>
                    </div>
                </div>
            </div>
        
        </footer>
    );
};

export default Footer;
