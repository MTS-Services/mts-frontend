import React from 'react';
import { Link } from 'react-router';

function CtaSection() {
  return (
    <div className="relative w-full  bg-cover bg-center"
      style={{
        backgroundImage: 'url(/assits/hero/b1.JPG)', // ব্যাকগ্রাউন্ড ইমেজ
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Full-page overlay */}
      <div className="absolute inset-0 bg-black opacity-74"></div>

    <div className="relative  z-10 flex flex-col items-center justify-center h-full text-white py-12 md:py-24 lg:py-30 xl:py-30 w-full sm:px-[20px]  md:px-[20px] lg:px-[20px]">
   <div className="bg-secondary bg-opacity-90 py-12 rounded-xl shadow-2xl text-center mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-20">
          
  {/* Main Heading */}
  <h3 className="text-4xl font-extrabold mb-6 font-primary">
    High Quality IT Solutions for Startups
  </h3>

  {/* Description */}
  <p className="text-lg lg:px-40 font-secondary">
    We specialize in Web Development, Digital Marketing, App Development, and UI/UX. Our expert team delivers tailored solutions to help businesses thrive in today’s competitive market.
  </p>

  {/* CTA Buttons */}
  <div className="flex flex-wrap justify-center space-x-4 mt-4">
    <Link
      to="/contact"
      className="bg-transparent border border-white text-white hover:text-cta-txt-active
               font-semibold px-8 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 hover:bg-white font-primary"
    >
      Contact Now
    </Link>
  </div>
</div>

      </div>
    </div>
  );
}

export default CtaSection;
