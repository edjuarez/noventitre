export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  background: string;
  textColor: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/assets/hero_banner_1.webp",
    title: "Bolsos\nque no se\nparecen a\nnadie.",
    subtitle:
      "Cada pieza combina materiales, color y personalidad para acompañarte todos los días.",
    background: "#F7F3EE",
    textColor: "#290801",
  },
  {
    id: 2,
    image: "/assets/hero_banner_2.webp",
    title: "Cada pieza\ncuenta una\nhistoria.",
    subtitle:
      "No hay dos iguales. Cada pieza se confecciona de manera artesanal cuidando cada detalle.",
    background: "#E9DDD2",
    textColor: "#E9DDD2",
  },
  {
    id: 3,
    image: "/assets/hero_banner_3.webp",
    title: "Diseños\nhechos para\nvos.",
    subtitle:
      "Elegí colores, telas y detalles para crear un bolso completamente personalizado.",
    background: "#2D2B2A",
    textColor: "#111111",
  },
];