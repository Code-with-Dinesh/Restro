import React from "react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-orange-400 mb-6">Welcome to RestoHub</h1>
      <p className="text-gray-300 mb-8">
        Discover the best restaurants and order your favorite food online.
      </p>

      {/* Example Sections */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-orange-400 mb-2">Top Dishes</h2>
          <p className="text-gray-400">Explore our top-rated dishes from local restaurants.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-orange-400 mb-2">Popular Restaurants</h2>
          <p className="text-gray-400">Find the most loved restaurants near you.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-orange-400 mb-2">Exclusive Offers</h2>
          <p className="text-gray-400">Grab exclusive discounts and special deals.</p>
        </div>
      </section>
    </div>
  );
}
