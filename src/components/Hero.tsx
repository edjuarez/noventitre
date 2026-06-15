import { ArrowRight, MessageSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function HeroV2() {
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

  return (
    <section className="bg-brand-crema pt-16 pb-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 border border-green-500">
        <div className="border border-red-500 flex flex-col justify-center"> 
          <h1 className="font-heading uppercase leading-[0.9] text-black">
            <span className="block text-6xl md:text-7xl lg:text-8xl">
            Bolsos
            </span>
            <span className="block text-6xl md:text-7xl lg:text-8xl">
            que no se
            </span>
            <span className="block text-6xl md:text-7xl lg:text-8xl">
            parecen a <span className="text-brand-rosa">nadie.</span>
            </span>
          </h1>
          <p className="text-lg text-gray-800 leading-relaxed font-hand">Diseños hechos a mano.</p>
          <p className="text-lg text-gray-800 leading-relaxed font-hand">Color, textura y personalidad en cada pieza.</p>
            <div className="flex flex-wrap gap-4 mt-10">

              <button className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-2">
                Ver colección
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handleWhatsAppContact}
                className="bg-brand-rosa text-white px-8 py-4 rounded-full flex items-center gap-2"
              >
                Pedir por WhatsApp
                {/* <MessageSquare size={18} /> */}
                <FaWhatsapp />
              </button>

            </div>
        </div>
        <div className="border border-red-500">
            <img
              src="/assets/hero_bag.png"
              alt="Noventitre Bags"
              className="w-full max-w-3xl drop-shadow-2xl"
            />
        </div>
      </div>
    </section>
  );
}