import React from 'react';
import { Heart, Sparkles, MapPin, Globe } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <div className="flex items-center gap-5 group py-4 border-b border-black/5 last:border-0">
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/5 group-hover:bg-brand-rosa group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-gray-900 leading-tight">
      {text}
    </span>
  </div>
);

export default function WhyNoventitre(): React.JSX.Element {
  return (
    <section className="bg-brand-crema py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      
      {/* Elemento decorativo de fondo (opcional) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/30 -skew-x-12 translate-x-20 z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* COLUMNA 1: MANIFIESTO (4 columnas de grid) */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <header className="space-y-4">
              <span className="font-hand text-3xl text-brand-rosa -rotate-1 inline-block">
                why noventitre?
              </span>
              <h2 className="text-7xl font-normal text-black leading-[0.85] uppercase font-heading tracking-wide">
                No hacemos <br />
                productos <br />
                <span className="text-brand-rosa">masivos.</span>
              </h2>
            </header>

            <div className="space-y-6 max-w-md">
              <p className="text-lg text-gray-800 leading-relaxed font-sans">
                Cada pieza es una historia de paciencia y color. En un mundo de copias, elegimos la imperfección deliberada de lo hecho a mano.
              </p>
              <div className="pt-4 border-l-4 border-brand-rosa pl-6 italic font-medium text-black">
                "No seguís tendencias. <br />
                Creás tu propio lenguaje."
              </div>
            </div>
          </div>

          {/* COLUMNA 2: LISTA VERTICAL (3 columnas de grid) */}
          <div className="lg:col-span-3 flex flex-col justify-center h-full lg:pt-20">
            <div className="space-y-2">
              <FeatureItem icon={<Heart size={18} />} text="Hecho con amor y paciencia" />
              <FeatureItem icon={<Sparkles size={18} />} text="Piezas únicas e irrepetibles" />
              <FeatureItem icon={<MapPin size={18} />} text="Artesanía local Barcelona" />
              <FeatureItem icon={<Globe size={18} />} text="Envíos a todo el mundo" />
            </div>
          </div>

          {/* COLUMNA 3: ESPACIO PARA COLLAGE (4 columnas de grid) */}
          <div className="lg:col-span-4 relative group lg:mt-0 mt-12">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl transform lg:rotate-2 group-hover:rotate-0 transition-transform duration-500">
              {/* Imagen de fondo del collage */}
              <img 
                src="http://googleusercontent.com/image_collection/image_retrieval/7557204710172263809" 
                alt="Noventitre Collage" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay decorativo estilo collage */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              {/* Sticker flotante sobre la imagen */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 shadow-xl -rotate-6 rounded-sm border border-black/5 hidden md:block">
                <p className="font-hand text-xl text-black">made in bcn</p>
              </div>
            </div>

            {/* Elemento gráfico de apoyo */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-rosa/10 rounded-full blur-2xl animate-pulse"></div>
          </div>

        </div>
    </section>
  );
}