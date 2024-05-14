"use client";
import React, { useState } from 'react';
import Modal from '@/components/Modal/Modal';

const Obras = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1 className='text-center'>Obras</h1>
            <div className="grid justify-items-end">
                <button
                    className="bg-[#E3DE65] text-black px-4 py-2 rounded-md mt-4 mr-10 rounded-full"
                    onClick={() => setIsModalOpen(true)}
                >
                    Agregar Obra
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Obras;
