"use client";
import React, { useState, useEffect } from 'react';
import { getAllArtworks } from '@/app/api/artworks';

const Carrusel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [obras, setObras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artworks = await getAllArtworks();
        console.log(artworks);
        setObras(Array.isArray(artworks.artworks) ? artworks.artworks : []);
      } catch (error) {
        console.error('Failed to fetch artworks', error);
        setObras([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? obras.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === obras.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="m-1 relative bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('/image/fondoCarrusel.png')` }}>
      {isLoading && (
        <div className="relative inset-0 flex justify-center items-center bg-white">
          <img src="/image/carga.gif" alt="Carga" width={70} />
        </div>
      )}
      {!isLoading && obras.length > 0 ? (
        <>
          <div className="flex space-x-4 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {obras.map((obra, index) => (
              <div key={index} className="w-screen h-96 flex-shrink-0 flex">
                <div className="w-1/2 flex-shrink-0 overflow-hidden">
                  <img src={`http://localhost:5001/uploads/${obra.image}`} alt={obra.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <div className="text-white w-3/4">
                    <h2 className="text-4xl font-bold" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '35px', lineHeight: '42px', display: 'flex', alignItems: 'center', color: '#000000' }}>{obra.title}</h2>
                    <p className="text-lg" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '19px', display: 'flex', alignItems: 'center', color: '#000000' }}>{obra.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute inset-y-0 left-0 flex justify-center items-center w-12 text-white transition-opacity duration-500 ease-in-out" onClick={prevSlide}>
            &lt;
          </button>
          <button className="absolute inset-y-0 right-0 flex justify-center items-center w-12 text-white transition-opacity duration-500 ease-in-out" onClick={nextSlide}>
            &gt;
          </button>
        </>
      ) : (
        !isLoading && (
          <div className="w-screen h-96 flex-shrink-0 flex justify-center items-center">
            <p className="text-white">No hay obras disponibles.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Carrusel;
