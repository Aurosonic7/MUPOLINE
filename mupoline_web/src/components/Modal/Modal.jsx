import React, { useState } from 'react';

const Modal = ({ isOpen, onClose,  isEditMode, obra  }) => {
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
        const file = e.target.files[0];
        if (file) {
            setArchivo(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Título:', titulo);
        console.log('Descripción:', descripcion);
        console.log('Archivo:', archivo);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-xl font-bold mb-6 text-center">{isEditMode ? 'Actualizar Obra' : 'Agregar Obra'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 self-center col-span-1">Título de la obra</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    value={titulo}
                                    onChange={handleTituloChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 self-center col-span-1">Descripción de la obra</label>
                                <textarea
                                    id="descripcion"
                                    value={descripcion}
                                    onChange={handleDescripcionChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="archivo" className="block text-sm font-medium text-gray-700">Archivo de audio</label>
                                <div className="flex items-center">
                                    <input
                                        type="file"
                                        id="archivo"
                                        onChange={handleArchivoChange}
                                        className="hidden"
                                        required
                                    />
                                    {archivo && <p className="ml-4 text-sm text-gray-700 mr-5">{archivo}</p>}
                                    <label htmlFor="archivo" className="px-4 py-2 bg-black text-white rounded-full cursor-pointer hover:bg-gray-900">Adjuntar</label>
                                </div>
                            </div>


                            <div className="flex justify-end">
                                <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 mr-4">Cancelar</button>
                                <button type="submit" className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 ">{isEditMode ? 'Actualizar' : 'Agregar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
