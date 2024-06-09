"use client";
import React, { useState, useEffect } from 'react';
import { getAllArtworks } from '@/app/api/artworks';

const QRDescription = () => {
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const artworks = await getAllArtworks();
                console.log(artworks);
                setArtworks(Array.isArray(artworks.artworks) ? artworks.artworks : []);
            } catch (error) {
                console.error('Failed to fetch artworks', error);
                setArtworks([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    return (
        <div>
            <div className='m-4'>
                {isLoading ? (
                    <div className="relative inset-0 flex justify-center items-center bg-white">
                        <img src="/image/carga.gif" alt="Cargando" width={70} />
                    </div>
                ) : (
                    <table className="table-auto border-collapse border border-black w-full">
                        <thead style={{ background: 'rgba(192, 120, 34, 0.82)' }} className="text-black">
                            <tr>
                                <th className="border border-black px-4 py-2">Titulo</th>
                                <th className="border border-black px-4 py-2">Descripción</th>
                                <th className="border border-black px-4 py-2">Audio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artworks.length > 0 ? (
                                artworks.map((artwork) => (
                                    <tr key={artwork.id}>
                                        <td className="border border-black px-4 py-2">{artwork.title}</td>
                                        <td className="border border-black px-4 py-2" style={{ textAlign: "center", verticalAlign: "middle" }}>{artwork.description}</td>
                                        <td className="border border-black px-4 py-2" style={{ textAlign: "center", verticalAlign: "middle" }}>{artwork.audio ? <audio controls src={artwork.audio}></audio> : 'No Audio'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black px-4 py-2" colSpan="3" style={{ textAlign: "center", verticalAlign: "middle" }}>No hay obras disponibles.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default QRDescription;