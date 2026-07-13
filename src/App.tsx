import './App.css'

import WhyNoventitre from './components/WhyNoventitre'
import TickerBanner from './components/TickerBanner'
import Gallery from './components/Gallery'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './components/About'
import MyWork from './components/MyWork'
import MyWorld from './components/MyWorld'
import CustomOrder from './components/CustomOrder'
import Hero from './components/Hero'
import { useEffect, useState } from 'react'
import FloatingWhatsapp from './components/FloatingWhatsapp'
import FollowMe from './components/FollowMe'

function App() {
  const [showFloatingWhatsapp, setShowFloatingWhatsapp] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowFloatingWhatsapp(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="min-h-screen bg-brand-crema text-black antialiased selection:bg-brand-rosa selection:text-white">

      <Navbar />
      {/* ========================================================================= */}
      {/* CONTENIDO PRINCIPAL                                                       */}
      {/* ========================================================================= */}
      <main>
        <Hero />
        <About />
        <MyWorld />
        <MyWork />
        <CustomOrder />
        <FollowMe />
        <Footer />
        
        {/* <TickerBanner />
        <WhyNoventitre />
        <Gallery />
        <FeaturedProducts />
         */}
         <FloatingWhatsapp visible={showFloatingWhatsapp} />
      </main>
    </div>
  )
}

export default App
