import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">404</h1>
      
      <div className="mt-5 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Oops! Something's missing.</h2>
        <p className="text-gray-500 mt-3">Sorry, we can't find the page you're looking for.</p>
        <Link 
          to="/" 
          className="mt-8 inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
