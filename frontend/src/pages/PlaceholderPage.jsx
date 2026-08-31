import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 text-lg opacity-90">{description}</p>
        </div>

        <div className="p-8 text-center">
          <div className="mb-10">
            <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Home className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon!</h2>
          <p className="text-gray-600 mb-8 text-md">
            This page is currently under development. Please check back later for updates.
          </p>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
