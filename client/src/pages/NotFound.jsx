import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router for navigation

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <h2 className="text-4xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
      
      {/* Home Button */}
      <Link to="/">
        <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
