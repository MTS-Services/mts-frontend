import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Smooth fade effect
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "./herosection.css"; // Custom CSS for additional styles

const products = [

  {
    id: 1,
    image: "/assits/hero/b1.JPG",
    title: "High Quality IT Solutions for Startup",
    price: "welcome to",
    discountPrice: "welcome to",
  },

   {
    id: 2,
    image: "/assits/hero/b9.JPG",
    title: "High Quality IT Solutions for Startup",
    price: "welcome to",
    discountPrice: "welcome to",
  },
  {
    id: 3,
    image: "/assits/hero/b3.JPG",
    title: "High Quality IT Solutions for Startup",
    price: "welcome to ",
    discountPrice: "welcome to",
  },

 
  {
    id: 4,
    image: "/assits/hero/b6.JPG",
    title: "High Quality IT Solutions for Startup",
    price: "welcome to",
    discountPrice: "welcome to",
  },
];

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center max-w-[1440px] mx-auto px-[20pxs]">
      <div className="w-full px-2.5">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]} // Added EffectFade
          effect="fade" // Enables fade transition
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="font-size: 10px; width: 10px; height: 10px;"></span>`;
            },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1200} // Smooth transition speed
          loop={true} // Infinite loop
          className="rounded-lg shadow-lg"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-md">
                <div
                  className="h-[250px] w-full bg-cover bg-center transition-all duration-1000 ease-in-out sm:h-[400px] md:h-[500px] lg:h-[600px]"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "cover", // Ensure the image covers the container
                    backgroundPosition: "center", // Center the image
                  }}
                ></div>

                {/* Add your overlay content */}
                <div className="animate-fadeUp absolute top-1/2 left-12 w-[90%] -translate-y-1/2 transform sm:px-6 md:w-1/2 md:px-8 md:pr-6 lg:left-34 lg:px-16">
                  {/* Add overlay content here if needed */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSection;
