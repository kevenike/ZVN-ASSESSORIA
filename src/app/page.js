"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import { motion, useSpring, useScroll } from "motion/react";

const App = () => {
  // ... (seus estados e refs existentes)
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const methodologyRef = useRef(null);
  const galleryRef = useRef(null);
  const trainingTipRef = useRef(null);
  const contactRef = useRef(null);

  const [trainingPrompt, setTrainingPrompt] = useState("");
  const [trainingTip, setTrainingTip] = useState("");
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [tipError, setTipError] = useState("");

  const [heroVisible, setHeroVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [methodologyVisible, setMethodologyVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [trainingTipVisible, setTrainingTipVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  // FIM NOVO

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // ... (sua lógica existente do Intersection Observer)
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (entry.target.id) {
            case "hero-section":
              setHeroVisible(true);
              break;
            case "about-section":
              setAboutVisible(true);
              break;
            case "methodology-section":
              setMethodologyVisible(true);
              break;
            case "gallery-section":
              setGalleryVisible(true);
              break;
            case "training-tip-section":
              setTrainingTipVisible(true);
              break;
            case "contact-section":
              setContactVisible(true);
              break;
            default:
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (methodologyRef.current) observer.observe(methodologyRef.current);
    if (galleryRef.current) observer.observe(galleryRef.current);
    if (trainingTipRef.current) observer.observe(trainingTipRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (methodologyRef.current) observer.unobserve(methodologyRef.current);
      if (galleryRef.current) observer.unobserve(galleryRef.current);
      if (trainingTipRef.current) observer.unobserve(trainingTipRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  const generateTrainingTip = async () => {
    // ... (sua lógica existente da API Gemini)
    if (!trainingPrompt.trim()) {
      setTipError(
        "Por favor, descreva seu esporte e objetivo para receber uma dica."
      );
      return;
    }

    setIsLoadingTip(true);
    setTrainingTip("");
    setTipError("");

    try {
      let chatHistory = [];
      chatHistory.push({
        role: "user",
        parts: [
          {
            text: `Gere uma dica de treino concisa e motivacional para um atleta com o seguinte objetivo/desafio: "${trainingPrompt}". Foque em um aspecto prático e inspirador. A dica deve ser em português.`,
          },
        ],
      });
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setTrainingTip(text);
      } else {
        setTipError(
          "Não foi possível gerar a dica de treino. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao chamar a API Gemini:", error);
      setTipError(
        "Ocorreu um erro ao gerar a dica. Verifique sua conexão ou tente mais tarde."
      );
    } finally {
      setIsLoadingTip(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter overflow-x-hidden overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md py-4 px-4 md:px-8 fixed w-full z-50 border-b border-gray-200">
        <nav className="container mx-auto flex justify-between items-center max-w-screen-xl">
          <a
            href="#"
            className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-wide"
          >
            ZVN Assessoria
          </a>
          {/* Menu Desktop */}
          <ul className="hidden md:flex space-x-4 lg:space-x-8">
            <li>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
              >
                Sobre
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(methodologyRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
              >
                Metodologia
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(galleryRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
              >
                Galeria
              </button>
            </li>
            {/*<li>
              <button
                onClick={() => scrollToSection(trainingTipRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
              >
                Dica de Treino 
              </button>
            </li>*/}
            <li>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
              >
                Contato
              </button>
            </li>
          </ul>
          {/* Botão do Menu Hamburguer (Mobile) */}
          <button
            id="mobile-menu-button"
            className="md:hidden text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition duration-300"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </nav>
        {/* Menu Mobile (condicionalmente visível) */}
        <div
          id="mobile-menu"
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden bg-white mt-4 rounded-lg shadow-xl border border-gray-200 mx-4`}
        >
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
              >
                Sobre
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(methodologyRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
              >
                Metodologia
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(galleryRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
              >
                Galeria
              </button>
            </li>
            {/*<li>
              <button
                onClick={() => scrollToSection(trainingTipRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
              >
                Dica de Treino 
              </button>
            </li>*/}
            <li>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
              >
                Contato
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* NOVO: Indicador de Scroll Vertical no Lado Direito */}
      <motion.div
        id="scroll-indicator-vertical"
        style={{
          scaleY,
          position: "fixed",
          top: 0,
          right: 0,
          width: 8,
          height: "100%",
          originY: 0,
          backgroundColor: "#2563EB",
          zIndex: 49,
        }}
      />
      {/* FIM NOVO */}

      {/* Seção Hero */}
      <section
        ref={heroRef}
        id="hero-section"
        className={`relative min-h-screen flex items-center justify-center text-center p-4 pt-20 md:pt-24 bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden snap-start ${
          styles["animate-on-scroll"]
        } ${heroVisible ? styles["is-visible"] : ""}`}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div
            className={`absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-400 opacity-20 blur-xl ${
              heroVisible ? styles["animate-float-1"] : ""
            }`}
          ></div>
          <div
            className={`absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-blue-500 opacity-20 blur-xl ${
              heroVisible ? styles["animate-float-2"] : ""
            }`}
          ></div>
          <div
            className={`absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-300 opacity-20 blur-xl ${
              heroVisible ? styles["animate-float-3"] : ""
            }`}
          ></div>
        </div>

        <div
          className={`relative z-10 max-w-5xl mx-auto px-4 ${
            heroVisible ? styles["fade-in-up"] : ""
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-6">
            <span className="text-blue-700 block sm:inline">
              ZVN Assessoria:
            </span>{" "}
            Performance Sem Limites
          </h1>
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-10 ${
              heroVisible
                ? styles["fade-in-up"] + " " + styles["delay-200"]
                : ""
            }`}
          >
            Transformamos seu potencial em resultados. Treinamento
            personalizado, ciência e paixão pelo esporte.
          </p>
          <div
            className={`${
              heroVisible
                ? styles["fade-in-up"] + " " + styles["delay-400"]
                : ""
            }`}
          >
            <button
              onClick={() => scrollToSection(contactRef)}
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg sm:text-xl"
            >
              Comece Sua Jornada
            </button>
          </div>
          <div
            className={`mt-8 md:mt-12 text-gray-600 ${
              heroVisible
                ? styles["fade-in-up"] + " " + styles["delay-600"]
                : ""
            }`}
          >
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

      {/* Seção Sobre */}
      <section
        ref={aboutRef}
        id="about-section"
        className={`min-h-screen flex items-center justify-center bg-white text-center px-4 py-12 snap-start ${
          styles["animate-on-scroll"]
        } ${aboutVisible ? styles["is-visible"] : ""}`}
      >
        <div
          className={`container mx-auto max-w-5xl ${
            aboutVisible ? styles["scale-in"] : ""
          }`}
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 ${
              aboutVisible ? styles["fade-in-up"] : ""
            }`}
          >
            Sobre <span className="text-blue-700">Giovani Zavan</span>
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 ${
              aboutVisible
                ? styles["fade-in-up"] + " " + styles["delay-200"]
                : ""
            }`}
          >
            Na ZVN Assessoria, você terá o acompanhamento exclusivo de{" "}
            <strong>Giovani Zavan</strong>, um especialista apaixonado por
            esporte e dedicado a transformar seu potencial em conquistas reais.
          </p>
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed ${
              aboutVisible
                ? styles["fade-in-up"] + " " + styles["delay-400"]
                : ""
            }`}
          >
            Seja para superar seus primeiros limites ou alcançar pódios, Giovani
            Zavan é o seu parceiro estratégico. Ele combina ciência, metodologia
            e paixão para que você não apenas treine, mas evolua de forma
            sustentável e vitoriosa.
          </p>
        </div>
      </section>

      {/* Seção Metodologia */}
      <section
        ref={methodologyRef}
        id="methodology-section"
        className={`min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 snap-start ${
          styles["animate-on-scroll"]
        } ${methodologyVisible ? styles["is-visible"] : ""}`}
      >
        <div
          className={`container mx-auto max-w-6xl ${
            methodologyVisible ? styles["fade-in-up"] : ""
          }`}
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12 text-center ${
              methodologyVisible ? styles["fade-in-up"] : ""
            }`}
          >
            Nossa <span className="text-blue-700">Metodologia</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div
              className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ${
                methodologyVisible ? styles["fade-in-left"] : ""
              }`}
            >
              <div className="text-blue-600 mb-3 sm:mb-4">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Análise de Dados Avançada
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Utilizamos métricas precisas para otimizar seu treino e prever
                seu desempenho.
              </p>
            </div>
            <div
              className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ${
                methodologyVisible
                  ? styles["fade-in-up"] + " " + styles["delay-200"]
                  : ""
              }`}
            >
              <div className="text-blue-600 mb-3 sm:mb-4">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8L11 2m9 20v-8m0 0h-8m8 0L13 22"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Planos Individualizados
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Treinamento feito sob medida para suas metas, limitações e
                evolução constante.
              </p>
            </div>
            <div
              className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ${
                methodologyVisible
                  ? styles["fade-in-right"] + " " + styles["delay-400"]
                  : ""
              }`}
            >
              <div className="text-blue-600 mb-3 sm:mb-4">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2m2-4h10m0 0l3-3m-3 3l3 3m0 0l3-3"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Acompanhamento Profissional
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Atendimento feito por um profissional capacitado, cuidando da
                sua saúde, desempenho e evolução de forma completa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção da Galeria de Imagens*/}
      <section
        ref={galleryRef}
        id="gallery-section"
        className={`min-h-screen flex items-center justify-center bg-white px-4 py-12 snap-start animate-on-scroll ${
          galleryVisible ? "is-visible" : ""
        }`}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
            Alta Performance em <span className="text-blue-700">Movimento</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Imagem 1 */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out delay-200">
              <img
                src="/Imagem do WhatsApp de 2025-05-24 à(s) 20.42.20_ffbf4217.jpg"
                alt="Giovani Zavan saindo da água em um triathlon"
                className="w-full aspect-[4/5] object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
                }}
              />
              <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Rompendo Limites
                </p>
              </div>
            </div>

            {/* Imagem 2 */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out delay-400">
              <img
                src="/Imagem do WhatsApp de 2025-05-24 à(s) 20.50.34_fbc82ab9.jpg"
                alt="Giovani Zavan correndo em um triathlon"
                className="w-full aspect-[4/5] object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
                }}
              />

              <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Foco no Ritmo
                </p>
              </div>
            </div>
            {/* Imagem 3 */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out delay-600">
              <img
                src="/Imagem do WhatsApp de 2025-05-24 à(s) 20.50.54_e598d1cc.jpg"
                alt="Giovani Zavan com bicicleta em transição de triathlon"
                className="w-full aspect-[4/5] object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
                }}
              />

              <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Potência no Pedal
                </p>
              </div>
            </div>
            {/* Imagem 4 */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out delay-800">
              <img
                src="/Imagem do WhatsApp de 2025-05-24 à(s) 20.41.46_e04382b6.jpg"
                alt="Giovani Zavan saindo da água após natação"
                className="w-full aspect-[4/5] object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
                }}
              />

              <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Força na Água
                </p>
              </div>
            </div>
            {/* Imagem 5 */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out delay-1000">
              <img
                src="/Imagem do WhatsApp de 2025-05-24 à(s) 20.51.27_cb34f227.jpg"
                alt="Giovani Zavan pedalando em alta velocidade"
                className="w-full aspect-[4/5] object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
                }}
              />

              <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Transição Perfeita
                </p>
              </div>
            </div>
            {/* Imagem 6 */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out delay-1200">
              <img
                src="/Imagem do WhatsApp de 2025-05-24 à(s) 20.55.08_eda8f727.jpg"
                alt="Giovani Zavan correndo em pista"
                className="w-full aspect-[4/5] object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
                }}
              />

              <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Ritmo Implacável
                </p>
              </div>
            </div>
            {/* Imagem 7 */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out delay-1400">
              <img
                src="/Captura de tela 2025-05-24 233504.png"
                alt="Giovani Zavan celebrando a chegada"
                className="w-full aspect-[4/5] object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
                }}
              />

              <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Vitória e Conquista
                </p>
              </div>
            </div>
            {/* Imagem 8 */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out delay-1600">
              <img
                src="/Imagem do WhatsApp de 2025-05-24 à(s) 20.55.07_e2b5535f.jpg"
                alt="Giovani Zavan em momento de concentração no ciclismo"
                className="w-full aspect-[4/5] object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN";
                }}
              />

              <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-base sm:text-lg font-semibold">
                  Foco Total
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Dica de Treino */}
      {/*<section
        ref={trainingTipRef}
        id="training-tip-section"
        className={`min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12 snap-start ${styles['animate-on-scroll']} ${
          trainingTipVisible ? styles['is-visible'] : ''
        }`}
      >
        <div className={`container mx-auto max-w-4xl text-center ${
          trainingTipVisible ? styles['scale-in'] : ''
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
            Receba Sua{" "}
            <span className="text-blue-700">
              Dica de Treino Personalizada ✨
            </span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-10 ${trainingTipVisible ? styles['fade-in-up'] + ' ' + styles['delay-200'] : ''}`}>
            Descreva seu esporte e seu objetivo ou desafio atual para receber
            uma dica exclusiva de Giovani Zavan, gerada com a inteligência do
            Gemini.
          </p>
          <div className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-4 sm:space-y-6 border border-gray-200 ${trainingTipVisible ? styles['fade-in-up'] + ' ' + styles['delay-400'] : ''}`}>
            <div>
              <label
                htmlFor="trainingPrompt"
                className="block text-left text-gray-700 text-base sm:text-lg font-medium mb-2"
              >
                Qual esporte você pratica e qual seu objetivo ou desafio atual?
              </label>
              <textarea
                id="trainingPrompt"
                name="trainingPrompt"
                rows="3"
                placeholder="Ex: Corro maratonas e quero melhorar meu tempo em 10km; Sou nadador e quero aumentar minha resistência."
                className="w-full p-3 sm:p-4 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 text-base"
                value={trainingPrompt}
                onChange={(e) => setTrainingPrompt(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={generateTrainingTip}
              disabled={isLoadingTip}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingTip ? "Gerando Dica..." : "Gerar Dica de Treino ✨"}
            </button>
            {tipError && (
              <p className="text-red-600 mt-4 text-center text-sm sm:text-base">
                {tipError}
              </p>
            )}
            {trainingTip && (
              <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200 text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">
                  Sua Dica de Treino:
                </h3>
                <p className="text-gray-800 whitespace-pre-wrap text-sm sm:text-base">
                  {trainingTip}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>;*/}

      {/* Seção Contato */}
      <section
        ref={contactRef}
        id="contact-section"
        className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4 py-12 snap-start ${
          styles["animate-on-scroll"]
        } ${contactVisible ? styles["is-visible"] : ""}`}
      >
        <div
          className={`container mx-auto max-w-4xl text-center ${
            contactVisible ? styles["fade-in-up"] : ""
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 md:mb-8">
            <span className="text-blue-700">
              Pronto para Alcançar o Próximo Nível?
            </span>
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

          <p
            className={`text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-10 ${
              contactVisible
                ? styles["fade-in-up"] + " " + styles["delay-200"]
                : ""
            }`}
          >
            Sua jornada de alta performance começa aqui. Clique no botão abaixo
            e fale diretamente com Giovani no WhatsApp.
          </p>

          <a
            href="https://wa.me/5511930207612?text=Olá%20Giovani,%20quero%20iniciar%20minha%20jornada%20de%20alta%20performance.%20Poderia%20me%20ajudar?"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg sm:text-xl ${
              contactVisible
                ? styles["fade-in-up"] + " " + styles["delay-400"]
                : ""
            }`}
          >
            Enviar Mensagem para Giovani no WhatsApp
          </a>

          <p
            className={`text-gray-600 mt-6 sm:mt-8 text-base sm:text-lg ${
              contactVisible
                ? styles["fade-in-up"] + " " + styles["delay-600"]
                : ""
            }`}
          >
            Ou se preferir, salve o número e envie uma mensagem manualmente:
            <a
              href="https://wa.me/5511930207612"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline font-semibold"
            >
              {" "}
              (11) 93020-7612
            </a>
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 py-6 px-4 text-center">
        <div className="container mx-auto">
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
            &copy; 2025 ZVN Assessoria Esportiva. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a
              href="https://www.instagram.com/zvn_assessoria/"
              className="text-gray-400 hover:text-blue-400 transition duration-300"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.01 3.71.048 1.0.04 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.425 1.427.465 2.427.038.926.048 1.279.048 3.71s-.01 2.784-.048 3.71c-.04.999-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.427.425-2.427.465-.926.038-1.279-.048-3.71-.048s-2.784-.01-3.71-.048c-.999-.04-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.425-1.427-.465-2.427-.038-.926-.048-1.279-.048-3.71s.01-2.784.048-3.71c.04-.999.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.427-.425 2.427-.465C8.806 2.01 9.159 2 11.585 2h.73zM12 7.857a4.143 4.143 0 100 8.286 4.143 4.143 0 000-8.286zM12 14a2 2 0 110-4 2 2 0 010 4zM21.129 3.361a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
