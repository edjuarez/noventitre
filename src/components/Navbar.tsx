import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Inicio", href: "#home", navigate: "/" },
  { label: "Sobre mí", href: "#sobre-mi", navigate: "/" },
  { label: "Galería", href: "#mi-mundo", navigate: "/" },
  { label: "Proceso", href: "#mi-trabajo", navigate: "/" },
  { label: "Seguime", href: "#contacto", navigate: "/" },
  { label: "collection", href: "/collection", navigate: "/collection" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Bloquear el scroll del body cuando el menú de pantalla completa esté abierto
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflowY = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [isOpen]);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50 transition-colors duration-500 cursor-pointer
        ${isOpen ? "bg-white" : "hover:bg-white"}
      `}
    >
      <nav className="relative z-50 mx-auto flex h-16 items-center justify-between md:px-6 px-1 md:px-12 lg:px-20">
        {/* Logo (Siempre visible) */}
        <a href="/" className="h-16 w-32 p-2 flex items-center justify-center">
          <img
            src="/assets/logo.webp"
            alt="Noventitre Logo"
            className="h-full md:w-full w-[85%] object-contain"
          />
        </a>

        {/* Navigation Desktop */}
        <ul className="hidden md:flex items-center gap-5 h-full">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="h-full flex items-center p-[10px] transition-colors"
            >
              <a
                href={item.href}
                className="text-sm uppercase transition-opacity hover:opacity-60 hover:text-brand-rosa"
                onClick={() => navigate(item.navigate)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón Hamburger / Cerrar Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-black transition-transform active:scale-95"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menú Mobile Full Screen */}
      <div
        className={`
          fixed inset-0 z-40 bg-white flex flex-col items-center justify-center
          transition-all duration-300 ease-in-out md:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <ul className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium uppercase transition-colors hover:text-brand-rosa"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}