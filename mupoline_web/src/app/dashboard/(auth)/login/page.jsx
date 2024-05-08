"use client";
import { useState } from 'react';

const facebook = '/image/MUPO.jpg';
const Login = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">
                <div className="max-w-sm w-full">
                    <h2 className="text-4xl font-bold mb-4">Login</h2>
                    <form>
                        <div className="mb-6">
                            
                            <input
                                className="shadow appearance-none border rounded-full w-full py-4 px-5 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <div className="mb-6">
                            
                            <input
                                className="shadow appearance-none border rounded-full w-full py-4 px-5 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                            />
                        </div>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline w-full"
                            type="button"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="flex-1 bg-gray-300">
                <img src={facebook} className="object-cover w-full h-full" alt="Imagen de inicio de sesión" />
            </div>
        </div>
    );
};

export default Login;
