
import BrandIntro from '../components/home/BrandIntro';
import MyWork from '../components/home/MyWork';
import CustomOrder from '../components/home/CustomOrder';
import FloatingWhatsapp from '../components/FloatingWhatsapp';
import About from '../components/home/About';

export default function AboutScreen() {
    return(
        <div className="relative overflow-hidden">
            <BrandIntro />
            <MyWork />
            <CustomOrder />
            <About />
            <FloatingWhatsapp visible={true} /> 
        </div>
    )
}