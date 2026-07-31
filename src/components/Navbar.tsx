import { useEffect, useState } from "react";
import {
    Menu,
    X,
    User,
    ShoppingBag
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { useCart } from "../context/CartContext";

type NavItem =
  | {
      label: string;
      type: "section";
      target: string;
      href?: string;
    }
  | {
      label: string;
      type: "route";
      target: string;
      href?: string;
    };

const navItems: NavItem[] = [
  { label: "Inicio", type: "section", target: "home" },
  { label: "Colección", type: "route", target: "/catalogo" },
  { label: "Admin", type: "route", target: "/admin" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isExpanded = isHome && !scrolled;

  const { cartItems, toggleCart } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 180);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (item: NavItem) => {
    setIsOpen(false);

    if (item.type === "route") {
      navigate(item.target);
      return;
    }

    if (location.pathname === "/") {
      document.getElementById(item.target)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    navigate(`/?section=${item.target}`);
  };

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${
          isExpanded
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-sm"
        }
      `}
    >
      <nav
        className={`
          w-full mx-auto
          px-6 lg:px-10
          transition-all duration-500
          ${isExpanded ? "py-6" : "py-3"}
        `}
      >
        {/* Desktop */}

        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center">

          {/* Left */}

          <div className="flex justify-start gap-8">

            <button
              onClick={() => handleNavigation(navItems[0])}
              className={`
                uppercase
                tracking-wide
                transition-all
                duration-500
                hover:text-brand-rosa
                cursor-pointer
                ${isExpanded ? "text-base" : "text-sm"}
              `}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavigation(navItems[1])}
              className={`
                uppercase
                tracking-wide
                transition-all
                duration-500
                hover:text-brand-rosa
                cursor-pointer
                ${isExpanded ? "text-base" : "text-sm"}
              `}
            >
              Catalogo
            </button>

          </div>

          {/* Logo */}

          <div className="flex justify-center">

            <button
              onClick={() => navigate("/")}
              className={`
                transition-all duration-500 ease-in-out
                ${
                  isExpanded
                    ? "w-44 translate-y-2"
                    : "w-28 translate-y-0"
                }
              `}
            >
              <img
                src="/assets/logo.webp"
                alt="Noventitre"
                className="w-full h-auto object-contain"
              />
            </button>

          </div>

          {/* Right */}

          <div className="flex justify-end items-center gap-6">

              <a
                  href="https://instagram.com/tuusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-rosa transition"
              >
                  <FaInstagram size={20} />
              </a>

              <button
                  onClick={() => navigate("/login")}
                  className="hover:text-brand-rosa transition cursor-pointer"
              >
                  <User size={20} />
              </button>

              <button
                  onClick={() => toggleCart()}
                  className="relative hover:text-brand-rosa transition cursor-pointer"
              >
                  <ShoppingBag size={20} />

                  {/* Badge */}

                  <span
                      className="
                          absolute
                          -top-2
                          -right-2
                          w-5
                          h-5
                          rounded-full
                          bg-brand-rosa
                          text-white
                          text-[11px]
                          flex
                          items-center
                          justify-center
                      "
                  >
                      {cartItems.length}
                  </span>

              </button>

          </div>

        </div>

        {/* Mobile */}

        <div className="md:hidden flex items-center justify-between">

          <button
            onClick={() => navigate("/")}
            className="w-28"
          >
            <img
              src="/assets/logo.webp"
              alt="Noventitre"
              className="w-full"
            />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

      </nav>

      {/* Mobile Menu */}

      <div
        className={`
          fixed inset-0 z-40 bg-white
          flex items-center justify-center
          transition-all duration-300 md:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <ul className="flex flex-col gap-8 text-center">

          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavigation(item)}
                className="text-2xl uppercase hover:text-brand-rosa transition"
              >
                {item.label}
              </button>
            </li>
          ))}

        </ul>

      </div>

    </header>
  );
}