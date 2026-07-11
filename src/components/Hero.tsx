import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { heroSlides } from "../data/heroSlides";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const slide = heroSlides[current];

  return (
    <section className="relative h-screen overflow-hidden">

      {/* Imagen */}

      <img
        src={slide.image}
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-opacity
          duration-700
        "
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/30" />

      {/* Contenido */}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center">

        <div className="max-w-xl text-white">

          <span className="uppercase tracking-[0.3em] text-xs">

            Handmade in Barcelona

          </span>

          <h1 className="mt-6 font-heading text-6xl lg:text-8xl leading-[0.9] whitespace-pre-line">

            {slide.title}

          </h1>

          <p className="mt-8 text-lg leading-8 text-white/90">

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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">

        {heroSlides.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              w-4
              h-4
              rounded-full
              transition-all

              ${
                current === index
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }
            `}
          />

        ))}

      </div>

    </section>
  );
}