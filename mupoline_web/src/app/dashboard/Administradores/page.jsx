"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal/Modal';
import Modal2 from '@/components/Modal2/Modal2';
import Modal2Delete from '@/components/Modal2Delete/ModalDelete';

import ModalDelete from '@/components/ModalDelete/ModalDelete';
import { HiOutlineDownload } from "react-icons/hi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

import { getWorkers, deleteWorker, registerWorker } from '@/app/api/workers';

const Trabajadores = () => {
    const [workers, setWorkers] = useState([]);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [obraToEdit, setObraToEdit] = useState(null);
    const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);
    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await getWorkers();
                setWorkers(response);
            } catch (error) { console.error('Error fetching workers:', error); }
        };
        fetchWorkers();
    }, []);

    const obra = null;

    const handleInsert = async () => {
        try {
            await registerWorker(email, password);
            const response = await getWorkers();
            setWorkers(response);
            setIsModalOpen(false);
            setObraToEdit(null);
            setEmail('');
            setPassword('');
            console.log('Trabajador registrado exitosamente');
        } catch (error) {
            console.error('Error al registrar trabajador:', error);
        }
    };

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
    const openEliminarModal = (idworker) => {
        const obra = workers.find((worker) => worker.idworker === idworker);
        console.log(`Eliminar el trabajador con id: ${idworker}`);
        setIsEliminarModalOpen(true);
        setObraToEdit(obra);
    };
    const handleDelete = async () => {
        if (!obraToEdit) {
            console.error('No hay trabajador seleccionado para eliminar');
            return;
        }
        try {
            await deleteWorker(obraToEdit.idworker);
            const updatedWorkers = workers.filter((worker) => worker.idworker !== obraToEdit.idworker);
            setWorkers(updatedWorkers);
            setIsEliminarModalOpen(false);
            setObraToEdit(null);
            console.log(`Trabajador con id ${obraToEdit.idworker} eliminado exitosamente`);
        } catch (error) {
            console.error('Error al eliminar trabajador:', error);
        }
    };

    

    return (
        <div>
            <h1 className='text-center'>Administradores</h1>
            <div className="grid justify-items-end">
                <button className="bg-[#E3DE65] text-black px-4 py-2 mt-4 mr-10 rounded-full" onClick={openModalAdd} >
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

                        {workers.map((worker, key) => (
                            <tr key={key}>
                                <td className="border border-black px-4 py-2">{worker.idworker}</td>
                                <td className="border border-black px-4 py-2">{worker.email}</td>
                                <td className="border border-black px-4 py-2">{worker.password}</td>
                                <td className="border border-black px-4 py-2">{worker.idboss === worker.idworker ? 'Admin' : 'No admin'}</td>
                                <td className="border border-black px-4 py-2">
                                    <div className="flex items-center space-x-2">
                                        {worker.idboss !== worker.idworker && (
                                        <button type="submit" className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 cursor-pointer"
                                            onClick={() => openEliminarModal(worker.idworker)}>
                                            <MdDeleteForever className="text-white" />
                                        </button>
                                        )}
                                        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 cursor-pointer" 
                                            onClick={() => openModalEdit(worker)}>
                                            <MdModeEdit className="text-white" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
            <Modal2 isOpen={isModalOpen} onClose={closeModal} isEditMode={isEditMode} obra={obraToEdit} />
            <Modal2Delete isOpen={isEliminarModalOpen} onClose={closeModal} obra={obraToEdit} onConfirm={handleDelete} />
        </div>
    );
};

export default Trabajadores;
