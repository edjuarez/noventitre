import {
  ArrowRight,
  Camera,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa6";

const images = [
  "/assets/myWorld/myworld_1.webp",
  "/assets/myWorld/myworld_2.webp",
  "/assets/myWorld/myworld_3.webp",
  "/assets/myWorld/myworld_4.webp",
  "/assets/myWorld/myworld_5.webp",
  "/assets/myWorld/myworld_6.webp",
];

export default function MyWorld() {
  return (
    <section id="mi-mundo" className="bg-brand-crema py-32 px-6 md:px-12 lg:px-20">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10 mb-16">

          <div>

            <span className="uppercase tracking-[0.25em] text-xs text-neutral-500">
              Detrás de escena
            </span>

            <h2 className="mt-4 font-heading text-5xl md:text-6xl leading-tight">

              Un vistazo
              <br />
              a mi mundo.

            </h2>

            <p className="mt-6 max-w-xl text-neutral-600 leading-8 text-lg">

              Cada bolso empieza mucho antes de estar terminado.
              Acá comparto parte del proceso, los materiales,
              las ideas y algunos momentos del taller.

            </p>

          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              border
              border-black
              rounded-full
              px-7
              py-4
              hover:bg-black
              hover:text-white
              transition-all
            "
          >
            <FaInstagram />

            Seguir en Instagram

            <ArrowRight size={18} />

          </a>

        </div>

        {/* Galería */}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

          {images.map((image, index) => (

            <article
              key={index}
              className="
                group
                overflow-hidden
                rounded-xl
                bg-neutral-100
                relative
                aspect-square
              "
            >

              <img
                src={image}
                alt={`Noventitre ${index + 1}`}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-120
                  cursor-pointer
                "
              />

{/*               <div
                className="
                  absolute
                  inset-0
                  bg-black/0
                  group-hover:bg-black/20
                  transition
                  flex
                  items-center
                  justify-center
                "
              >

                <Camera
                  className="
                    opacity-0
                    group-hover:opacity-100
                    text-white
                    transition
                  "
                  size={28}
                />

              </div> */}

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}