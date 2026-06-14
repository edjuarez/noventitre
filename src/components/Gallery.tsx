import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../data/gallery";

export default function Gallery() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-brand-crema py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">

      <div className="container mx-auto max-w-7xl relative z-10">

        <div className="grid lg:grid-cols-[320px_1fr] gap-0 items-center">

          {/* Columna izquierda */}
          <div>

            <span className="font-hand text-brand-rosa text-2xl">
              lookbook
            </span>

            <h2
              className="
                mt-4
                font-heading
                uppercase
                leading-[0.9]
                text-5xl
                lg:text-6xl
              "
            >
              Hecho para
              <br />
              destacar.
            </h2>

            <button
              className="
                mt-8
                bg-black
                text-white
                rounded-full
                px-8
                py-4
                text-sm
                uppercase
                tracking-wider
                hover:scale-105
                transition
              "
            >
              Ver toda la galería
            </button>

          </div>

          {/* Galería */}
          <div className="relative w-250">

            {/* Flecha izquierda */}
            <button
              onClick={scrollLeft}
              className="
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                -translate-x-5
                z-20
                w-12
                h-12
                rounded-full
                bg-white
                shadow-lg
                flex
                items-center
                justify-center
                hover:scale-110
                transition
              "
            >
              <ChevronLeft size={20} />
            </button>

            {/* Flecha derecha */}
            <button
              onClick={scrollRight}
              className="
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                translate-x-5
                z-20
                w-12
                h-12
                rounded-full
                bg-white
                shadow-lg
                flex
                items-center
                justify-center
                hover:scale-110
                transition
              "
            >
              <ChevronRight size={20} />
            </button>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="
                flex
                gap-4
                overflow-x-auto
                scroll-smooth
                snap-x
                snap-mandatory
                scrollbar-none
              "
            >
              {galleryImages.map((item, index) => (
                <article
                  key={item.id}
                  className={`
                    shrink-0
                    snap-start
                    overflow-hidden
                    rounded-sm
                    bg-white
                    shadow-sm
                    group
                    cursor-pointer

                    ${
                      index === 0
                        ? "w-[280px] h-[420px]"
                        : index === 1
                        ? "w-[240px] h-[420px]"
                        : index === 2
                        ? "w-[260px] h-[420px]"
                        : "w-[280px] h-[420px]"
                    }
                  `}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </article>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}