import React from 'react';

const ModalDelete = ({ isOpen, onClose, obra, onConfirm }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-6 text-center">Borrar Empleado</h2>
                        <p className="text-center text-gray-700">¿Está seguro de borrar este empleado? Esta acción es irreversible.</p>
                        <div className="flex justify-center mt-4">
                            <button onClick={onConfirm} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 mr-9">Aceptar</button>
                            <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 ml-9">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalDelete;
