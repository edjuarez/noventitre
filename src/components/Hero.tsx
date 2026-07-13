import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "../data/heroSlides";
import { userData } from "../data/userData";

const AUTO_PLAY_DELAY = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const slide = heroSlides[current];

  const handleWhatsAppContact = () => {
    const phoneNumber = userData.number;
    const message = encodeURIComponent(userData.defaultMessageText);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, AUTO_PLAY_DELAY);
  };

  useEffect(() => {
    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
    startAutoPlay();
  };

  return (
    <motion.section
      id="home"
      /* Cambiamos a flex-col en móvil y mantenemos block/pantalla completa en desktop */
      className="relative min-h-screen md:h-screen flex flex-col md:block overflow-hidden md:mb-160 mb-60"
      animate={{
        backgroundColor: slide.background,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      {/* --- Contenedor de la Imagen --- */}
      {/* En móvil ocupa un 55% de la pantalla, en desktop es absoluto y cubre todo */}
      <div className="relative w-full h-[55vh] shrink-0 md:absolute md:inset-0 md:h-full z-0">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 z-10" />

        {/* Carrusel de imágenes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: `-${current * (100 / heroSlides.length)}%`,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex h-full"
            style={{
              width: `${heroSlides.length * 100}%`,
            }}
          >
            {heroSlides.map((item) => (
              <div
                key={item.id}
                className="relative h-full flex-shrink-0"
                style={{
                  width: `${100 / heroSlides.length}%`,
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover object-[65%_center] md:object-center"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicadores movidos aquí para que siempre se queden sobre la imagen */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`
                cursor-pointer
                rounded-full
                overflow-hidden
                transition-all
                duration-300
                ${
                  current === index
                    ? "w-10 h-3 bg-white"
                    : "w-3 h-3 bg-white/40 hover:bg-white"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* --- Contenedor del Contenido --- */}
      {/* flex-1 permite que ocupe el resto del espacio en móvil debajo de la imagen */}
      <div className="relative z-20 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 py-12 md:py-0 md:h-full md:px-12 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45 }}
            className="max-w-xl"
            style={{
              color: slide.textColor,
            }}
          >
            <motion.h1
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-heading text-5xl md:text-6xl lg:text-8xl leading-[0.9] whitespace-pre-line"
            >
              {slide.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 md:mt-8 text-base md:text-lg leading-7 md:leading-8 opacity-90 whitespace-pre-line"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href={userData.googleFotos}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button
                  className="w-full sm:w-56 bg-white text-black px-8 py-4 rounded-full flex items-center justify-center gap-3 hover:scale-105 transition cursor-pointer"
                >
                  Ver colección
                  <ArrowRight size={18} />
                </button>
              </a>

              <button
                onClick={handleWhatsAppContact}
                className="w-full sm:w-56 bg-brand-rosa hover:bg-gray-800 text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <FaWhatsapp size={24} />
                WhatsApp
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}