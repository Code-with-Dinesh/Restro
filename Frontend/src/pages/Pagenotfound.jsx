import React from "react";
import { Link } from "react-router-dom";

export default function Pagenotfound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100 px-4 text-center">
      {/* Big 404 */}
      <h1 className="text-[120px] md:text-[150px] font-bold text-orange-500 drop-shadow-lg">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.  
        Maybe you’re hungry? 🍔🍕
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-2xl shadow-md hover:bg-orange-600 transition-all"
      >
        Back to Home
      </Link>

      {/* Food Illustration / Emoji */}
      <div className="mt-10 text-5xl">🍔 🍕 🍜 🥗 🍩</div>
    </div>
  );
}
