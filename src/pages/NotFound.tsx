// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 px-6">
      <h1 className="text-9xl font-extrabold mb-4">404</h1>
      <p className="text-2xl md:text-3xl mb-6">Oops! Page Not Found</p>
      <p className="text-center mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
