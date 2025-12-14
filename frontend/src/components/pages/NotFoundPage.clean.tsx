import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col gap-3">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
