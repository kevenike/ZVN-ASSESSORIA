// Cole o código INTEIRO do App.js que eu te dei aqui,
// e renomeie 'App' para 'Home' no começo e no final.

import React, { useEffect, useRef, useState } from 'react';

// Cole todo o conteúdo da função 'App' aqui
// Troque 'const App = () => {' por 'const Home = () => {'
const Home = () => {
    // Refs for each section to enable smooth scrolling
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const methodologyRef = useRef(null);
    const galleryRef = useRef(null);
    const trainingTipRef = useRef(null); // New ref for the training tip section
    const contactRef = useRef(null);

    // State for the personalized training tip feature
    const [trainingPrompt, setTrainingPrompt] = useState('');
    const [trainingTip, setTrainingTip] = useState('');
    const [isLoadingTip, setIsLoadingTip] = useState(false);
    const [tipError, setTipError] = useState('');

    // Function to scroll to a specific section
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Effect to handle mobile menu toggle
    useEffect(() => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        const toggleMobileMenu = () => {
            mobileMenu.classList.toggle('hidden');
        };

        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', toggleMobileMenu);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (mobileMenuButton) {
                mobileMenuButton.removeEventListener('click', toggleMobileMenu);
            }
        };
    }, []);

    // Function to generate a personalized training tip using Gemini API
    const generateTrainingTip = async () => {
        if (!trainingPrompt.trim()) {
            setTipError('Por favor, descreva seu esporte e objetivo para receber uma dica.');
            return;
        }

        setIsLoadingTip(true);
        setTrainingTip('');
        setTipError('');

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: `Gere uma dica de treino concisa e motivacional para um atleta com o seguinte objetivo/desafio: "${trainingPrompt}". Foque em um aspecto prático e inspirador. A dica deve ser em português.` }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will provide this at runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setTrainingTip(text);
            } else {
                setTipError('Não foi possível gerar a dica de treino. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao chamar a API Gemini:', error);
            setTipError('Ocorreu um erro ao gerar a dica. Verifique sua conexão ou tente mais tarde.');
        } finally {
            setIsLoadingTip(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-inter overflow-y-scroll snap-y snap-mandatory scroll-smooth overflow-x-hidden"> {/* Added overflow-x-hidden */}
            {/* Custom Styles for Scrollbar and Animations */}
            <style jsx="true">{`
                body {
                    font-family: 'Inter', sans-serif;
                }
                .snap-y.snap-mandatory {
                    scroll-snap-type: y mandatory;
                }
                .snap-start {
                    scroll-snap-align: start;
                }
                /* Custom scrollbar for a cleaner look */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #e2e8f0; /* Light gray */
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #3b82f6; /* Blue */
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #2563eb; /* Darker blue */
                }

                /* Keyframe for subtle fade-in-up animation */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .delay-200 { animation-delay: 0.2s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-600 { animation-delay: 0.6s; }
            `}</style>

            {/* Header */}
            <header className="bg-white shadow-md py-4 px-4 md:px-8 fixed w-full z-50 border-b border-gray-200"> {/* Adjusted padding */}
                <nav className="container mx-auto flex justify-between items-center max-w-screen-xl"> {/* Added max-w-screen-xl */}
                    <a href="#" className="text-3xl font-extrabold text-blue-700 tracking-wide">ZVN Assessoria</a>
                    <ul className="hidden md:flex space-x-8">
                        <li><button onClick={() => scrollToSection(aboutRef)} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium">Sobre</button></li>
                        <li><button onClick={() => scrollToSection(methodologyRef)} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium">Metodologia</button></li>
                        <li><button onClick={() => scrollToSection(galleryRef)} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium">Galeria</button></li>
                        <li><button onClick={() => scrollToSection(trainingTipRef)} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium">Dica de Treino ✨</button></li> {/* New nav item */}
                        <li><button onClick={() => scrollToSection(contactRef)} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium">Contato</button></li>
                    </ul>
                    {/* Mobile Menu Button */}
                    <button id="mobile-menu-button" className="md:hidden text-gray-700 focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </nav>
                {/* Mobile Menu */}
                <div id="mobile-menu" className="hidden md:hidden bg-white mt-4 rounded-lg shadow-xl border border-gray-200">
                    <ul className="flex flex-col items-center py-4 space-y-4">
                        <li><button onClick={() => { scrollToSection(aboutRef); document.getElementById('mobile-menu').classList.add('hidden'); }} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block">Sobre</button></li>
                        <li><button onClick={() => { scrollToSection(methodologyRef); document.getElementById('mobile-menu').classList.add('hidden'); }} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block">Metodologia</button></li>
                        <li><button onClick={() => { scrollToSection(galleryRef); document.getElementById('mobile-menu').classList.add('hidden'); }} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block">Galeria</button></li>
                        <li><button onClick={() => { scrollToSection(trainingTipRef); document.getElementById('mobile-menu').classList.add('hidden'); }} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block">Dica de Treino ✨</button></li> {/* New nav item */}
                        <li><button onClick={() => { scrollToSection(contactRef); document.getElementById('mobile-menu').classList.add('hidden'); }} className="text-gray-700 hover:text-blue-700 transition duration-300 text-lg font-medium py-2 px-4 block">Contato</button></li>
                    </ul>
                </div>
            </header>

            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center text-center p-4 pt-20 snap-start bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden">
                {/* Abstract background elements inspired by FIAP */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <filter id="blur">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                            </filter>
                        </defs>
                        <circle cx="20" cy="80" r="15" fill="#3b82f6" filter="url(#blur)" />
                        <circle cx="80" cy="20" r="20" fill="#60a5fa" filter="url(#blur)" />
                        <path d="M0 50 C20 30, 40 70, 60 50 S80 30, 100 50" stroke="#93c5fd" strokeWidth="2" fill="none" opacity="0.5" />
                        <path d="M0 60 C25 40, 50 80, 75 60 S100 40, 100 60" stroke="#bfdbfe" strokeWidth="1" fill="none" opacity="0.3" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-6 animate-fade-in-up">
                        <span className="text-blue-700">ZVN Assessoria:</span> Performance Sem Limites
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-700 mb-10 animate-fade-in-up delay-200">
                        Transformamos seu potencial em resultados. Treinamento personalizado, ciência e paixão pelo esporte.
                    </p>
                    <button onClick={() => scrollToSection(contactRef)} className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-xl animate-fade-in-up delay-400">
                        Comece Sua Jornada
                    </button>
                    <div className="mt-12 text-gray-600 animate-fade-in-up delay-600">
                        <p className="text-sm">SCROLL DOWN</p>
                        <svg className="w-6 h-6 mx-auto mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="h-screen flex items-center justify-center bg-white text-center px-4 snap-start">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fade-in-up">Sobre <span className="text-blue-700">Giovani Zavan</span></h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 animate-fade-in-up delay-200">
                        Na ZVN Assessoria, você terá o acompanhamento exclusivo de **Giovani Zavan**, um especialista apaixonado por esporte e dedicado a transformar seu potencial em conquistas reais. Com uma metodologia comprovada e foco total no seu desenvolvimento, Giovani Zavan oferece um acompanhamento completo e individualizado, adaptado às suas necessidades e objetivos.
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up delay-400">
                        Seja para superar seus primeiros limites ou alcançar pódios, Giovani Zavan é o seu parceiro estratégico. Ele combina ciência, metodologia e paixão para que você não apenas treine, mas evolua de forma sustentável e vitoriosa, reescrevendo o futuro do seu desempenho.
                    </p>
                </div>
            </section>

            {/* Methodology/Differentiators Section */}
            <section ref={methodologyRef} className="h-screen flex items-center justify-center bg-gray-100 px-4 snap-start">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 animate-fade-in-up">Nossa <span className="text-blue-700">Metodologia</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Diferencial 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-200 animate-fade-in-up delay-200">
                            <div className="text-blue-600 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Análise de Dados Avançada</h3>
                            <p className="text-gray-600">Utilizamos métricas precisas para otimizar seu treino e prever seu desempenho.</p>
                        </div>
                        {/* Diferencial 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-200 animate-fade-in-up delay-400">
                            <div className="text-blue-600 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8L11 2m9 20v-8m0 0h-8m8 0L13 22"></path></svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Planos Individualizados</h3>
                            <p className="text-gray-600">Treinamento feito sob medida para suas metas, limitações e evolução constante.</p>
                        </div>
                        {/* Diferencial 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-200 animate-fade-in-up delay-600">
                            <div className="text-blue-600 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2m2-4h10m0 0l3-3m-3 3l3 3m0 0l3-3"></path></svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Suporte Multidisciplinar</h3>
                            <p className="text-gray-600">Acompanhamento de profissionais de diversas áreas para sua saúde integral.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery Section */}
            <section ref={galleryRef} className="h-screen flex items-center justify-center bg-white px-4 snap-start">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 animate-fade-in-up">Momentos de <span className="text-blue-700">Superação de Giovani</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                        {/* Image 1 */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <img src="uploaded:image.png-f61f5a1f-18df-42e7-968b-6bf8738df2b7" alt="Giovani Zavan saindo da água em um triathlon" className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN'; }} />
                            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">Foco e Determinação</p>
                            </div>
                        </div>
                        {/* Image 2 */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <img src="uploaded:image.png-7d474e67-8aeb-4df9-92b5-ac22c3f2bed3" alt="Giovani Zavan correndo em um triathlon" className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN'; }} />
                            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">Superando Limites</p>
                            </div>
                        </div>
                        {/* Image 3 */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <img src="uploaded:image.png-3611a8fe-37f9-4ba8-a5e0-086785ab4b69" alt="Giovani Zavan com bicicleta em transição de triathlon" className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN'; }} />
                            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">Transição Perfeita</p>
                            </div>
                        </div>
                        {/* Image 4 */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <img src="uploaded:image.png-05b691a5-1662-4e2b-8ef1-0667567ea2e2" alt="Giovani Zavan saindo da água após natação" className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN'; }} />
                            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">Força na Água</p>
                            </div>
                        </div>
                        {/* Image 5 */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <img src="uploaded:image.png-1c0793db-d3a8-43c6-9526-e1ee16db197c" alt="Giovani Zavan pedalando em alta velocidade" className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN'; }} />
                            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">Potência na Bike</p>
                            </div>
                        </div>
                        {/* Image 6 */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <img src="uploaded:image.png-eca06ecf-02eb-4b7a-956f-1f1190f6d842" alt="Giovani Zavan correndo em pista" className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN'; }} />
                            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">Ritmo Implacável</p>
                            </div>
                        </div>
                        {/* Image 7 */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <img src="uploaded:image.png-30e19522-5ee6-4ce1-810f-9cadb3cdad95" alt="Giovani Zavan celebrando a chegada" className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN'; }} />
                            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">Vitória e Conquista</p>
                            </div>
                        </div>
                        {/* Image 8 */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                            <img src="uploaded:image.png-88f245bd-05af-4949-a434-4a0f1205d925" alt="Giovani Zavan em momento de concentração no ciclismo" className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=Imagem+ZVN'; }} />
                            <div className="absolute inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">Foco Total</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Personalized Training Tip Section */}
            <section ref={trainingTipRef} className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4 snap-start py-12"> {/* Added flex classes and py-12 */}
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fade-in-up">Receba Sua <span className="text-blue-700">Dica de Treino Personalizada ✨</span></h2>
                    <p className="text-lg md:text-xl text-gray-700 mb-10 animate-fade-in-up delay-200">
                        Descreva seu esporte e seu objetivo ou desafio atual para receber uma dica exclusiva de Giovani Zavan, gerada com a inteligência do Gemini.
                    </p>
                    <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 border border-gray-200 animate-fade-in-up delay-400 overflow-y-auto max-h-[60vh] md:max-h-[50vh]"> {/* Added overflow-y-auto and max-h */}
                        <div>
                            <label htmlFor="trainingPrompt" className="block text-left text-gray-700 text-lg font-medium mb-2">
                                Qual esporte você pratica e qual seu objetivo ou desafio atual?
                            </label>
                            <textarea
                                id="trainingPrompt"
                                name="trainingPrompt"
                                rows="3"
                                placeholder="Ex: Corro maratonas e quero melhorar meu tempo em 10km; Sou nadador e quero aumentar minha resistência."
                                className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                                value={trainingPrompt}
                                onChange={(e) => setTrainingPrompt(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            onClick={generateTrainingTip}
                            disabled={isLoadingTip}
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoadingTip ? 'Gerando Dica...' : 'Gerar Dica de Treino ✨'}
                        </button>
                        {tipError && (
                            <p className="text-red-600 mt-4 text-center">{tipError}</p>
                        )}
                        {trainingTip && (
                            <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200 text-left">
                                <h3 className="text-xl font-semibold text-blue-800 mb-3">Sua Dica de Treino:</h3>
                                <p className="text-gray-800 whitespace-pre-wrap">{trainingTip}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Call to Action / Contact Section */}
            <section ref={contactRef} className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4 snap-start py-12">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 animate-fade-in-up">
                        <span className="text-blue-700">Pronto para Alcançar o Próximo Nível?</span>
                        <br />
                        <span className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4 block">Fale diretamente com Giovani Zavan!</span>
                    </h2>
                    <div className="text-blue-700 mb-6 animate-fade-in-up delay-200">
                        <svg className="w-20 h-20 mx-auto transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                        </svg>
                    </div>
                    <p className="text-lg md:text-xl text-gray-700 mb-10 animate-fade-in-up delay-400">
                        Sua jornada de alta performance começa aqui. Preencha o formulário ou entre em contato direto para uma conversa inicial.
                    </p>
                    <form className="bg-white p-8 rounded-xl shadow-xl space-y-6 border border-blue-300 animate-fade-in-up delay-600 overflow-y-auto max-h-[60vh] md:max-h-[50vh]"> {/* Added overflow-y-auto and max-h */}
                        <div>
                            <label htmlFor="name" className="block text-left text-gray-700 text-lg font-medium mb-2">Seu Nome:</label>
                            <input type="text" id="name" name="name" placeholder="Nome Completo"
                                className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-left text-gray-700 text-lg font-medium mb-2">Seu E-mail:</label>
                            <input type="email" id="email" name="email" placeholder="seu.email@exemplo.com"
                                className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300" required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-left text-gray-700 text-lg font-medium mb-2">Sua Mensagem:</label>
                            <textarea id="message" name="message" rows="5" placeholder="Conte-nos sobre seus objetivos e como Giovani pode ajudar..."
                                className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-xl">
                            Enviar Mensagem para Giovani
                        </button>
                    </form>
                    <p className="text-gray-600 mt-8 text-lg animate-fade-in-up delay-800">
                        Prefere um contato rápido? Fale com Giovani pelo WhatsApp: <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold"> (11) 99999-9999</a>
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-8 px-4 text-center">
                <div className="container mx-auto">
                    <p className="text-gray-400 text-sm mb-4">&copy; 2025 ZVN Assessoria Esportiva. Todos os direitos reservados.</p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.048 1.0.04 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.425 1.427.465 2.427.038.926.048 1.279.048 3.71s-.01 2.784-.048 3.71c-.04.999-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.427.425-2.427.465-.926.038-1.279-.048-3.71-.048s-2.784-.01-3.71-.048c-.999-.04-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.425-1.427-.465-2.427-.038-.926-.048-1.279-.048-3.71s.01-2.784.048-3.71c.04-.999.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.427-.425 2.427-.465C8.806 2.01 9.159 2 11.585 2h.73zM12 7.857a4.143 4.143 0 100 8.286 4.143 4.143 0 000-8.286zM12 14a2 2 0 110-4 2 2 0 010 4zM21.129 3.361a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home; // Note: export as Home