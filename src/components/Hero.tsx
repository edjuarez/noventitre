import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react'; // Asumiendo que instalaste lucide-react

export default function Hero(): React.JSX.Element {
  
  // Función para WhatsApp
  const handleWhatsAppContact = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const phoneNumber = "34600000000"; // Tu número real
    const message = encodeURIComponent(
      "¡Hola! Vengo de la web y me interesa un bolso único. ✨"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-crema px-6 py-16 md:px-12 lg:px-20 flex items-center justify-center">
      
      {/* ========================================================================= */}
      {/* CAPA 1: DECORACIONES DE FONDO (Detrás de todo)                          */}
      {/* ========================================================================= */}
      
      {/* Estrella Púrpura - Arriba a la izquierda */}
      <img 
        src="/assets/decoraciones/star-purple.svg" 
        alt="" 
        className="absolute top-12 left-10 w-16 h-16 opacity-90 z-0 pointer-events-none animate-pulse"
      />

      {/* Trazo de Pintura Rosa de Fondo - Seccion de la derecha */}
      <img 
        src="/assets/decoraciones/paint-stroke.svg" 
        alt="" 
        className="absolute top-1/4 right-0 w-3/5 md:w-2/5 opacity-90 z-0 pointer-events-none select-none transform translate-x-12 translate-y-12"
      />


      {/* ========================================================================= */}
      {/* CAPA 2: CONTENEDOR PRINCIPAL: GRID 1:1                                    */}
      {/* ========================================================================= */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 w-full max-w-7xl">
        
        {/* COLUMNA IZQUIERDA: TEXTO MASIVO */}
        <div className="flex flex-col space-y-3 max-w-xl md:max-w-3xl">
          
          {/* Tag "handmade" simulando escritura a mano */}
          <span className="font-hand text-3xl text-black tracking-wide -rotate-1 origin-left transform -translate-x-2 pb-2">
            diseños hechos a mano
          </span>

          {/* TÍTULO PRINCIPAL: LA CLAVE DE LA ESCALA */}
          {/* text-[6rem] en móvil, text-[8.5rem] en tablet, text-[11rem] en escritorio */}
          {/* leading-[0.8] para apretar líneas, tracking-wider para espaciar letras estiradas */}
            <h1 className="text-[6rem] sm:text-[9.5rem] lg:text-[8rem] font-normal text-black leading-[0.82] uppercase font-heading tracking-[0.04em]">
            Bolsos <br /> 
            que no se <br /> 
            parecen a <br />
            <span className="text-brand-rosa relative inline-flex items-center gap-4">
                Nadie.
                {/* El corazón dibujado */}
                <img 
                src="/assets/decoraciones/heart-drawn.svg" 
                alt="" 
                className="w-14 h-14 md:w-18 md:h-18 -rotate-12 inline-block transform translate-y-3"
                />
            </span>
            </h1>
          
          <p className="text-base sm:text-lg text-gray-900 leading-relaxed font-sans pt-6 max-w-lg">
            Diseños hechos a mano en Barcelona. Color, textura y personalidad en cada pieza.
          </p>
          
          {/* Botones de acción */}
          <div className="flex flex-wrap gap-5 pt-8">
            <button 
              type="button"
              className="bg-black text-white px-10 py-4.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-black/10"
            >
              Ver Colección <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              type="button"
              onClick={handleWhatsAppContact}
              className="bg-brand-rosa text-white px-10 py-4.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-pink-600 transition-all active:scale-95 shadow-lg shadow-brand-rosa/20"
            >
              <MessageSquare className="w-5 h-5" />
              Pedir por WhatsApp
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMNA DERECHA: COMPOSICIÓN DE IMAGEN + STICKERS                     */}
        {/* ========================================================================= */}
        <div className="relative flex justify-center md:justify-end items-center mt-12 md:mt-0 transform md:scale-110 lg:scale-120">
          
          {/* Imagen Principal (WebP con fondo transparente y sombreado profundo para look collage) */}
          <img 
            src="/assets/decoraciones/noventitre-bags-hero.webp" 
            alt="Colección de Bolsos Noventitre" 
            className="relative z-10 w-full max-w-lg md:max-w-xl lg:max-w-3xl transform md:translate-x-12 select-none drop-shadow-2xl"
          />

          {/* STICKERS SUPERPUESTOS (Z-20 para ir POR ENCIMA de los bolsos) */}
          
          {/* Sticker circular "handmade" arriba (Usando imagen generada como guía) */}
          <img 
            src="/assets/decoraciones/sticker-handmade.svg" 
            alt="Handmade"
            className="absolute -top-10 left-[45%] w-32 sm:w-40 -rotate-6 z-20 pointer-events-none drop-shadow-sm"
          />

          {/* Sticker Verde rectangular "one of a kind" en el centro */}
          <img 
            src="/assets/decoraciones/sticker-one-of-a-kind.svg" 
            alt="One of a kind"
            className="absolute top-[38%] left-[25%] w-36 sm:w-44 rotate-3 z-20 pointer-events-none drop-shadow-sm"
          />

          {/* Sticker Circular "custom made" abajo a la derecha */}
          <img 
            src="/assets/decoraciones/sticker-custom-made.svg" 
            alt="Custom Made"
            className="absolute -bottom-10 right-[15%] w-28 sm:w-36 z-20 pointer-events-none animate-[spin_20s_linear_infinite]"
          />

          {/* Cuño / Estampa de "MADE IN BARCELONA" (Z-0 por si el bolso lo pisa sutilmente) */}
          <img 
          src="/assets/decoraciones/stamp-barcelona.svg" 
          alt="Made in Barcelona"
          className="absolute top-[25%] -right-10 w-40 sm:w-48 z-0 opacity-90 pointer-events-none hidden sm:block rotate-1"
          />
        </div>

      </div>

      {/* ========================================================================= */}
      {/* CAPA 3: ELEMENTOS INFERIORES                                            */}
      {/* ========================================================================= */}
      
      {/* Indicadores de Scroll y Tag de Piezas Únicas abajo al centro */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none hidden md:flex">
        {/* Puntos del carrusel */}
        <div className="flex gap-2.5">
          <span className="w-3.5 h-3.5 rounded-full border border-black/10 bg-black"></span>
          <span className="w-3.5 h-3.5 rounded-full border border-black/10 bg-white"></span>
          <span className="w-3.5 h-3.5 rounded-full border border-black/10 bg-white"></span>
          <span className="w-3.5 h-3.5 rounded-full border border-black/10 bg-white"></span>
        </div>
        {/* Tag rosa a mano */}
        <span className="font-hand text-2xl text-brand-rosa rotate-[-1deg] translate-x-3">
          piezas únicas
        </span>
      </div>

    </section>
  );
}