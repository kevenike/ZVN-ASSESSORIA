"use client";

import React from 'react';
import styles from '../../app/home.module.css';

const cards = [
  {
    icon: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: "Análise de Dados Avançada",
    desc: "Utilizamos métricas precisas para otimizar seu treino e prever seu desempenho.",
    anim: styles["fade-in-left"]
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8L11 2m9 20v-8m0 0h-8m8 0L13 22" /></svg>
    ),
    title: "Planos Individualizados",
    desc: "Treinamento feito sob medida para suas metas, limitações e evolução constante.",
    anim: styles["fade-in-up"] + " " + styles["delay-200"]
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2m2-4h10m0 0l3-3m-3 3l3 3m0 0l3-3" /></svg>
    ),
    title: "Acompanhamento Profissional",
    desc: "Atendimento feito por um profissional capacitado, cuidando da sua saúde, desempenho e evolução de forma completa.",
    anim: styles["fade-in-right"] + " " + styles["delay-400"]
  }
];

const Methodology = ({ methodologyRef, methodologyVisible }) => (
  <section
    ref={methodologyRef}
    id="methodology-section"
    className={`min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 snap-start ${styles["animate-on-scroll"]} ${methodologyVisible ? styles["is-visible"] : ""}`}
  >
    <div className={`container mx-auto max-w-6xl ${methodologyVisible ? styles["fade-in-up"] : ""}`}>  
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12 text-center ${methodologyVisible ? styles["fade-in-up"] : ""}`}>
        Nossa <span className="text-blue-700">Metodologia</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, idx) => (
          <div
            key={card.title}
            className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ${methodologyVisible ? card.anim : ""}`}
          >
            <div className="text-blue-600 mb-3 sm:mb-4">{card.icon}</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">{card.title}</h3>
            <p className="text-sm sm:text-base text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Methodology; 