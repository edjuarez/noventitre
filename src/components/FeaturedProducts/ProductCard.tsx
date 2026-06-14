import { MessageCircle } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
}

export default function ProductCard({
  name,
  description,
  image,
}: ProductCardProps) {
  return (
    <article
      className="
        bg-white
        rounded-2xl
        overflow-hidden
        border
        border-black/5
        group
        transition
        hover:-translate-y-2
      "
    >
      <div className="aspect-square overflow-hidden bg-neutral-100">
        <img
          src={image}
          alt={name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />
      </div>

      <div className="p-5">

        <span
          className="
            inline-block
            text-[11px]
            uppercase
            tracking-wider
            bg-brand-lila
            text-black
            px-3
            py-1
            rounded-full
            mb-3
          "
        >
          Pieza única
        </span>

        <h3
          className="
            font-semibold
            text-lg
            mb-2
          "
        >
          {name}
        </h3>

        <p
          className="
            text-sm
            text-neutral-600
            mb-5
          "
        >
          {description}
        </p>

        <button
          className="
            w-10
            h-10
            rounded-full
            bg-black
            text-white
            flex
            items-center
            justify-center
            ml-auto
            hover:scale-110
            transition
          "
        >
          <MessageCircle size={18} />
        </button>

      </div>
    </article>
  );
}