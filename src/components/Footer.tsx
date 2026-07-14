
import { userData } from "../data/userData";
import { FaMobileScreen } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="contacto"className="bg-white border-t border-neutral-100 mb-40">

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

              Hecho a mano en Barcelona.<br />
              Diseños personalizados.<br />
              Diseños únicos.

            </p>

            <div className="flex gap-4 mt-10">

              {/* <a
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
              </a> */}

            </div>

          </div>

          {/* Navegación */}

          <div>

            <h3 className="uppercase tracking-widest text-sm font-semibold mb-8">
              Navegación
            </h3>

            <ul className="space-y-5 text-neutral-600">
              <li><a href="#home">Inicio</a></li>

              <li><a href="#sobre-mi">Sobre mí</a></li>

              <li><a href="#mi-mundo">Galería</a></li>

              <li><a href="#mi-trabajo">Proceso</a></li>

              <li><a href="#contacto">Seguime</a></li>
            </ul>

          </div>
          {/* <div>

            <h3 className="uppercase tracking-widest text-sm font-semibold mb-8">
              INFORMACIÓN
            </h3>

            <ul className="space-y-5 text-neutral-600">

              <li><a href="#mi-mundo">Preguntas frecuentes</a></li>

              <li><a href="#mi-trabajo">Políticas</a></li>

            </ul>
          </div> */}
          <div>
            <h3 className="uppercase tracking-widest text-sm font-semibold mb-8">
              Contacto
            </h3>
            <ul className="space-y-5 text-neutral-600">
                
                <li className="flex items-center gap-3">
                  <FaMobileScreen size={20} />
                  <a href={userData.number} target="_blank" rel="noopener noreferrer">
                  {userData.number}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <IoIosMail size={20} />
                  <a href={userData.email} target="_blank" rel="noopener noreferrer">
                  {userData.email}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <BiLogoInstagramAlt size={20} />
                  <a href={userData.instagram} target="_blank" rel="noopener noreferrer">
                  instagram.com/noventitre
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <FaMapLocationDot size={20} />
                  <p className="text-neutral-600 leading-7">
                    Barcelona, España
                  </p>
                </li>
              </ul>
          </div>
          {/* Contacto */}

          {/* <div>

            <h3 className="uppercase tracking-widest text-sm font-semibold mb-8">
              Contacto
            </h3>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <p>+ 6517742987</p>
                <p>hola@gmail.com</p>
                <a
                  href="https://wa.me/TUNUMERO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 border-2 border-neutral-900 px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                >
                  <FaWhatsapp 
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  WhatsApp
                </a>

                <a
                  href="https://instagram.com/TUUSUARIO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 border-2 border-neutral-900 px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                >
                  <FaInstagram
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  Instagram
                </a>
              </div>
          </div> */}

        </div>

        <div className="border-t border-neutral-200 mt-20 pt-8 text-sm text-neutral-500 text-center">
          <p>© 2026 Noventitre.</p>
        </div>

      </div>

    </footer>
  );
}