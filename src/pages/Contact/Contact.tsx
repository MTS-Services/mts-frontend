import { Link } from "react-router";

function Contact() {
  return (
    
<div className="min-h-screen flex items-center justify-center px-4 border-2 border-[] bg-[#1983E7]">
      <div className="bg-white p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20 rounded-3xl shadow-2xl w-full max-w-2xl text-center border border-gray-200">
        <div className="mb-6">
          <div className="text-[88px] font-extrabold text-red-500 leading-none">404</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
            Page Not Found
          </h2>
        </div>

        <p className="text-gray-600 text-base sm:text-lg mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
  to="/"
  className="inline-block bg-primary text-white text-base sm:text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#1983E7] hover:scale-105 transform transition duration-300 ease-in-out"
>
  ⬅️ Back to Home
</Link>
      </div>
    </div>
    
  );
}

export default Contact;


