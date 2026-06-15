import React from 'react';
import { GiBeveledStar } from "react-icons/gi";

export default function TickerBanner(): React.JSX.Element {
  const words: string[] = [
    "Custom Made",
    "Handmade",
    "Colorful",
    "Unique Pieces",
    "Made in Barcelona",
    "Hecho con amor",
    "Piezas únicas"
  ];

  // Duplicamos el array para que el bucle enganche el principio con el final sin saltos visuales
  const marqueeItems: string[] = [...words, ...words, ...words];

  return (
    <div className="w-full bg-brand-violeta py-3.5 border-y border-black/10 overflow-hidden flex select-none relative z-20">
      {/* Contenedor de la animación infinita */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/textura2.jpg')",
        }}
      />
      <div className="flex whitespace-nowrap gap-16 animate-marquee min-w-full">
        {marqueeItems.map((word, index) => (
          <div key={index} className="flex items-center gap-16 text-black">
            <span className="font-hand text-base">
              {word}
            </span>
            {/* El asterisco decorativo del boceto */}
            {/* <span className="text-xl sm:text-2xl text-black/40 font-sans">✶</span> */}
            <GiBeveledStar size={20}/>
          </div>
        ))}
      </div>
    </div>
  );
}