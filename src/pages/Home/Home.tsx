import CtaSection from "../../components/Home/CtaSection/CtaSection";
import HeroSection from "../../components/Home/HeroSection/HeroSection";
// import Services from "../../components/Home/Services/Services";
import ServicesCart from "../../components/Home/ServicesCart/ServicesCart";

function Home() {
  return (

    <div className="bg-background">
      <HeroSection></HeroSection>
      <ServicesCart></ServicesCart>
      {/* <Services></Services> */}
      <CtaSection></CtaSection>
    </div>
  );
}

export default Home;
