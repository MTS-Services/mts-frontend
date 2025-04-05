import React from "react";

const TestingPage = () => {
  return (
    <div>
      <title>errorpage</title>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-6xl font-bold text-red-500 mb-6">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops! The page you're looking for doesn't exist.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We couldn't find the page you were looking for. It might have been
            moved or deleted.
          </p>
          <a
            href="/"
            className="bg-[#19B2E7] text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#1598c6] transition duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestingPage;
