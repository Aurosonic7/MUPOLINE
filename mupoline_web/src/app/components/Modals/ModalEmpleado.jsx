import React, { useState, useEffect } from 'react';
import { registerWorker, updateWorker } from '@/app/api/workers';
import Swal from 'sweetalert2';

const ModalEmpleado = ({ isOpen, onClose, isEditMode, empleado }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const empleadoId = empleado ? empleado.id : null;

    useEffect(() => {
        if (!isEditMode) {
            setEmail('');
            setPassword('');
            setPassword2('');
        } else if (empleado){
            setEmail(empleado.email);
            setPassword(empleado.password);
            setPassword2(empleado.password);
        }
    }, [isOpen]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePasswords(e.target.value, password2);
    };

    const handlePassword2Change = (e) => {
        setPassword2(e.target.value);
        validatePasswords(password, e.target.value);
    };

    const validatePasswords = (pwd1, pwd2) => {
        if (pwd1 !== pwd2) {
            setErrorMessage('La contraseña no coincide');
        } else {
            setErrorMessage('');
        }
    };

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: successMessage,
                showConfirmButton: false,
                timer: 1500,
                width: '250px',
            }).then(() => {
                window.location.reload();
            });
        }
    }, [successMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                await updateWorker(empleadoId, email, password);
                setSuccessMessage('Usuario actualizado');
            } else {
                await registerWorker(email, password);
                setSuccessMessage('Usuario registrado');
            }
        } catch (error) {
            console.error('Error', error.message);
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            }
            console.log(error.config);
        }

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
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 self-center col-span-1">Email</label>
                                <input type="text" id="email" value={email} onChange={handleEmailChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 self-center col-span-1">Password</label>
                                <input id="password" value={password} onChange={handlePasswordChange} type="password"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="password2" className="block text-sm font-medium text-gray-700 self-center col-span-1">Confirmar Password</label>
                                <input id="password2" value={password2} onChange={handlePassword2Change} type="password"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                />
                            </div>

                            {errorMessage && <p className="text-red-500 text-sm mb-4 text-right">{errorMessage}</p>}

                            <div className="flex justify-end">
                                <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 mr-4">Cancelar</button>
                                <button
                                    type="submit"
                                    className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400"
                                    disabled={errorMessage}
                                    style={{ cursor: errorMessage ? 'not-allowed' : 'pointer' }}
                                >
                                    {isEditMode ? 'Actualizar' : 'Registrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalEmpleado;
