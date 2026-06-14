import ProductCard from "./ProductCard";
import { featuredProducts } from "../../data/products";

export default function FeaturedProducts() {
  return (
    <section className="bg-brand-crema py-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div
          className="
            grid
            lg:grid-cols-[320px_1fr]
            gap-12
            items-start
          "
        >

          {/* Columna izquierda */}

          <div className="sticky top-24">

            <span
              className="
                font-hand
                text-brand-rosa
                text-2xl
              "
            >
              piezas únicas
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
              Productos
              <br />
              destacados.
            </h2>

            <div
              className="
                mt-8
                bg-brand-lila
                rounded-full
                px-6
                py-4
                inline-block
                rotate-[-6deg]
                font-hand
                text-xl
              "
            >
              Cada pieza cuenta una historia.
            </div>

            <button
              className="
                mt-8
                block
                bg-black
                text-white
                px-8
                py-4
                rounded-full
                uppercase
                tracking-wider
                text-sm
              "
            >
              Ver todos
            </button>

          </div>

          {/* Columna derecha */}

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-4
              gap-6
            "
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                image={product.image}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}