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
            <div className='m-4'>
                <table className="table-auto border-collapse border border-black w-full">
                    <thead style={{ background: 'rgba(192, 120, 34, 0.82)' }} className="text-black">
                        <tr>
                            <th className="border border-black px-4 py-2">Titulo</th>
                            <th className="border border-black px-4 py-2">Descripción</th>
                            <th className="border border-black px-4 py-2">Audio</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black px-4 py-2">Seres de luz</td>
                            <td className="border border-black px-4 py-2" style={{ textAlign: "center", verticalAlign: "middle" }}>....................................</td>
                            <td className="border border-black px-4 py-2" style={{ textAlign: "center", verticalAlign: "middle" }}>Audio</td>
                        </tr>
                        
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Obras;
