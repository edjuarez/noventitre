import { ArrowRight, MessageSquare } from "lucide-react";

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
    <section className="bg-brand-crema py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">

      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-yellow-200/30 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Texto */}
          <div className="lg:col-span-5 flex flex-col space-y-8">

            {/* <span className="font-hand text-3xl block mb-4">
              handmade in Barcelona
            </span> */}

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
              {/* <span className=" text-6xl md:text-7xl lg:text-8xl text-brand-rosa">
                 nadie.
              </span> */}
            </h1>
            <div className="space-y-6 max-w-md">
              <p className="text-lg text-gray-800 leading-relaxed font-sans">
                Diseños hechos a mano. Color, textura y personalidad en cada pieza.
              </p>
              {/* <div className="pt-4 border-l-4 border-brand-rosa pl-6 italic font-medium text-black">
                "No seguís tendencias. <br />
                Creás tu propio lenguaje."
              </div> */}
            </div>

            <div className="flex flex-wrap gap-4 mt-10">

              <button className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-2">
                Ver colección
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handleWhatsAppContact}
                className="bg-brand-rosa text-white px-8 py-4 rounded-full flex items-center gap-2"
              >
                <MessageSquare size={18} />
                WhatsApp
              </button>

            </div>
          </div>

          {/* Imagen */}
          <div className="relative flex justify-center">

            {/* Sticker superior */}
            <img
              src="/assets/decoraciones/sticker-handmade.svg"
              alt=""
              className="absolute top-10 left-10 w-32 z-20"
            />

            {/* Producto principal */}
            <img
              // src="/assets/decoraciones/noventitre-bags-hero.webp"
              src="/assets/hero_bag.png"
              alt="Noventitre Bags"
              className="w-full max-w-3xl drop-shadow-2xl"
            />

            {/* Sticker inferior */}
            <img
              src="/assets/decoraciones/sticker-custom-made.svg"
              alt=""
              className="absolute bottom-10 right-10 w-28 z-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}