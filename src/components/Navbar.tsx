const navItems = [
  { label: "Inicio", href: "#home" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Mi mundo", href: "#mi-mundo" },
  // { label: "Mi trabajo", href: "#mi-trabajo" },
  { label: "Mi Propuesta", href: "#mi-trabajo" },
  //{ label: "Contacto", href: "#contacto" },
];
export default function Navbar() {
  return (
    <header
        className="
            fixed
            inset-x-0
            top-0
            z-50
            hover:bg-white
            transition duration-700
            cursor-pointer
        "
    >
      <nav className="mx-auto flex h-16 items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Logo */}
        <a href="/" className="h-16 w-32 p-2 flex items-center justify-center">
          <img
            src="/assets/logo.webp"
            alt="Noventitre Logo"
            className="h-full w-full object-contain"
          />
        </a>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-5 h-full">
          {navItems.map((item) => (
            <li key={item.label} className="h-full flex items-center p-[10px] transition-colors   ">
              <a
                href={item.href}
                className="text-sm uppercase transition-opacity hover:opacity-60 hover:text-brand-rosa"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Instagram */}
        {/* <a
          href="https://instagram.com/noventitre"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white"
        >
          <FaInstagram size={30} />
        </a> */}
      </nav>
    </header>
  );
}