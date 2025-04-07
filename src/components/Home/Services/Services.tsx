// Importing necessary FontAwesome components and icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// Defining the services data
const services = [
  {
    id: 1,
    image: "/assits/services/wordpress.png",
    title: "WordPress",
    description: "Custom WordPress website development with modern design and optimized performance.",
    features: ["Theme Customization", "Elementor & WPBakery", "SEO Optimization", "Speed Optimization"],
  },

  {
    id: 2,
    image: "/assits/services/MERN.png",
    title: "Full Stack",
    description: "Full-stack web development using MongoDB, Express, React, and Node.js.",
    features: ["MERN Stack Apps", "REST APIs", "JWT Auth", "React Hooks"],
  },

  //  {
  //   id: 3,
  //   image: "/assits/services/php.png",
  //    title: "PHP",
  //   description: "Custom WordPress plugin development tailored to your business needs.",
  //   features: ["PHP OOP", "Custom Post Types", "Shortcodes", "WooCommerce Hooks"],
  // },
  {  
    id: 4,
    image: "/assits/services/Flutter.png",
    title: " App",
    description: "Cross-platform mobile apps built with Flutter for Android & iOS.",
    features: ["Firebase Integration", "Responsive UI", "State Management", "API Integration"],
  },

  // {
  //   id: 5,
  //   image: "assits/services/woocommerce.png",
  //   title: "WooCommerce Stores",
  //   description: "Create and manage your online store with WooCommerce & WordPress.",
  //   features: ["Product Setup", "Payment Gateways", "Custom Checkout", "Responsive Design"],
  // },
  {
    id: 6,
    image: "assits/services/b2b.png",
    title: "B2B  ",
    description: "Enterprise-grade business-to-business platforms and marketplaces.",
    features: ["Multi-Vendor", "Custom CRM", "Secure Portals", "API Integrations"],
  },
  {
    id: 7,
    image: "assits/services/Shopify.png",
    title: "Shopify  ",
    description: "Professional Shopify store setup with apps, themes, and product listings.",
    features: ["Custom Themes", "Product Optimization", "SEO", "Liquid Code"],
  },

  {
    id: 8,
    image: "/assits/services/wix.png",
    title: "Wix  ",
    description: "Creative Wix websites with interactive sections and professional styling.",
    features: ["Drag & Drop Builder", "Animations", "SEO Tools", "Responsive Layout"],
  },


  {
    id: 9,
    image: "assits/services/wevplow.png",
    title: "Webflow ",
    description: "Advanced, animation-rich websites using Webflow and CMS features.",
    features: ["Custom CMS", "Figma to Webflow", "Interactions", "Clean HTML/CSS"],
  },
  
  {
    id: 10,
    image: "/assits/services/Graphic.png",
    title: "Graphics Design",
    description: "Eye-catching designs for web, social media, branding, and print.",
    features: ["Posters & Banners", "Brand Identity", "Business Cards", "Print Design"],
  },
 
  {
    id: 11,
    image: "/assits/services/googleAdds.png",
    title: " Ads",
    description: "Target the right audience with high-impact digital ads.",
    features: ["Facebook adds", "Google adds","Tik Tok adds", " Youtube adds", ],
  },

 

  {
    id: 13,
    image: "/assits/services/ui-ux.png",
    title: "UI/UX Design",
    description: "User-centered designs for apps, websites, and software interfaces.",
    features: ["Wireframing", "Prototyping", "User Flows", "Figma/Adobe XD"],
  },
  {
    id: 14,
    image: "/assits/services/seo.png",
    title: "SEO",
    description: "Improve your site's ranking and visibility on Google and other search engines.",
    features: ["On-page SEO", "Technical SEO", "Link Building", "Content Strategy"],
  },

  {
    id: 15,
    image: "/assits/services/laravel.png",
    title: "Laravel",
    description: "Robust backend systems and dynamic web apps using Laravel PHP framework.",
    features: ["Blade Templates", "REST APIs", "Admin Dashboards", "MySQL Integration"],
  },
  // {
  //   id: 16,
  //   image: "/assits/services/logoDisgin.png",
  //   title: "Logo Design",
  //   description: "Unique and memorable logos that reflect your brand identity.",
  //   features: ["Vector Logos", "Multiple Concepts", "Brand Guidelines", "Source Files"],
  // },
];
 

// Services component rendering the data
function Services() {
  return (
    <div className=" xl:py-[100px] lg:py-40 py-12 md:py-22">
      <div className="pb-8">
        <h2 className="text-5xl font-extrabold font-primary text-primary text-center">Our Services</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[20px] max-w-[1420px]   lg:px-[20px] md:px-[20px] xl-[20px] mx-auto px-[20px]">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#191919] text-white rounded-xl shadow-[0_40px_30px_rgba(0,0,0,0.1)] 
border border-border-color  hover:border-primary hover:shadow-xl 
transition-all duration-300 overflow-hidden"
          >
            {/* Image Section */}
            <div className="pt-[20px] px-6">
              <img
                src={service.image}
                alt="Project"
                className="w-full h-50 object-cover rounded-[5px]"
              />
            </div>

            {/* Card Body */}
            <div className="p-6 pb-[20px]">
              <h2 className="text-2xl font-bold text-blue-400">
                {service.title}
              </h2>
              <p className="text-gray-300 text-sm mt-2">
                {service.description}
              </p>

              {/* Feature List */}
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-blue-600 text-lg"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
    {/* /          <div className="mt-6">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition border-[#008DBD] border-b-4 border-r-4">
                  Read More
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
