import { Link } from "react-router";

function ErrorPage() {
  return (
    <div className="bg-background mx-auto flex min-h-screen items-center justify-center bg-center px-4">
      <div className="text-center">
        {/* Image Section */}
        <div className="mb-6">
          <div className="text-[88px] leading-none font-extrabold text-red-500">
            404
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800 sm:text-3xl">
            Page Not Found
          </h2>
        </div>

        <p className="mb-6 text-base text-gray-600 sm:text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-primary inline-block transform rounded-full px-8 py-3 text-base font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-[#1983E7] sm:text-lg"
        >
          ⬅️ Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
