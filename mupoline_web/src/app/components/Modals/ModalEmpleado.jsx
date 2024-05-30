
import React, { useState, useEffect } from 'react';
import { registerWorker, updateWorker } from '@/app/api/workers';

const ModalEmpleado = ({ isOpen, onClose, isEditMode, empleado }) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [password2, setpassword2] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const empleadoId = empleado ? empleado.id : null;

    useEffect(() => {
        if (isEditMode) {
            setemail(empleado.email);
            setpassword(empleado.password);
            setpassword2(empleado.password);
        }
    }, [empleado]);

    const handleemailChange = (e) => {
        setemail(e.target.value);
    };

    const handlepasswordChange = (e) => {
        setpassword(e.target.value);
    };

    const handlepassword2Change = (e) => {
        setpassword2(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            if (isEditMode) {
                await updateWorker(empleadoId, email, password);
                setSuccessMessage('Usuario actualizado');
            } else {
                await registerWorker(email, password);
                setSuccessMessage('Usuario registrado');
            }
            window.location.reload();
        } catch (error) {
            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un estado de error
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió ninguna respuesta
                console.log(error.request);
            } else {
                // Algo sucedió en la configuración de la solicitud que provocó un error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }

        console.log('email:', email);
        console.log('password:', password);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-6 text-center">{isEditMode ? 'Actualizar Empleado' : 'Alta Empleado'}</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 self-center col-span-1">email</label>
                                <input type="text" id="email" value={email} onChange={handleemailChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 self-center col-span-1">password</label>
                                <input id="password" value={password} onChange={handlepasswordChange} type="password"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                ></input>
                            </div>

                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 self-center col-span-1">Confirmar password</label>
                                <input id="password2" value={password2} onChange={handlepassword2Change} type="password"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                ></input>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 mr-4">Cancelar</button>
                                <button type="submit" className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 ">{isEditMode ? 'Actualizar' : 'Registrar'}</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalEmpleado;
