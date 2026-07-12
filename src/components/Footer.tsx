import {
  MessageCircle,
  Images,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="contacto"className="bg-white border-t border-neutral-200">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">

        <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-14">

          {/* Logo */}

          <div>

            <img
              src="/assets/logo.webp"
              alt="Noventitre"
              className="h-10"
            />

            <p className="mt-8 max-w-sm leading-8 text-neutral-600">

              Bolsos hechos a mano en Barcelona.
              Diseños únicos, personalizados y confeccionados
              con materiales cuidadosamente seleccionados.

            </p>

            <div className="flex gap-4 mt-10">

              <a
                href="#"
                className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <MessageCircle size={20} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <Images size={20} />
              </a>

            </div>

          </div>

          {/* Navegación */}

          <div>

            <h3 className="uppercase tracking-widest text-sm font-semibold mb-8">
              Navegación
            </h3>

            <ul className="space-y-5 text-neutral-600">

              <li><a href="#home">Home</a></li>

              <li><a href="#my-work">My Work</a></li>

              <li><a href="#my-world">My World</a></li>

              <li><a href="#custom-order">Tu idea, tu bolso</a></li>

            </ul>

          </div>

          {/* Contacto */}

          <div>

            <h3 className="uppercase tracking-widest text-sm font-semibold mb-8">
              Contacto
            </h3>

            <p className="text-neutral-600 leading-8">

              ¿Querés hacer un pedido o consultar por una
              personalización?

            </p>

            <a
              href="#"
              className="
                inline-flex
                mt-8
                rounded-full
                bg-black
                text-white
                px-7
                py-4
                hover:bg-neutral-800
                transition
              "
            >
              Escribime por WhatsApp
            </a>

          </div>

        </div>

        <div className="border-t border-neutral-200 mt-20 pt-8 flex flex-col md:flex-row justify-between centergap-4 text-sm text-neutral-500">

          <p>© 2026 Noventitre.</p>

          {/* <p>
            Diseñado y desarrollado por edujuarez.dev
          </p> */}

        </div>

      </div>

    </footer>
  );
}