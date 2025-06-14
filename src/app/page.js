"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import { motion, useSpring, useScroll } from "motion/react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Methodology from "@/components/sections/Methodology";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

const App = () => {
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

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
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

    const observer = new IntersectionObserver(observerCallback, observerOptions);

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
      <motion.div
        className={styles.progressBar}
        style={{ scaleY }}
      />
      
      <Header
        scrollToSection={scrollToSection}
        aboutRef={aboutRef}
        methodologyRef={methodologyRef}
        galleryRef={galleryRef}
        trainingTipRef={trainingTipRef}
        contactRef={contactRef}
      />

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

      <Hero
        heroRef={heroRef}
        heroVisible={heroVisible}
      />

      <About
        aboutRef={aboutRef}
        aboutVisible={aboutVisible}
      />

      <Methodology
        methodologyRef={methodologyRef}
        methodologyVisible={methodologyVisible}
      />

      <Gallery
        galleryRef={galleryRef}
        galleryVisible={galleryVisible}
      />

      <Contact
        contactRef={contactRef}
        contactVisible={contactVisible}
      />

      {/* Outros componentes serão adicionados aqui */}
    </div>
  );
};

export default App;
