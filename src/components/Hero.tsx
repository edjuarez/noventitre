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
  const isMobile = window.innerWidth < 768;

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
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
    startAutoPlay();
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
    startAutoPlay();
  };
  return (
    <motion.section
      id="home"
      className="relative min-h-screen md:h-screen flex flex-col md:block overflow-hidden mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]"
      animate={{
        backgroundColor: slide.background,
      }}
      transition={{
        duration: 0.8,
      }}
      drag={isMobile ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      dragMomentum={false}

      onDragEnd={(_, info) => {
        if (info.offset.x < -80) {
          nextSlide();
        }

        if (info.offset.x > 80) {
          prevSlide();
        }
      }}
    >
      {/* --- Contenedor de la Imagen (z-10 para estar por encima del fondo, pero bajo el texto) --- */}
      <div className="relative w-full h-[55vh] shrink-0 md:absolute md:inset-0 md:h-full z-10">
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
            drag="x"
dragConstraints={{ left: 0, right: 0 }}
dragElastic={0.05}

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
                  className="w-full h-full object-cover object-[80%_center] md:object-center"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicadores: Al estar dentro de este contenedor (que mide h-[55vh] en móvil y h-full en desktop),
          quedarán perfectamente encuadrados sobre la imagen en móvil y abajo del todo en desktop.
          Añadimos z-30 para asegurar que se posicionen sobre el overlay de la foto.
        */}
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

      {/* --- Contenedor del Contenido (z-20) --- */}
      {/* Le agregamos pointer-events-none al contenedor padre en desktop, y pointer-events-auto al cuadro de texto interno.
        De esta forma, el "área invisible" del contenedor de texto ya no bloquea los clics en los botones de abajo.
      */}
      <div className="relative z-20 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 py-12 md:py-0 md:h-full md:px-12 lg:px-20 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45 }}
            className="max-w-xl pointer-events-auto" // Reactiva los clics solo para el texto y botones
            style={{
              color: slide.textColor,
            }}
          >
            <motion.h1
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-heading uppercase text-5xl md:text-3xl lg:text-7xl leading-[0.9] whitespace-pre-line tracking-tighter"
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