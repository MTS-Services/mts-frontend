import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import solid icons (for non-brand specific icons)
import { 
  faMobileAlt, 
  faBuilding, 
  faPaintBrush, 
  faAd, 
  faLaptopCode, 
  faSearch 
} from '@fortawesome/free-solid-svg-icons';

// Import brand icons (for brand specific icons)
import { 
  faWordpress, 
  faReact, 
  faPhp, 
  faShopify, 
  faWix, 
  faWebflow 
} from '@fortawesome/free-brands-svg-icons';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Services data using only icons
const services = [
  {
    id: 1,
    icon: faWordpress,
    title: "WordPress",
    description: "Custom WordPress website development with modern design and optimized performance.",
    features: ["Theme Customization", "Elementor & WPBakery", "SEO Optimization", "Speed Optimization"],
  },
  {
    id: 2,
    icon: faReact,
    title: "Full Stack",
    description: "Full-stack web development using MongoDB, Express, React, and Node.js.",
    features: ["MERN Stack Apps", "REST APIs", "JWT Auth", "React Hooks"],
  },
  {
    id: 3,
    icon: faPhp,
    title: "PHP",
    description: "Custom WordPress plugin development tailored to your business needs.",
    features: ["PHP OOP", "Custom Post Types", "Shortcodes", "WooCommerce Hooks"],
  },
  {  
    id: 4,
    icon: faMobileAlt,
    title: "App",
    description: "Cross-platform mobile apps built with Flutter for Android & iOS.",
    features: ["Firebase Integration", "Responsive UI", "State Management", "API Integration"],
  },
  
  {
    id: 6,
    icon: faBuilding,
    title: "B2B",
    description: "Enterprise-grade business-to-business platforms and marketplaces.",
    features: ["Multi-Vendor", "Custom CRM", "Secure Portals", "API Integrations"],
  },
  {
    id: 7,
    icon: faShopify,
    title: "Shopify",
    description: "Professional Shopify store setup with apps, themes, and product listings.",
    features: ["Custom Themes", "Product Optimization", "SEO", "Liquid Code"],
  },
  {
    id: 8,
    icon: faWix,
    title: "Wix",
    description: "Creative Wix websites with interactive sections and professional styling.",
    features: ["Drag & Drop Builder", "Animations", "SEO Tools", "Responsive Layout"],
  },
  {
    id: 9,
    icon: faWebflow,
    title: "Webflow",
    description: "Advanced, animation-rich websites using Webflow and CMS features.",
    features: ["Custom CMS", "Figma to Webflow", "Interactions", "Clean HTML/CSS"],
  },
  {
    id: 10,
    icon: faPaintBrush,
    title: "Graphics Design",
    description: "Eye-catching designs for web, social media, branding, and print.",
    features: ["Posters & Banners", "Brand Identity", "Business Cards", "Print Design"],
  },
  {
    id: 11,
    icon: faAd,
    title: "Ads",
    description: "Target the right audience with high-impact digital ads.",
    features: ["Facebook Ads", "Google Ads", "TikTok Ads", "YouTube Ads"],
  },
  {
    id: 12,
    icon: faLaptopCode,
    title: "Web Development",
    description: "Custom-built websites tailored to your business needs.",
    features: ["Responsive Design", "CMS Integration", "Secure Development", "Scalable Solutions"],
  },
  {
    id: 13,
    icon: faSearch,
    title: "SEO",
    description: "Improve your site's ranking and visibility on Google and other search engines.",
    features: ["On-page SEO", "Technical SEO", "Link Building", "Content Strategy"],
  },
];

const ServicesCart = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
 <section className="py-16 bg-background mx-auto">
  <div className="w-full lg:w-[1480px] mx-auto text-center px-4 sm:px-8 ">
    <h2
      className="text-3xl sm:text-4xl font-bold text-[#FFF] mb-12"
      data-aos="fade-down"
    >
      Our Services
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {services.map((service, idx) => (
        <div
          key={service.id}
          className="p-6 bg-card rounded-2xl shadow-box-style shadow-primary transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay={idx * 150}
        >
          <div className="text-4xl text-[#FFF] mb-4">
            <FontAwesomeIcon icon={service.icon} />
          </div>
          <h3 className="text-[24px] font-semibold text-primary mb-2 font-primary">
            {service.title}
          </h3>
          <p className="text-[#FFF] font-secondary">{service.description}</p>
        </div>
      ))}
    </div>

    {/* Call to Action Section */}
    
  
  </div>
</section>

  );
};

export default ServicesCart;
