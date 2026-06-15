import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import WhyNoventitre from './components/WhyNoventitre'
import TickerBanner from './components/TickerBanner'
import Gallery from './components/Gallery'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-brand-crema text-black antialiased selection:bg-brand-rosa selection:text-white">

      <Navbar />
      {/* ========================================================================= */}
      {/* CONTENIDO PRINCIPAL                                                       */}
      {/* ========================================================================= */}
      <main>
        <Hero />
        <TickerBanner />
        <WhyNoventitre />
        <Gallery />
        <FeaturedProducts />
      </main>
    </div>
  )
}

export default App
