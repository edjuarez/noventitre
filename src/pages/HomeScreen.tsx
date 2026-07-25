import Footer from '../components/Footer';
import About from '../components/About';
import MyWork from '../components/MyWork';
import MyWorld from '../components/MyWorld';
import CustomOrder from '../components/CustomOrder';
import Hero from '../components/Hero';
import { useEffect, useState } from 'react';
import FloatingWhatsapp from '../components/FloatingWhatsapp';
import FollowMe from '../components/FollowMe';
import { useLocation, useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const [showFloatingWhatsapp, setShowFloatingWhatsapp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setShowFloatingWhatsapp(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {

      const params = new URLSearchParams(location.search);

      const section = params.get("section");

      if (!section) return;

      requestAnimationFrame(() => {

          document.getElementById(section)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
          });

          navigate("/", { replace: true });

      });

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
