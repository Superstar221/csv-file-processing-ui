import React from 'react';
import { BeakerIcon } from '@heroicons/react/24/solid';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BeakerIcon className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Data Type Inference
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;