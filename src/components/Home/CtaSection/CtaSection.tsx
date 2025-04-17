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
      className="flex items-center relative py-2 px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
    >
      Contact Now
      {/* Contact Now */}
    </Link>
  </div>
</div>

      </div>
    </div>
  );
}

export default CtaSection;