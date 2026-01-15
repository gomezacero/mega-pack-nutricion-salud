import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  // 30 minutes = 1800 seconds
  const [timeLeft, setTimeLeft] = useState(1800);
  const [showPill, setShowPill] = useState(false);
  const [purchaserCount, setPurchaserCount] = useState(54);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [randomName, setRandomName] = useState('María');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const checkoutUrl = "https://pay.hotmart.com/X98798544T?checkoutMode=10&bid=1768354873756";

  const basePath = import.meta.env.BASE_URL;

  const heroImages = [
    `${basePath}images/img1.webp`,
    `${basePath}images/img2.webp`,
    `${basePath}images/img3.webp`,
    `${basePath}images/img4.webp`,
    `${basePath}images/img5.webp`,
    `${basePath}images/img6.webp`,
    `${basePath}images/img7.webp`,
  ];

  const names = [
    'María', 'Ana', 'Lucía', 'Carmen', 'Sofía', 'Elena', 'Laura', 'Isabella', 
    'Valentina', 'Camila', 'Martina', 'Victoria', 'Julia', 'Paula', 'Daniela'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) return 1800; // Reset to 30 mins
        return prev - 1;
      });
    }, 1000);

    // Pill Message Rotation & Data Update (Every 7 seconds)
    const pillRotationInterval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % 3);
      setPurchaserCount(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; 
        const next = prev + delta;
        return next < 15 ? 15 + Math.floor(Math.random() * 10) : (next > 75 ? 75 - Math.floor(Math.random() * 10) : next);
      });
      setRandomName(names[Math.floor(Math.random() * names.length)]);
    }, 7000);

    const pillTimer = setTimeout(() => setShowPill(true), 3000);

    // Hero Image Carousel Rotation (Every 4 seconds)
    const imageRotationInterval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % 7);
    }, 4000);

    // Scroll Tracking Logic (70% threshold)
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPos = window.scrollY;
      const scrolledPercentage = (scrollPos + winHeight) / docHeight;

      if (scrolledPercentage >= 0.7 && !hasReachedThreshold) {
        setHasReachedThreshold(true);
      }
    };

    // Exit Intent Logic (Only if threshold is met)
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if threshold reached, not shown yet, and mouse left towards the top
      if (e.clientY <= 0 && !hasShownExitPopup && hasReachedThreshold) {
        setShowExitPopup(true);
        setHasShownExitPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(timer);
      clearInterval(pillRotationInterval);
      clearInterval(imageRotationInterval);
      clearTimeout(pillTimer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShownExitPopup, hasReachedThreshold]);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('LOQUIERO').then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const benefits = [
    {
      title: "Cuerpo Ligero",
      text: "Disminuir la hinchazón y sentirte más liviana en una semana",
      icon: "🎈",
      gradient: "from-sky-100 to-blue-50",
      accent: "text-blue-600",
      keywords: ["hinchazón", "liviana", "semana"]
    },
    {
      title: "Energía Vital",
      text: "Recuperar tu energía vital sin depender del café",
      icon: "⚡",
      gradient: "from-amber-100 to-orange-50",
      accent: "text-orange-600",
      keywords: ["energía", "café"]
    },
    {
      title: "Grasa Natural",
      text: "Perder grasa corporal de forma natural y sostenida",
      icon: "🌱",
      gradient: "from-emerald-100 to-green-50",
      accent: "text-green-600",
      keywords: ["grasa", "natural"]
    },
    {
      title: "Libertad Real",
      text: "Aprender a comer sin restricciones absurdas",
      icon: "🔓",
      gradient: "from-rose-100 to-pink-50",
      accent: "text-rose-600",
      keywords: ["comer", "restricciones"]
    },
    {
      title: "Mente Sana",
      text: "Sanar tu relación con la comida de por vida",
      icon: "❤️",
      gradient: "from-violet-100 to-purple-50",
      accent: "text-purple-600",
      keywords: ["relación", "comida", "vida"]
    },
    {
      title: "Control Total",
      text: "Eliminar antojos voraces por el dulce",
      icon: "🛑",
      gradient: "from-indigo-100 to-slate-50",
      accent: "text-indigo-600",
      keywords: ["antojos", "dulce"]
    }
  ];

  const ebooks = [
    {
      title: 'Libro Maestro VIVE SALUDABLE',
      type: 'GUÍA PRINCIPAL',
      desc: 'El sistema exacto de 5 semanas para resetear tu metabolismo.',
      value: '$47',
      tag: 'OBLIGATORIO',
      image: `${basePath}images/img1.webp`
    },
    {
      title: '+1.000 Recetas Sin Gluten',
      type: 'EBOOK PREMIUM',
      desc: 'Desayunos, almuerzos y cenas sin gluten ni azúcar.',
      value: '$37',
      tag: 'SUPER VENTAS',
      image: `${basePath}images/img3.webp`
    },
    {
      title: 'Poder Detox & Smoothies',
      type: 'MANUAL DIGITAL',
      desc: 'Limpia tu hígado y colon de forma natural y segura.',
      value: '$27',
      tag: 'REGALO',
      image: `${basePath}images/img2.webp`
    },
    {
      title: 'Airfryer Saludable',
      type: 'EBOOK ESPECIAL',
      desc: 'Tus platos favoritos con un 90% menos de grasa.',
      value: '$27',
      tag: 'REGALO',
      image: `${basePath}images/img7.webp`
    },
    {
      title: 'Guía de Suplementos',
      type: 'MANUAL CIENTÍFICO',
      desc: 'Lo que sí funciona para tu quema de grasa.',
      value: '$25',
      tag: 'REGALO',
      image: `${basePath}images/img5.webp`
    },
    {
      title: 'Acceso a Nuevas guías cada mes',
      type: 'ACCESO TOTAL',
      desc: 'Nuevas guías y recetas cada mes sin costo extra.',
      value: '$25',
      tag: 'VALOR INFINITO',
      image: `${basePath}images/img6.webp`
    }
  ];

  const renderPillMessage = () => {
    switch (currentMessageIndex) {
      case 0: return <p className="text-brand-dark text-xs md:text-sm font-bold tracking-tight">🔥 <span className="text-brand-red">{purchaserCount} personas</span> están en proceso de compra ahora</p>;
      case 1: return <p className="text-brand-dark text-xs md:text-sm font-bold tracking-tight">✅ <span className="text-brand-lime">{randomName}</span> acaba de adquirir el <span className="text-brand-lime">SUPER PACK Saludable</span></p>;
      case 2: return <p className="text-brand-dark text-xs md:text-sm font-bold tracking-tight">⏳ <span className="text-brand-red">{purchaserCount} personas</span> en proceso, no pierdas el <span className="text-brand-red">89% OFF</span></p>;
      default: return null;
    }
  };

  return (
    <div className="font-sans antialiased pb-20 md:pb-0">
      {/* Exit Intent Popup - Mobile Optimized */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-4">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-lg" onClick={() => setShowExitPopup(false)}></div>
          <div className="relative bg-white w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl md:rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-2 md:border-4 border-brand-red animate-[bounceIn_0.5s_ease-out]">
            {/* Close Button */}
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-brand-red transition-colors z-[60] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-brand-dark/40 rounded-full"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="bg-brand-red py-4 md:py-6 px-4 md:px-8 text-center text-white relative">
              <h2 className="relative z-10 font-black text-2xl md:text-5xl uppercase tracking-tighter leading-none mb-1 italic">¡ESPERA!</h2>
              <p className="relative z-10 font-bold text-xs md:text-lg uppercase opacity-90">Tu salud merece este último intento</p>
            </div>

            <div className="p-4 md:p-8 text-center">
              <p className="text-gray-600 text-sm md:text-xl font-medium leading-relaxed mb-4 md:mb-6">
                No dejes pasar esta oportunidad.
                <span className="font-black text-brand-dark text-base md:text-2xl block mt-2 uppercase">¿Vas a dejar que la inflamación gane?</span>
              </p>

              <div className="bg-brand-yellow/20 border-2 border-dashed border-brand-yellow p-3 md:p-6 rounded-2xl mb-4 md:mb-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-dark px-3 py-0.5 rounded-full font-black text-[9px] md:text-xs uppercase">CUPÓN EXTRA</div>
                <p className="text-gray-500 font-bold uppercase text-[9px] md:text-xs mb-2">¡TOCA PARA COPIAR!</p>
                <div
                  onClick={handleCopyCoupon}
                  className="cursor-pointer active:scale-95 transition-transform"
                >
                  <span className={`block text-3xl md:text-5xl font-impact tracking-tight bg-white px-6 md:px-10 py-2 md:py-4 rounded-xl shadow-lg border-3 ${isCopied ? 'text-brand-lime border-brand-lime' : 'text-brand-red border-brand-red animate-glow-fast'} transition-all`}>
                    {isCopied ? '¡COPIADO!' : 'LOQUIERO'}
                  </span>
                </div>
                <p className="text-brand-red font-black text-base md:text-2xl uppercase mt-2">¡20% EXTRA!</p>
              </div>

              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-brand-lime text-white text-base md:text-2xl font-black px-6 md:px-10 py-4 md:py-6 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all w-full uppercase text-center mb-3"
              >
                SÍ, QUIERO MI CAMBIO AHORA
              </a>

              <button
                onClick={() => setShowExitPopup(false)}
                className="text-gray-400 font-bold uppercase text-[9px] md:text-sm hover:text-brand-red transition-colors underline"
              >
                No gracias, prefiero seguir igual
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Urgency Bar - Rediseñado y optimizado para móviles */}
      <div className="bg-brand-red py-2 md:py-3 px-4 text-center sticky top-0 z-[150] shadow-2xl border-b border-white/30 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-1 md:gap-8">
          
          {/* Oferta Highlight (Second Hierarchy on desktop, first line on mobile) */}
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-[9px] md:text-xs uppercase tracking-widest opacity-90">OFERTA ÚNICA:</span>
            <div className="bg-white text-brand-red px-2 py-0.5 md:px-4 md:py-1 rounded-full font-black text-xs md:text-xl shadow-[0_4px_10px_rgba(255,255,255,0.2)] animate-pulse border border-brand-red/10 whitespace-nowrap">
              89% DE DESCUENTO
            </div>
          </div>
          
          {/* Countdown Timer (Primary Hierarchy) */}
          <div className="flex items-center gap-3">
            <p className="text-white font-bold text-[8px] md:text-xs uppercase tracking-tighter opacity-80 hidden xs:block">TERMINA EN:</p>
            <div className="flex items-baseline gap-1">
              <span className="font-impact text-3xl md:text-6xl text-white tracking-tighter leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                {formatTime(timeLeft)}
              </span>
              <span className="text-white font-black text-[10px] md:text-sm animate-bounce">⏳</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <p className="text-white font-black text-xs uppercase tracking-tighter bg-brand-dark/20 px-3 py-1 rounded-lg border border-white/10">
              <span className="text-brand-yellow">QUEDA POCO TIEMPO</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Hero Header - Mobile First */}
      <header className="bg-white pt-6 md:pt-10 pb-4 md:pb-6 px-3 md:px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-sans font-black text-brand-red text-3xl md:text-5xl lg:text-7xl leading-tight mb-3 md:mb-4 tracking-tight text-balance">
            ¿Te sientes con sobrepeso,<br />
            hinchada, cansada?
          </h1>

          <div className="bg-brand-green text-white py-3 md:py-4 px-4 md:px-6 inline-block w-full max-w-4xl rounded-sm mb-4 md:mb-6 shadow-xl transform -rotate-1">
            <p className="font-sans font-extrabold text-base md:text-xl lg:text-3xl uppercase tracking-wide text-balance">
              <span className="text-brand-yellow">¡DILE ADIÓS A LA INFLAMACIÓN!</span> En solo 7 DÍAS puedes cambiar tu cuerpo sin pasar hambre y comiendo lo que te gusta
            </p>
          </div>

          <p className="text-base md:text-xl lg:text-3xl text-gray-800 font-medium mb-6 md:mb-10 text-balance">
            No estás <span className="text-brand-red font-bold">fallando</span>. Solo te falta la <span className="text-brand-lime font-bold">información correcta</span>.<br />
            Con este <span className="text-brand-lime font-bold">MÉTODO</span> es el <span className="text-brand-lime font-bold">VERDADERO PASO A PASO</span>
          </p>
        </div>
      </header>

      {/* Hero Product Mockup - Image Carousel (Optimized for Mobile) */}
      <section className="bg-white pb-10 md:pb-20 px-2 md:px-4">
        <div className="container mx-auto max-w-6xl relative text-center">
          <div className="relative inline-block max-w-full">
            {heroImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`SUPER PACK Saludable - Imagen ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                className={`rounded-2xl md:rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-4 md:border-8 border-white max-w-full h-auto max-h-[400px] md:max-h-[600px] lg:max-h-[800px] object-contain transition-opacity duration-700 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-slate-50 py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-gray-400 font-bold text-xl md:text-2xl uppercase tracking-[0.3em] mb-4">El Peso de tu Pasado</h2>
            <h3 className="text-brand-dark font-black text-4xl md:text-6xl uppercase leading-none tracking-tighter mb-6 text-balance">
              SOBREPESO, INFLAMACIÓN <br className="hidden md:block" />
              <span className="text-brand-red">Y CANSANCIO CONSTANTE...</span>
            </h3>
            <div className="inline-block relative">
              <h4 className="text-brand-dark font-black text-3xl md:text-5xl uppercase relative z-10 px-4 text-balance">
                ¡Ese ciclo se <span className="text-brand-lime">TERMINA HOY!</span>
              </h4>
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-brand-lime/10 -rotate-1"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className={`group relative overflow-hidden bg-white p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl">{benefit.icon}</div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white shadow-sm ${benefit.accent}`}>Logro #{i+1}</span>
                  </div>
                  <h5 className={`text-sm font-black uppercase tracking-widest mb-3 ${benefit.accent}`}>{benefit.title}</h5>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                    {benefit.text.split(' ').map((word, idx) => {
                      const cleanWord = word.toLowerCase().replace(/[.,!]/g, '');
                      const isKeyword = benefit.keywords.includes(cleanWord);
                      return <span key={idx} className={isKeyword ? `font-black ${benefit.accent}` : "text-gray-700"}>{word}{' '}</span>;
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Highlights Section - OPTIMIZED FOR MOBILE SCROLL */}
      <section id="offer" className="py-32 bg-white text-brand-dark px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-brand-dark font-black text-5xl md:text-7xl uppercase mb-6 tracking-tighter drop-shadow-sm text-balance">
              Lo que vas a recibir <span className="text-brand-red">HOY</span>
            </h2>
            <div className="inline-block bg-white shadow-lg border border-gray-100 py-4 px-6 md:px-10 rounded-full mb-4">
               <p className="text-sm md:text-xl font-bold tracking-tight text-gray-600">El sistema más completo del mercado en español para tu transformación</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-y-24 md:gap-x-12 mb-28">
            {ebooks.map((ebook, i) => (
              <div key={i} className="group relative">
                <div className="flex flex-col h-full bg-white rounded-3xl md:rounded-[2.5rem] shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-100 p-4 pt-0 md:p-8 md:pt-0 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] hover:-translate-y-2 overflow-hidden">
                  <div className="relative -mt-6 md:-mt-10 mb-4 md:mb-8 self-center w-full max-w-[140px] md:max-w-[240px] aspect-[3/4] group-hover:-translate-y-4 transition-transform duration-500 ease-out shadow-xl rounded-lg md:rounded-xl overflow-hidden">
                    <img 
                      src={ebook.image} 
                      alt={ebook.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-grow flex flex-col px-1 md:px-4">
                    <div className="flex items-center justify-between mb-1 md:mb-3">
                       <span className="text-[8px] md:text-[10px] font-black text-brand-red uppercase tracking-widest">{ebook.type}</span>
                       <span className="text-[10px] md:text-xs font-bold text-gray-400 line-through">{ebook.value}</span>
                    </div>
                    <h3 className="text-sm md:text-2xl font-black mb-2 md:mb-4 uppercase leading-tight tracking-tight text-brand-dark group-hover:text-brand-red transition-colors line-clamp-2">
                      {ebook.title}
                    </h3>
                    <p className="text-gray-500 text-[10px] md:text-sm font-medium leading-relaxed mb-4 md:mb-8 line-clamp-2 md:line-clamp-none">
                      {ebook.desc}
                    </p>
                    <div className="mt-auto pt-4 md:pt-6 border-t border-gray-50 flex items-center justify-between pb-4 md:pb-8">
                       <span className="text-[7px] md:text-[10px] font-black text-brand-lime uppercase tracking-widest px-2 md:px-4 py-1 md:py-1.5 bg-brand-lime/10 border border-brand-lime/20 rounded-full">{ebook.tag}</span>
                       <span className="text-brand-red font-black text-[9px] md:text-sm uppercase italic">¡INCLUIDO!</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-24 text-center shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative overflow-hidden border-2 border-brand-red/10">
            <div className="relative z-10">
              <h4 className="text-xl md:text-3xl font-black mb-4 md:mb-6 uppercase tracking-[0.1em] text-brand-red leading-tight">ACCESO TOTAL E INSTANTÁNEO</h4>
              <p className="text-gray-500 font-bold mb-8 md:mb-10 text-base md:text-xl uppercase tracking-tight max-w-2xl mx-auto px-2 text-balance">Consigue el SUPER PACK completo de 6 ebooks premium por menos de lo que cuesta una cena</p>
              
              <div className="flex flex-col items-center gap-6 md:gap-10 mb-10 md:mb-14">
                 <div className="flex flex-col items-center mb-2">
                    <span className="text-gray-300 line-through decoration-brand-red decoration-[6px] md:decoration-[10px] text-5xl md:text-[10rem] font-black tracking-tighter italic opacity-60">$188.00</span>
                    <p className="text-gray-400 font-black uppercase text-xs md:text-xl tracking-widest -mt-2 md:-mt-4">PRECIO REGULAR</p>
                 </div>
                 <div className="flex flex-col items-center bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 border-brand-lime transform rotate-1 w-full max-w-[280px] md:max-w-none">
                    <span className="text-6xl md:text-[11rem] font-black text-brand-lime tracking-tighter leading-none">$19.<span className="text-brand-dark">95</span></span>
                    {/* Badge con margen superior corregido para evitar solapamiento en móviles */}
                    <span className="bg-brand-red text-white px-4 md:px-8 py-2 rounded-full font-black text-sm md:text-xl mt-2 md:-mt-6 uppercase tracking-widest shadow-lg whitespace-nowrap">PRECIO FINAL DE OFERTA</span>
                 </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="relative group inline-block w-full md:w-auto mt-4 md:mt-0">
                    <div className="absolute -top-10 -right-4 md:-right-10 z-20 bg-brand-yellow text-brand-red px-4 md:px-6 py-2 rounded-xl font-black text-[10px] md:text-lg uppercase shadow-xl rotate-12 border-2 border-brand-red animate-pulse">Ahorras 89% - SOLO POR HOY</div>
                    <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center bg-brand-red text-white text-xl md:text-5xl font-black px-8 md:px-24 py-6 md:py-12 rounded-full shadow-[0_15px_45px_rgba(227,30,36,0.3)] hover:scale-[1.03] active:scale-95 hover:bg-brand-dark transition-all w-full md:w-auto uppercase text-center overflow-hidden">
                      <span className="relative z-10 flex items-center gap-3">¡ADQUIRIR EL SUPER PACK AHORA! <svg className="w-5 h-5 md:w-10 md:h-10 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
                    </a>
                </div>
                <p className="font-black text-brand-lime uppercase tracking-widest text-xs md:text-xl flex items-center gap-2"><svg className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Acceso inmediato. Descarga en 1 minuto.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section id="payment" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-16 relative">
             <div className="relative w-36 h-36 md:w-48 md:h-48 bg-white rounded-full flex flex-col items-center justify-center mx-auto mb-8 border-8 border-[#D4AF37] shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <span className="text-5xl md:text-7xl">🛡️</span>
                <span className="text-[10px] md:text-xs font-black text-brand-dark uppercase">Garantía de</span>
                <span className="text-xl md:text-2xl font-black text-brand-dark uppercase">15 DÍAS</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase text-brand-dark">TU COMPRA ESTÁ <span className="text-brand-lime">100% PROTEGIDA</span></h2>
             <p className="text-lg md:text-xl text-gray-500 font-bold max-w-2xl mx-auto italic text-balance">"Prueba el método completo. Si en 15 días no te sientes con más energía y menos inflamación, te devolvemos el 100% de tu dinero. Sin preguntas, sin trabas."</p>
          </div>
          
          <div className="bg-gray-50 rounded-[3rem] border-2 border-gray-200 overflow-hidden shadow-2xl">
            <div className="bg-brand-dark text-white p-8">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-balance">
                ÚNETE A LAS <span className="text-brand-yellow">MILES DE MUJERES</span> <br/> QUE YA CAMBIARON SU VIDA
              </h3>
            </div>
            <div className="p-8 md:p-16">
               <div className="bg-brand-yellow/10 border-2 border-dashed border-brand-yellow p-6 md:p-10 rounded-[2rem] mb-12 relative overflow-hidden text-center">
                    <span className="text-gray-400 line-through decoration-brand-red decoration-[6px] text-4xl md:text-8xl font-black opacity-60 mb-2 block">$188.00</span>
                    <p className="text-4xl md:text-7xl font-black text-brand-lime leading-none">OFERTA: <span className="text-brand-red">$19.95</span></p>
                    <p className="text-[10px] md:text-sm font-black text-brand-red uppercase tracking-[0.2em] mt-4 italic">Ahorro inmediato de $168.05 (89% OFF)</p>
                </div>

                <div className="flex flex-col items-center gap-4 mb-12">
                    <div className="relative group w-full">
                        <div className="absolute -top-6 -right-4 z-20 bg-brand-yellow text-brand-red px-4 py-2 rounded-xl font-black text-[10px] md:text-lg uppercase shadow-xl rotate-12 border-2 border-brand-red animate-pulse">Ahorras 89% - SOLO POR HOY</div>
                        <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center bg-brand-red text-white text-xl md:text-4xl font-black px-12 md:px-20 py-8 rounded-full shadow-[0_20px_50px_rgba(227,30,36,0.3)] hover:scale-105 active:scale-95 transition-all w-full uppercase text-center overflow-hidden">
                           <span className="relative z-10 flex items-center justify-center gap-3">¡SÍ, QUIERO EL SUPER PACK COMPLETO! <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg></span>
                        </a>
                    </div>
                    <p className="font-black text-brand-lime uppercase tracking-widest text-xs md:text-xl flex items-center gap-2"><svg className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Acceso inmediato. Descarga en 1 minuto.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Social Proof Pill */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 transform ${showPill ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="relative group">
          <div className="absolute inset-0 bg-brand-lime/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
          <div className="relative bg-white/95 backdrop-blur-md px-6 md:px-10 py-4 rounded-full shadow-[0_20px_60px_-15px_rgba(56,176,0,0.3),0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-brand-lime/40 flex items-center justify-center whitespace-nowrap min-w-[300px]">
            <div className="relative z-10 transition-all duration-500 text-center">{renderPillMessage()}</div>
          </div>
        </div>
      </div>

      <footer className="bg-brand-dark text-white py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="font-bold opacity-60 mb-6 uppercase tracking-widest text-xs">MÉTODO PROBADO DE ALTA EFECTIVIDAD</p>
          <div className="flex flex-wrap justify-center gap-8 text-xs opacity-40 font-bold uppercase tracking-widest">
            <span>Privacidad</span>
            <span>Términos</span>
            <span>Soporte</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;