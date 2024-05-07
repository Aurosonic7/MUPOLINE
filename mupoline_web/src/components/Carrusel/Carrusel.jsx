"use client";
import React, { useState } from 'react';

const Carrusel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imageUrl: 'https://via.placeholder.com/800x400?text=Slide+1',
      title: 'Carnaval',
      author: 'Por Adolfo Pérez Butrón',
      description: 'En el lienzo, el espectador es transportado a un mundo lleno de energía y celebración. Los personajes están representados con trazos vivos y expresivos, cada uno con su propio atuendo extravagante y máscaras elaboradas. La paleta de colores es deslumbrante, con tonos brillantes que se entrelazan para crear una sensación de movimiento y alegría desbordante. Butrón logra capturar no solo la estética visual del carnaval, sino también su atmósfera festiva y bulliciosa. A través de su dominio del color y la composición, invita al espectador a sumergirse en la magia del momento, donde la música, la danza y la tradición se fusionan en una celebración única.',
    },
    {
      imageUrl: 'https://via.placeholder.com/800x400?text=Slide+2',
      title: 'Titulo Slide 2',
      author: 'Autor Slide 2',
      description: 'Descripción Slide 2',
    },
    {
      imageUrl: 'https://via.placeholder.com/800x400?text=Slide+3',
      title: 'Titulo Slide 3',
      author: 'Autor Slide 3',
      description: 'Descripción Slide 3',
    },
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="relative bg-cover bg-center bg-gray-100 overflow-hidden" style={{ backgroundImage: `url('/image/fondoCarrusel.png')` }}>
      <div className="flex space-x-4 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-screen h-96 flex-shrink-0 flex">
            <div className="w-1/2 flex justify-center items-center">
              <div className="w-3/4 h-3/4 bg-cover bg-center" style={{ backgroundImage: `url(${slide.imageUrl})` }}></div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="text-white w-3/4">
                <h2 className="text-4xl font-bold" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '35px', lineHeight: '42px', display: 'flex', alignItems: 'center', color: '#000000' }}>{slide.title}</h2>
                <p className="text-xl" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '15px', lineHeight: '18px', display: 'flex', alignItems: 'center', color: '#000000' }}>Autor: {slide.author}</p>
                <p className="text-lg" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '19px', display: 'flex', alignItems: 'center', color: '#000000' }}>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
      <button className="absolute inset-y-0 left-0 flex justify-center items-center w-12 text-white hover:bg-opacity-75 transition-opacity duration-500 ease-in-out" onClick={prevSlide}>
        &lt;
      </button>
      <button className="absolute inset-y-0 right-0 flex justify-center items-center w-12 text-white hover:bg-opacity-75 transition-opacity duration-500 ease-in-out" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Carrusel;
