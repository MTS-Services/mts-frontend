import { Link } from "react-router";

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center mx-auto px-4 bg-center bg-background">
      <div className="text-center">
        {/* Image Section */}
        <div className="mb-6">
          <img
            className="w-[900px] mx-auto" // Ensures the image is centered with specific width
            src="/assits/404bg/404size.png" // Ensure the correct path for the image
            alt="404 Error Image"
          />
        </div>

        {/* Back to Home Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-cta text-cta-text text-base sm:text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-cta-active hover:text-cta-txt-active hover:scale-105 transform transition duration-300 ease-in-out"
          >
            ⬅️ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
