"use client";
import React, { useState, useEffect } from 'react';
import ModalEmpleado from '@/app/components/Modals/ModalEmpleado';
import ModalDeleteEmpleado from '@/app/components/Modals/ModalDeleteEmpleado';
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getWorkers, deleteWorker, updateWorker } from '@/app/api/workers';

const Trabajadores = () => {
    const { data: session, status, data } = useSession();
    const router = useRouter();

    const [workers, setWorkers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [empleadoToEdit, setEmpleadoToEdit] = useState(null);
    const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/pages/login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await getWorkers();
                setWorkers(response);
            } catch (error) {
                console.error('Error fetching workers:', error);
            }
        };
        fetchWorkers();
    }, []);

    useEffect(() => {
        if (status === "authenticated" && data?.user?.isAdmin !== true) {
            router.push("/pages/Obras");
        }
    }, [status, data, router]);


    const openModalAdd = () => {
        setIsModalOpen(true);
        setIsEditMode(false);
        setEmpleadoToEdit(null);
    };

    const openModalEdit = (empleado) => {
        setIsModalOpen(true);
        setIsEditMode(true);
        setEmpleadoToEdit(empleado);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEmpleadoToEdit(null);
        setIsEliminarModalOpen(false);
    };

    const openEliminarModal = (idworker) => {
        const empleado = workers.find((worker) => worker.id === idworker);
        setIsEliminarModalOpen(true);
        setEmpleadoToEdit(empleado);
    };

    const handleDelete = async () => {
        if (!empleadoToEdit) {
            console.error('No hay trabajador seleccionado para eliminar');
            return;
        }
        try {
            await deleteWorker(empleadoToEdit.id);
            const updatedWorkers = workers.filter((worker) => worker.id !== empleadoToEdit.id);
            setWorkers(updatedWorkers);
            setIsEliminarModalOpen(false);
            setEmpleadoToEdit(null);
            console.log(`Trabajador con id ${empleadoToEdit.id} eliminado exitosamente`);
        } catch (error) {
            console.error('Error al eliminar trabajador:', error);
        }
    };

    const handleUpdate = async (workerToUpdate) => {
        if (!workerToUpdate) {
            console.error('No hay trabajador seleccionado para actualizar');
            return;
        }
        try {
            await updateWorker(workerToUpdate.id, workerToUpdate.email, workerToUpdate.password);
            const updatedWorkers = workers.map((worker) =>
                worker.id === workerToUpdate.id ? workerToUpdate : worker
            );
            setWorkers(updatedWorkers);
            console.log(`Trabajador con id ${workerToUpdate.id} actualizado exitosamente`);
        } catch (error) {
            console.error('Error al actualizar trabajador:', error);
        }
    };

    if (status === "unauthenticated" || !data?.user?.isAdmin || status === "loading" || !session) {
        return null;
    }

    return (
        <>
            <h1 className='text-center'>Administradores</h1>
            <div className="grid justify-items-end">
                <button className="bg-[#E3DE65] text-black px-4 py-2 mt-4 mr-10 rounded-full" onClick={openModalAdd} >
                    Agregar
                </button>
            </div>
            <div className='m-4 overflow-x-auto'>
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
                                <td className="border border-black px-4 py-2">{worker.id}</td>
                                <td className="border border-black px-4 py-2">{worker.email}</td>
                                <td className="border border-black px-4 py-2">{worker.password}</td>
                                <td className="border border-black px-4 py-2">{worker.isAdmin ? 'Admin' : 'No admin'}</td>
                                <td className="border border-black px-4 py-2">
                                    <div className="flex items-center space-x-2">
                                        {worker.isAdmin !== true && (
                                            <button
                                                type="button"
                                                className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 cursor-pointer"
                                                onClick={() => openEliminarModal(worker.id)}>
                                                <MdDeleteForever className="text-white" />
                                            </button>
                                        )}
                                        <button
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 cursor-pointer" 
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
            <ModalEmpleado
                isOpen={isModalOpen}
                onClose={closeModal}
                isEditMode={isEditMode}
                empleado={empleadoToEdit}
                onUpdate={handleUpdate}
            />
            <ModalDeleteEmpleado
                isOpen={isEliminarModalOpen}
                onClose={closeModal}
                empleado={empleadoToEdit}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default Trabajadores;
