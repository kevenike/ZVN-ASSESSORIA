"use client";
import React from "react";
import styles from "../../app/home.module.css";
import { FaInstagram } from "react-icons/fa";

const achievements = [
  {
    aluno: "Tales Garcia",
    fotoAluno: "/perfil-thales.png", // Imagem do Thales
    instagram: "https://www.instagram.com/taalles._/", // Link do Instagram
    conquistas: [
      {
        evento: "Copa Interior de Duathlon",
        resultado: "1º Categoria, 8º Geral",
        tempo: "01:09:32"
      },
      {
        evento: "Corrida 5km (Cardio no Parque)",
        resultado: "1º Lugar",
        tempo: "18:48",
        pace: "3:46"
      },
      {
        evento: "Corrida 5km (Paulista)",
        resultado: "2º Lugar",
        tempo: "18:51",
        pace: "3:47"
      },
      {
        evento: "Corrida 5km (Açaí Sport)",
        resultado: "3º Lugar",
        tempo: "19:51",
        pace: "3:51"
      }
    ]
  }
];

const Achievements = ({ achievementsRef, achievementsVisible }) => (
  <section
    ref={achievementsRef}
    id="achievements-section"
    className={`min-h-[40vh] flex flex-col items-center justify-center bg-white px-4 py-12 snap-start ${styles["animate-on-scroll"]} ${achievementsVisible ? styles["is-visible"] : ""}`}
  >
    <div className={`container mx-auto max-w-3xl text-center ${achievementsVisible ? styles["fade-in-up"] : ""}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
        Conquistas <span className="text-blue-700">do Atleta</span>
      </h2>
      <div className="flex flex-col items-center gap-8">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center w-full max-w-xl hover:shadow-xl transition duration-300"
          >
            <img
              src={item.fotoAluno}
              alt={`Foto de ${item.aluno}`}
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 mb-4 shadow-md"
              onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/2563eb/fff?text=Aluno'; }}
            />
            <h3 className="text-2xl font-extrabold text-blue-700 mb-4">{item.aluno}</h3>
            <a 
              href={item.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 mb-4 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <ul className="text-left w-full max-w-md mx-auto space-y-4">
              {item.conquistas.map((c, i) => (
                <li key={i} className="bg-white rounded-lg p-4 shadow border border-gray-100">
                  <div className="font-bold text-gray-800 text-lg mb-1">{c.evento}</div>
                  <div className="text-blue-700 font-semibold">{c.resultado}</div>
                  <div className="text-gray-600 text-sm">
                    {c.tempo && <>Tempo: <span className="font-medium">{c.tempo}</span></>}
                    {c.pace && <span> &nbsp;|&nbsp; Pace: <span className="font-medium">{c.pace}</span></span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Achievements; 