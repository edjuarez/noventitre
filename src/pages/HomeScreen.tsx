//import Footer from '../components/Footer';
import About from '../components/home/About';
import MyWork from '../components/home/MyWork';
import MyWorld from '../components/home/MyWorld';
import CustomOrder from '../components/home/CustomOrder';
import Hero from '../components/home/Hero';
import { useEffect, useState } from 'react';
import FloatingWhatsapp from '../components/FloatingWhatsapp';
import FollowMe from '../components/home/FollowMe';
import { useLocation, useNavigate } from "react-router-dom";
//import {CartDrawer} from '../components/CartDrawer';

export default function HomeScreen() {
  const [showFloatingWhatsapp, setShowFloatingWhatsapp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
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
        {/* <CartDrawer /> */}
        <MyWorld />
        <MyWork />
        <CustomOrder />
        <About />
        <FollowMe />
         <FloatingWhatsapp visible={showFloatingWhatsapp} />
      </>
  )
}
