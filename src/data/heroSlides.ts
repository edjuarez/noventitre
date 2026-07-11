export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/assets/hero/hero-1.webp",
    title: "Bolsos\nque no se\nparecen a nadie.",
    subtitle:
      "Diseños hechos a mano en Barcelona. Cada pieza está confeccionada con atención al detalle y pensada para acompañarte todos los días.",
  },

  {
    id: 2,
    image: "/assets/hero/hero-2.webp",
    title: "Hechos\npara durar.",
    subtitle:
      "Materiales cuidadosamente seleccionados y terminaciones realizadas completamente a mano.",
  },

  {
    id: 3,
    image: "/assets/hero/hero-3.webp",
    title: "Diseños\npersonalizados.",
    subtitle:
      "Elegí telas, colores y combinaciones para crear un bolso único.",
  },
];