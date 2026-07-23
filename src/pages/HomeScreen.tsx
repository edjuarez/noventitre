import Footer from '../components/Footer'
import About from '../components/About'
import MyWork from '../components/MyWork'
import MyWorld from '../components/MyWorld'
import CustomOrder from '../components/CustomOrder'
import Hero from '../components/Hero'
import { useEffect, useState } from 'react'
import FloatingWhatsapp from '../components/FloatingWhatsapp'
import FollowMe from '../components/FollowMe'

export default function HomeScreen() {
  const [showFloatingWhatsapp, setShowFloatingWhatsapp] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowFloatingWhatsapp(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
      <>
        <Hero />
        <About />
        <MyWorld />
        <MyWork />
        <CustomOrder />
        <FollowMe />
        <Footer />
         <FloatingWhatsapp visible={showFloatingWhatsapp} />
      </>
  )
}
