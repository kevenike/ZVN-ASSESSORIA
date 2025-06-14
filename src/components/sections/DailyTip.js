"use client";
import React, { useState, useEffect } from "react";
import styles from "../../app/home.module.css";

const tips = [
  "A consistência é mais importante do que a intensidade. Treine um pouco todos os dias!",
  "Inclua frutas e vegetais coloridos em todas as refeições para garantir vitaminas e minerais essenciais.",
  "Durma pelo menos 7 horas por noite para potencializar sua recuperação muscular.",
  "Aqueça bem antes de treinar para evitar lesões e melhorar seu desempenho.",
  "Acredite no seu processo. Cada treino é um passo para o seu objetivo!",
  "Hidrate-se ao longo do dia, não só durante o treino.",
  "Respeite seus limites e celebre cada evolução, por menor que seja.",
  "A disciplina de hoje é o resultado de amanhã!"
];

function getRandomTip() {
  return tips[Math.floor(Math.random() * tips.length)];
}

const DailyTip = ({ tipRef, tipVisible }) => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    setTip(getRandomTip());
  }, []);

  const handleNewTip = () => {
    let newTip;
    do {
      newTip = getRandomTip();
    } while (newTip === tip);
    setTip(newTip);
  };

  return (
    <section
      ref={tipRef}
      id="training-tip-section"
      className={`min-h-[40vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12 snap-start ${styles["animate-on-scroll"]} ${tipVisible ? styles["is-visible"] : ""}`}
    >
      <div className={`container mx-auto max-w-2xl text-center ${tipVisible ? styles["fade-in-up"] : ""}`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
          Dica do <span className="text-blue-700">Dia</span>
        </h2>
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 mb-6">
          <p className="text-lg sm:text-xl text-gray-800 font-medium">{tip}</p>
        </div>
        <button
          onClick={handleNewTip}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          Nova Dica
        </button>
      </div>
    </section>
  );
};

export default DailyTip; 