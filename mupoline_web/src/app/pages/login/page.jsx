"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const facebook = '/image/MUPO.jpg';

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useSearchParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setError(params.get("error"));
        setSuccess(params.get("success"));
        if (status === "authenticated") {
            router?.push("/pages/Obras");
        }
    }, [params, status, router]);
    

    const handleLogin = async () => {
        signIn("credentials", {
            email,
            password,
        });
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">
                <div className="max-w-sm w-full">
                    <h2 className="text-4xl font-bold mb-4">Login</h2>
                    <div className='text-center m-3'>
                        {error && <span className="text-red-500">{error}</span>}
                    </div>
                    <form>
                        <div className="mb-6">
                            <input
                                className="shadow appearance-none border rounded-full w-full py-4 px-5 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Correo electrónico"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                className="shadow appearance-none border rounded-full w-full py-4 px-5 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline w-full"
                            type="button"
                            onClick={handleLogin}
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
