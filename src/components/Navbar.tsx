import React from "react";

const navItems = [
  { label: "Inicio", href: "#home" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Mi trabajo", href: "#mi-trabajo" },
  { label: "Mi mundo", href: "#mi-mundo" },
  { label: "Contacto", href: "#contacto" },
];
export default function Navbar() {
  return (
<header
    className="
        absolute
        inset-x-0
        top-0
        z-50
        bg-white
    "
>
      <nav className="mx-auto flex h-20 items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-light uppercase"
        >
          NOVENTITRE
        </a>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Instagram */}
        <a
          href="https://instagram.com/noventitre"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-black px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white"
        >
          Instagram
        </a>
      </nav>
    </header>
  );
}