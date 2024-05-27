"use client";
import React, { useState } from 'react';
import ModalObra from '@/app/components/Modals/ModalObra';
import ModalDelete from '@/app/components/Modals/ModalDeleteObra';
import { HiOutlineDownload } from "react-icons/hi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

const Obras = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [obraToEdit, setObraToEdit] = useState(null);
    const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);

    const obra = null;
    const openModalAdd = () => {
        setIsModalOpen(true);
        setIsEditMode(false);
        setObraToEdit(null);
    };

    const openModalEdit = (obra) => {
        setIsModalOpen(true);
        setIsEditMode(true);
        setObraToEdit(obra);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setObraToEdit(null);
        setIsEliminarModalOpen(false);
    };

    const openEliminarModal = (obra) => {
        setIsEliminarModalOpen(true);
        setObraToEdit(obra);
    };

    const handleDelete = () => {
        setIsEliminarModalOpen(false);
        setObraToEdit(null);
    };

    return (
        <div>
            <h1 className='text-center'>Obras</h1>
            <div className="grid justify-items-end">
                <button
                    className="bg-[#E3DE65] text-black px-4 py-2 mt-4 mr-10 rounded-full"
                    onClick={() => openModalAdd(true)}
                >
                    Agregar Obra
                </button>
            </div>
            <div className='m-4'>
                <table className="table-auto border-collapse border border-black w-full">
                    <thead style={{ background: 'rgba(85, 47, 2, 0.82)' }} className="text-white">
                        <tr>
                            <th className="border border-black px-4 py-2">ID</th>
                            <th className="border border-black px-4 py-2">Título de la obra</th>
                            <th className="border border-black px-4 py-2">Descripción de la obra en texto</th>
                            <th className="border border-black px-4 py-2">Descripción de la obra en audio</th>
                            <th className="border border-black px-4 py-2">QR</th>
                            <th className="border border-black px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black px-4 py-2">1</td>
                            <td className="border border-black px-4 py-2">Flores en una mesa</td>
                            <td className="border border-black px-4 py-2">Obra abstracta con fines demostrativos</td>
                            <td className="border border-black px-4 py-2">Audio</td>
                            <td className="px-4 py-2 flex justify-center items-center">
                                <button style={{ background: 'rgba(185, 115, 34, 0.72)' }} className='flex items-center justify-center h-10 w-10 rounded-xl    '>
                                    <HiOutlineDownload />
                                </button>
                            </td>
                            <td className="border border-black px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 cursor-pointer"
                                        onClick={() => openEliminarModal(obra)}>
                                        <MdDeleteForever className="text-white" />
                                    </button>
                                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 cursor-pointer" 
                                        onClick={() => openModalEdit(obra)}>
                                        <MdModeEdit className="text-white" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

            </div>
            <ModalObra isOpen={isModalOpen} onClose={closeModal} isEditMode={isEditMode} obra={obraToEdit} />
            <ModalDelete isOpen={isEliminarModalOpen} onClose={closeModal} obra={obra} onConfirm={handleDelete} />
        </div>
    );
};

export default Obras;
