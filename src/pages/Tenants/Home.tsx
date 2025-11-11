import Footer from "../../components/Footer";
import Hero from "../../sections/landing/Hero";
import Hero2 from "../../sections/landing/Hero2";
import Process from "../../sections/landing/Process";
import Rooms from "../../sections/landing/Rooms";
import Testimonials from "../../components/testimonials";

export default function Home() {
  return (
    <div>
      
      <Hero />
      <Hero2 />
      <Rooms />
      <Testimonials variant="home" />
      <Process />
      <Footer />
    </div>
  );
}
