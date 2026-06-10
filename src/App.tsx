import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
<div className="min-h-screen bg-brand-crema text-black antialiased selection:bg-brand-rosa selection:text-white">
      
      {/* ========================================================================= */}
      {/* NAVBAR MINIMALISTA                                                        */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-brand-crema/80 backdrop-blur-md border-b border-black/5 px-6 py-4 md:px-12 lg:px-20">
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Logo con el estilo enmarcado de tu diseño */}
          <div className="border border-black px-3 py-1 font-sans font-black tracking-widest text-lg uppercase">
            noventitre
          </div>

          {/* Navegación básica */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-gray-600">
            <a href="#inicio" className="text-black hover:text-brand-rosa transition-colors">Inicio</a>
            <a href="#productos" className="hover:text-brand-rosa transition-colors">Productos</a>
            <a href="#personalizar" className="hover:text-brand-rosa transition-colors">Personalizar</a>
            <a href="#contacto" className="hover:text-brand-rosa transition-colors">Contacto</a>
          </nav>

          {/* Enlace de Instagram rápido */}
          <a 
            href="https://www.instagram.com/noventitre/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-wider text-black hover:text-brand-rosa transition-colors flex items-center gap-1"
          >
            Instagram <span className="text-sm">↗</span>
          </a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CONTENIDO PRINCIPAL                                                       */}
      {/* ========================================================================= */}
      <main>
        {/* Sección 1: El Hero que desarrollamos anteriormente */}
        <div id="inicio">
          <Hero />
        </div>

        {/* Sección 2: Explicativo de personalización (Placeholder basado en tu diseño) */}
        {/* <div id="personalizar">
             <CustomSteps />
           </div> */}

        {/* Sección 3: Galería de Productos Destacados con el botón de WhatsApp */}
        {/* <div id="productos">
             <ProductGallery />
           </div> */}
      </main>

      {/* ========================================================================= */}
      {/* FOOTER (Estructura base del boceto)                                       */}
      {/* ========================================================================= */}
      {/* <Footer /> */}

    </div>
  )
}

export default App
