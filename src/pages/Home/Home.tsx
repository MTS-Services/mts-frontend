
import HeroSection from "../../components/Home/HeroSection/HeroSection";
import ProjectsSlider from "../../components/Home/ProjectsSlider/ProjectsSlider";
// import Services from "../../components/Home/Services/Services";
import ServicesCart from "../../components/Home/ServicesCart/ServicesCart";


function Home ()  {
  return (
    <div className="bg-background">
      <HeroSection></HeroSection>
      <ServicesCart></ServicesCart>
      {/* <Services></Services> */}

      <ProjectsSlider></ProjectsSlider>
    
    </div>
  )
}

export default Home

