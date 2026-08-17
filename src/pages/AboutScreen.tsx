
import BrandIntro from '../components/home/BrandIntro';
import MyWork from '../components/home/MyWork';
import CustomOrder from '../components/home/CustomOrder';
import FloatingWhatsapp from '../components/FloatingWhatsapp';
import About from '../components/home/About';

export default function AboutScreen() {
    return(
        <>
            <BrandIntro />
            <MyWork />
            <CustomOrder />
            <About />
            <FloatingWhatsapp visible={true} /> 
        </>
    )
}