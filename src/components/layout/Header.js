"use client";

import React, { useState } from 'react';
import styles from '../../app/home.module.css';

const Header = ({ scrollToSection, aboutRef, methodologyRef, galleryRef, trainingTipRef, contactRef }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScrollToSection = (ref) => {
    scrollToSection(ref);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
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
              onClick={() => handleScrollToSection(aboutRef)}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
            >
              Sobre
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection(methodologyRef)}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
            >
              Metodologia
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection(galleryRef)}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
            >
              Galeria
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection(trainingTipRef)}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-base lg:text-lg font-medium"
            >
              Dica do Dia
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection(contactRef)}
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
        className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-white mt-4 rounded-lg shadow-xl border border-gray-200 mx-4`}
      >
        <ul className="flex flex-col items-center py-4 space-y-4">
          <li>
            <button
              onClick={() => { handleScrollToSection(aboutRef); setIsMobileMenuOpen(false); }}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
            >
              Sobre
            </button>
          </li>
          <li>
            <button
              onClick={() => { handleScrollToSection(methodologyRef); setIsMobileMenuOpen(false); }}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
            >
              Metodologia
            </button>
          </li>
          <li>
            <button
              onClick={() => { handleScrollToSection(galleryRef); setIsMobileMenuOpen(false); }}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
            >
              Galeria
            </button>
          </li>
          <li>
            <button
              onClick={() => { handleScrollToSection(trainingTipRef); setIsMobileMenuOpen(false); }}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
            >
              Dica do Dia
            </button>
          </li>
          <li>
            <button
              onClick={() => { handleScrollToSection(contactRef); setIsMobileMenuOpen(false); }}
              className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block w-full text-center"
            >
              Contato
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header; 