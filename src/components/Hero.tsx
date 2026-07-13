import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "../data/heroSlides";

const AUTO_PLAY_DELAY = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const slide = heroSlides[current];

  const handleWhatsAppContact = () => {
    const phoneNumber = "34600000000";

    const message = encodeURIComponent(
      "¡Hola! Vengo de la web y me interesa un bolso único ✨"
    );

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
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
      className="relative h-screen overflow-hidden mb-160"
      animate={{
        backgroundColor: slide.background,
      }}
      transition={{
        duration: .8
      }}
    >

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
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        </motion.div>

      </div>

      {/* Contenido */}

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center">
        <AnimatePresence mode="wait">

  <motion.div
    key={slide.id}
    initial={{
      opacity: 0,
      y: 30,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: -30,
    }}
    transition={{
      duration: .45,
    }}
    className="max-w-xl"
    style={{
      color: slide.textColor,
    }}
  >

    <motion.h1
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: .15,
        duration: .5,
      }}
      className="
        font-heading
        text-6xl
        lg:text-8xl
        leading-[0.9]
        whitespace-pre-line
      "
    >
      {slide.title}
    </motion.h1>

    <motion.p
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: .3,
        duration: .5,
      }}
      className="
        mt-8
        text-lg
        leading-8
        opacity-90
        whitespace-pre-line
      "
    >
      {slide.subtitle}
    </motion.p>

    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: .45,
        duration: .45,
      }}
      className="flex gap-5 mt-10"
    >

      <a 
        href="https://photos.google.com/share/AF1QipPZWCT5MR8D_PBaBaZjMkJPRe53NHmb-czXhYqTj_6OvgteAaHy3Kmsd86Jm4lb5g?key=YXlSVF9pbEVfaXMxem9xb3FEamNYOEg0MkpKdm9B" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <button
          className="bg-white text-black px-8 py-4 rounded-full flex items-center gap-3 hover:scale-105 transition cursor-pointer"
        >
          Ver colección
          <ArrowRight size={18} />
        </button>
      </a>

      <button
        onClick={handleWhatsAppContact}
        className="
          bg-brand-rosa
          hover:bg-gray-800
          text-white
          px-8
          py-4
          rounded-full
          flex
          items-center
          gap-3
          transition-all
          duration-300
          hover:scale-105
          cursor-pointer
        "
      >
        <FaWhatsapp size={24} />
        WhatsApp
      </button>
{/* <motion.button
    layoutId="whatsapp-button"
    className="
        bg-black
        text-white
        px-8
        py-4
        rounded-full
        flex
        items-center
        gap-3
    "
>
    <FaWhatsapp size={18} />

    WhatsApp
</motion.button> */}
    </motion.div>

  </motion.div>

</AnimatePresence>

</div>
      {/* Indicadores */}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">

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

    </motion.section>
  );
}