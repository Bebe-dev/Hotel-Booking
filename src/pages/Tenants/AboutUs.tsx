import Testimonials from "../../components/testimonials";
import Hero from "../../sections/aboutUs/hero";
import Achievement from "../../sections/aboutUs/achievement";
import Footer from "../../components/Footer";
import Team from "../../sections/aboutUs/team";



export default function AboutUs() {

    return(
        <div>
            
            <Hero />
            <Achievement />
            <Team />
            <Testimonials variant="about" />
            <Footer />
        </div>
    )
}