"use client";

import React from 'react';
import styles from '../../app/home.module.css';

const images = [
  {
    src: "/Imagem do WhatsApp de 2025-05-24 à(s) 20.42.20_ffbf4217.jpg",
    alt: "Giovani Zavan saindo da água em um triathlon",
    label: "Rompendo Limites",
    delay: "delay-200"
  },
  {
    src: "/Imagem do WhatsApp de 2025-05-24 à(s) 20.50.34_fbc82ab9.jpg",
    alt: "Giovani Zavan correndo em um triathlon",
    label: "Foco no Ritmo",
    delay: "delay-400"
  },
  {
    src: "/Imagem do WhatsApp de 2025-05-24 à(s) 20.50.54_e598d1cc.jpg",
    alt: "Giovani Zavan com bicicleta em transição de triathlon",
    label: "Potência no Pedal",
    delay: "delay-600"
  },
  {
    src: "/Imagem do WhatsApp de 2025-05-24 à(s) 20.41.46_e04382b6.jpg",
    alt: "Giovani Zavan saindo da água após natação",
    label: "Força na Água",
    delay: "delay-800"
  },
  {
    src: "/Imagem do WhatsApp de 2025-05-24 à(s) 20.51.27_cb34f227.jpg",
    alt: "Giovani Zavan pedalando em alta velocidade",
    label: "Transição Perfeita",
    delay: "delay-1000"
  },
  {
    src: "/Imagem do WhatsApp de 2025-05-24 à(s) 20.55.08_eda8f727.jpg",
    alt: "Giovani Zavan correndo em pista",
    label: "Ritmo Implacável",
    delay: "delay-1200"
  },
  {
    src: "/Captura de tela 2025-05-24 233504.png",
    alt: "Giovani Zavan celebrando a chegada",
    label: "Vitória e Conquista",
    delay: "delay-1400"
  },
  {
    src: "/Imagem do WhatsApp de 2025-05-24 à(s) 20.55.07_e2b5535f.jpg",
    alt: "Giovani Zavan em momento de concentração no ciclismo",
    label: "Foco Total",
    delay: "delay-1600"
  }
];

const Gallery = ({ galleryRef, galleryVisible }) => (
  <section
    ref={galleryRef}
    id="gallery-section"
    className={`min-h-screen flex items-center justify-center bg-white px-4 py-12 snap-start ${styles["animate-on-scroll"]} ${galleryVisible ? styles["is-visible"] : ""}`}
  >
    <div className="container mx-auto max-w-6xl text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
        Alta Performance em <span className="text-blue-700">Movimento</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((img, idx) => (
          <div
            key={img.src}
            className={`relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${galleryVisible ? styles["fade-in-up"] + " " + styles[img.delay] : ""}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full aspect-[4/5] object-cover rounded-xl"
              onError={e => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
              }}
            />
            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-base sm:text-lg font-semibold">{img.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery; 