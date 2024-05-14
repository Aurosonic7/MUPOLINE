import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);

    const handleTituloChange = (e) => {
        setTitulo(e.target.value);
    };

    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);
    };

    const handleArchivoChange = (e) => {
        // Aquí puedes manejar la lógica para guardar el archivo
        setArchivo(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para enviar los datos del formulario
        console.log('Título:', titulo);
        console.log('Descripción:', descripcion);
        console.log('Archivo:', archivo);
        // Cerrar el modal después de enviar el formulario
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-4">Agregar Obra</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título de la obra</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    value={titulo}
                                    onChange={handleTituloChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción de la obra</label>
                                <textarea
                                    id="descripcion"
                                    value={descripcion}
                                    onChange={handleDescripcionChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="archivo" className="block text-sm font-medium text-gray-700">Archivo</label>
                                <input
                                    type="file"
                                    id="archivo"
                                    onChange={handleArchivoChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
