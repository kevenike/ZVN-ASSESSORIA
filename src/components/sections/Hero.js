"use client";

import React from 'react';
import styles from '../../app/home.module.css';

const Hero = ({ heroRef, heroVisible, scrollToSection, contactRef }) => (
  <section
    ref={heroRef}
    id="hero-section"
    className={`relative min-h-screen flex items-center justify-center text-center p-4 pt-20 md:pt-24 bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden snap-start ${styles["animate-on-scroll"]} ${heroVisible ? styles["is-visible"] : ""}`}
  >
    <div className="absolute top-0 left-0 w-full h-full opacity-30">
      <div className={`absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-400 opacity-20 blur-xl ${heroVisible ? styles["animate-float-1"] : ""}`}></div>
      <div className={`absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-blue-500 opacity-20 blur-xl ${heroVisible ? styles["animate-float-2"] : ""}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-300 opacity-20 blur-xl ${heroVisible ? styles["animate-float-3"] : ""}`}></div>
    </div>
    <div className={`relative z-10 max-w-5xl mx-auto px-4 ${heroVisible ? styles["fade-in-up"] : ""}`}>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-6">
        <span className="text-blue-700 block sm:inline">ZVN Assessoria:</span> Performance Sem Limites
      </h1>
      <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-10 ${heroVisible ? styles["fade-in-up"] + " " + styles["delay-200"] : ""}`}>
        Transformamos seu potencial em resultados. Treinamento personalizado, ciência e paixão pelo esporte.
      </p>
      <div className={`${heroVisible ? styles["fade-in-up"] + " " + styles["delay-400"] : ""}`}>
        <button
          onClick={() => scrollToSection(contactRef)}
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg sm:text-xl"
        >
          Comece Sua Jornada
        </button>
      </div>
      <div className={`mt-8 md:mt-12 text-gray-600 ${heroVisible ? styles["fade-in-up"] + " " + styles["delay-600"] : ""}`}>
        <p className="text-sm">SCROLL DOWN</p>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mt-2 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </div>
  </section>
);

export default Hero; 