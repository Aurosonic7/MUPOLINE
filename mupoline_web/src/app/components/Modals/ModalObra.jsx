import React, { useState, useEffect } from 'react';
import { createArtwork, updateArtwork } from '@/app/api/artworks';
import Swal from 'sweetalert2';

const ModalObra = ({ isOpen, onClose, isEditMode, obra, workerid }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [audio, setAudio] = useState(null);
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const obraId = obra ? obra.id : null;

    useEffect(() => {
        if (!isEditMode) {
            setTitle('');
            setDescription('');
            setAudio(null);
            setImage(null);
        } else if (obra) {
            setTitle(obra.title);
            setDescription(obra.description);
            setAudio(null); // Reset audio for edit mode
            setImage(null); // Reset image for edit mode
        }
    }, [isOpen, isEditMode, obra]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac', 'audio/mp4', 'audio/x-ms-wma'].includes(file.type)) {
                setAudio(file);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid audio file type.',
                    width: '250px'
                });
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                setImage(file);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid image file type.',
                    width: '250px'
                });
            }
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
        if ((!audio || !image) && !isEditMode) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, adjunta los archivos de audio e imagen.',
                width: '250px'
            });
            return;
        }

        try {
            if (isEditMode) {
                await updateArtwork(obraId, title, description, audio, image, workerid);
                setSuccessMessage('Obra actualizada');
            } else {
                await createArtwork(title, description, audio, image, workerid);
                setSuccessMessage('Obra registrada');
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
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al guardar la obra.',
                width: '250px'
            });
        }

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
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 self-center col-span-1">Título de la obra</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-x-4 mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 self-center col-span-1">Descripción de la obra</label>
                                <textarea
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm col-span-2"
                                    id="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    style={{ background: '#E6E6E6', border: '0.3px solid #000000' }}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="audio" className="block text-sm font-medium text-gray-700">Archivo de audio</label>
                                <div className="flex items-center">
                                    <input
                                        type="file"
                                        id="audio"
                                        name="audio"
                                        onChange={handleAudioChange}
                                        className="hidden"
                                    />
                                    {audio && <p className="ml-4 text-sm text-gray-700 mr-5">{audio.name}</p>}
                                    <label
                                        htmlFor="audio"
                                        className="px-4 py-2 bg-black text-white rounded-full cursor-pointer hover:bg-gray-900"
                                    >
                                        Adjuntar
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Imagen</label>
                                <div className="flex items-center">
                                    <input
                                        type="file"
                                        id="imagen"
                                        name="imagen"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    {image && <p className="ml-4 text-sm text-gray-700 mr-5">{image.name}</p>}
                                    <label
                                        htmlFor="imagen"
                                        className="px-4 py-2 bg-black text-white rounded-full cursor-pointer hover:bg-gray-900"
                                    >
                                        Adjuntar
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 mr-4"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400"
                                >
                                    {isEditMode ? 'Actualizar' : 'Agregar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalObra;
