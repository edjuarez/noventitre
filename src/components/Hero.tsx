import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { heroSlides } from "../data/heroSlides";

const AUTO_PLAY_DELAY = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const intervalRef = useRef<number | null>(null);

  const slide = heroSlides[current];

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
    <section
      className="relative h-screen overflow-hidden"
      style={{
        backgroundColor: slide.background ?? "#000",
      }}
    >
      {/* Imagen */}

      <img
        key={slide.id}
        src={slide.image}
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-all
          duration-700
        "
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/10" />

      {/* Contenido */}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center">

        <div
          className="max-w-xl"
          style={{
            color: slide.textColor ?? "#fff",
          }}
        >
          <span className="uppercase tracking-[0.3em] text-xs">
            Handmade in Barcelona
          </span>

          <h1 className="mt-6 font-heading text-6xl lg:text-8xl leading-[0.9] whitespace-pre-line">
            {slide.title}
          </h1>

          <p className="mt-8 text-lg leading-8 opacity-90">
            {slide.subtitle}
          </p>

          <div className="flex gap-5 mt-10">
            <button className="bg-white text-black px-8 py-4 rounded-full flex items-center gap-3">
              Ver colección
              <ArrowRight size={18} />
            </button>

            <button className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3">
              <MessageCircle size={18} />
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores */}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`
              transition-all duration-300 rounded-full

              ${
                current === index
                  ? "w-10 h-3 bg-white"
                  : "w-3 h-3 bg-white/50 hover:bg-white"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}