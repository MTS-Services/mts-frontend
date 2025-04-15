function CtaSection({ children }: { children: React.ReactNode }) {
  console.log(children);
  return (
    <div
      className='relative w-full  bg-cover bg-center'
      style={{
        backgroundImage: 'url(/assits/hero/b5.JPG)',
        backgroundPosition: 'min(0%, 0%)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Full-page overlay */}
      <div className='absolute inset-0 bg-black opacity-74'></div>

      <div className='relative  z-10 flex flex-col items-center justify-center h-full text-white py-12 md:py-24 lg:py-30 xl:py-30 w-full sm:px-[20px]  md:px-[20px] lg:px-[20px]'>
        {/* Content Section */}
        <div>
          {/* Main Heading */}
          <h3 className='text-4xl font-extrabold mb-6 font-primary text-center'>
            {children}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CtaSection;
