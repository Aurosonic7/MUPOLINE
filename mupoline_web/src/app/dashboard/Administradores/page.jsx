"use client";
import React, { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import Modal2 from '@/components/Modal2/Modal2';
import Modal2Delete from '@/components/Modal2Delete/ModalDelete';

import ModalDelete from '@/components/ModalDelete/ModalDelete';
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
            <h1 className='text-center'>Administradores</h1>
            <div className="grid justify-items-end">
                <button
                    className="bg-[#E3DE65] text-black px-4 py-2 mt-4 mr-10 rounded-full"
                    onClick={() => openModalAdd(true)}
                >
                    Agregar
                </button>
            </div>
            <div className='m-4'>
                <table className="table-auto border-collapse border border-black w-full">
                    <thead style={{ background: 'rgba(85, 47, 2, 0.82)' }} className="text-white">
                        <tr>
                            <th className="border border-black px-4 py-2">ID</th>
                            <th className="border border-black px-4 py-2">Correo</th>
                            <th className="border border-black px-4 py-2">Contraseña</th>
                            <th className="border border-black px-4 py-2">Admin</th>
                            <th className="border border-black px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black px-4 py-2">1</td>
                            <td className="border border-black px-4 py-2">correo2@email.com</td>
                            <td className="border border-black px-4 py-2">*********</td>
                            <td className="border border-black px-4 py-2">Admin</td>
                         
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
            <Modal2 isOpen={isModalOpen} onClose={closeModal} isEditMode={isEditMode} obra={obraToEdit} />
            <Modal2Delete isOpen={isEliminarModalOpen} onClose={closeModal} obra={obraToEdit} onConfirm={handleDelete} />
        </div>
    );
};

export default Obras;
