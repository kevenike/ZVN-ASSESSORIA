"use client";

import React from 'react';
import styles from '../../app/home.module.css';

const whatsappNumber = '11930207612';
const whatsappLink = `https://wa.me/${whatsappNumber}`;

const Contact = ({ contactRef, contactVisible }) => (
  <section
    ref={contactRef}
    id="contact-section"
    className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4 py-12 snap-start ${styles["animate-on-scroll"]} ${contactVisible ? styles["is-visible"] : ""}`}
  >
    <div className={`container mx-auto max-w-4xl text-center ${contactVisible ? styles["fade-in-up"] : ""}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 md:mb-8">
        <span className="text-blue-700">Pronto para Alcançar o Próximo Nível?</span>
        <br />
        <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mt-2 sm:mt-4 block">
          Fale diretamente com Giovani Zavan!
        </span>
      </h2>
      <div className="text-blue-700 mb-4 sm:mb-6">
        <svg
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto transform -rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          ></path>
        </svg>
      </div>
      <p className={`text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-10 ${contactVisible ? styles["fade-in-up"] + " " + styles["delay-200"] : ""}`}>
        Sua jornada de alta performance começa aqui. Clique no botão abaixo e fale diretamente com Giovani no WhatsApp.
      </p>
      <a
        href="https://wa.me/5511930207612?text=Olá%20Giovani,%20quero%20iniciar%20minha%20jornada%20de%20alta%20performance.%20Poderia%20me%20ajudar?"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg sm:text-xl ${contactVisible ? styles["fade-in-up"] + " " + styles["delay-400"] : ""}`}
      >
        Enviar Mensagem para Giovani no WhatsApp
      </a>
      <p className={`text-gray-600 mt-6 sm:mt-8 text-base sm:text-lg ${contactVisible ? styles["fade-in-up"] + " " + styles["delay-600"] : ""}`}>
        Ou se preferir, salve o número e envie uma mensagem manualmente:
        <a
          href="https://wa.me/5511930207612"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline font-semibold"
        >
          (11) 93020-7612
        </a>
      </p>
    </div>
  </section>
);

export default Contact; 