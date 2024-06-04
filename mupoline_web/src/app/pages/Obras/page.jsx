"use client";
import React, { useState, useEffect } from 'react';
import ModalObra from '@/app/components/Modals/ModalObra';
import ModalDelete from '@/app/components/Modals/ModalDeleteObra';
import { HiOutlineDownload } from "react-icons/hi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { getAllArtworks } from '@/app/api/artworks';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Obras = () => {
    const { data: session, status, data } = useSession();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [obraToEdit, setObraToEdit] = useState(null);
    const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);
    const [obras, setObras] = useState([]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/pages/login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const artworks = await getAllArtworks();
                console.log(artworks);
                setObras(Array.isArray(artworks.artworks) ? artworks.artworks : []); // Asegúrate de que sea un array
            } catch (error) {
                console.error('Failed to fetch artworks', error);
                setObras([]); // Maneja el error estableciendo un array vacío
            }
        };

        fetchArtworks();
    }, []);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/pages/Obras");
        }
    }, [status, data, router]);

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

    if (status === "unauthenticated" || status === "loading" || !session) {
        return null;
    }

    return (
        <div>
            <h1 className='text-center'>Obras</h1>
            <div className="grid justify-items-end">
                <button className="bg-[#E3DE65] text-black px-4 py-2 mt-4 mr-10 rounded-full"
                    onClick={openModalAdd} >
                    Agregar Obra
                </button>
            </div>
            <div className='m-4 overflow-x-auto'>
                <table className="table-auto border-collapse border border-black w-full">
                    <thead style={{ background: 'rgba(85, 47, 2, 0.82)' }} className="text-white">
                        <tr>
                            <th className="border border-black px-4 py-2">ID</th>
                            <th className="border border-black px-4 py-2">Título de la obra</th>
                            <th className="border border-black px-4 py-2">Descripción de la obra en texto</th>
                            <th className="border border-black px-4 py-2">Descripción de la obra en audio</th>
                            <th className="border border-black px-4 py-2">Imagen</th>
                            <th className="border border-black px-4 py-2">QR</th>
                            <th className="border border-black px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obras.map((obra) => (
                            <tr key={obra.id}>
                                <td className="border border-black px-4 py-2">{obra.id}</td>
                                <td className="border border-black px-4 py-2">{obra.title}</td>
                                <td className="border border-black px-4 py-2">{obra.description}</td>
                                <td className="border border-black px-4 py-2">
                                    {obra.audio && <audio controls src={`http://localhost:5001/uploads/${obra.audio}`}></audio>}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    {obra.image && <img src={`http://localhost:5001/uploads/${obra.image}`} alt={obra.title} className="w-16 h-16 object-cover" />}
                                </td>
                                <td className="border border-black px-4 py-2 justify-center">
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
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalObra isOpen={isModalOpen} onClose={closeModal} isEditMode={isEditMode} obra={obraToEdit} />
            <ModalDelete isOpen={isEliminarModalOpen} onClose={closeModal} obra={obraToEdit} onConfirm={handleDelete} />
        </div>
    );
};

export default Obras;
