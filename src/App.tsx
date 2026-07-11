import './App.css'

import WhyNoventitre from './components/WhyNoventitre'
import TickerBanner from './components/TickerBanner'
import Gallery from './components/Gallery'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './components/About'
import MyWork from './components/myWork'
import MyWorld from './components/MyWorld'
import CustomOrder from './components/CustomOrder'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-brand-crema text-black antialiased selection:bg-brand-rosa selection:text-white">

      <Navbar />
      {/* ========================================================================= */}
      {/* CONTENIDO PRINCIPAL                                                       */}
      {/* ========================================================================= */}
      <main>
        <Hero />
        <About />
        <MyWork />
        <MyWorld />
        <CustomOrder />
        <Footer />
        {/* <TickerBanner />
        <WhyNoventitre />
        <Gallery />
        <FeaturedProducts />
         */}
      </main>
    </div>
  )
}

export default App
