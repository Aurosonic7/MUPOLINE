import React, { useState } from 'react';

const ModalEmpleado = ({ isOpen, onClose,  isEditMode, obra  }) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleemailChange = (e) => {
        setemail(e.target.value);
    };

    const handlepasswordChange = (e) => {
        setpassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={handleemailChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 self-center col-span-1">password</label>
                                <textarea
                                    id="password"
                                    value={password}
                                    onChange={handlepasswordChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                ></textarea>
                            </div>


                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 self-center col-span-1">Confirmar password</label>
                                <textarea
                                    id="password"
                                    value={password}
                                    onChange={handlepasswordChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                ></textarea>
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
