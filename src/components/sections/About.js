"use client";

import React from 'react';
import styles from '../../app/home.module.css';

const About = ({ aboutRef, aboutVisible }) => (
  <section
    ref={aboutRef}
    id="about-section"
    className={`min-h-screen flex items-center justify-center bg-white text-center px-4 py-12 snap-start ${styles["animate-on-scroll"]} ${aboutVisible ? styles["is-visible"] : ""}`}
  >
    <div className={`container mx-auto max-w-5xl ${aboutVisible ? styles["scale-in"] : ""}`}>
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 ${aboutVisible ? styles["fade-in-up"] : ""}`}
      >
        Sobre <span className="text-blue-700">Giovani Zavan</span>
      </h2>
      <p
        className={`text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 ${aboutVisible ? styles["fade-in-up"] + " " + styles["delay-200"] : ""}`}
      >
        Na ZVN Assessoria, você terá o acompanhamento exclusivo de <strong>Giovani Zavan</strong>, um especialista apaixonado por esporte e dedicado a transformar seu potencial em conquistas reais.
      </p>
      <p
        className={`text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed ${aboutVisible ? styles["fade-in-up"] + " " + styles["delay-400"] : ""}`}
      >
        Seja para superar seus primeiros limites ou alcançar pódios, Giovani Zavan é o seu parceiro estratégico. Ele combina ciência, metodologia e paixão para que você não apenas treine, mas evolua de forma sustentável e vitoriosa.
      </p>
    </div>
  </section>
);

export default About; 