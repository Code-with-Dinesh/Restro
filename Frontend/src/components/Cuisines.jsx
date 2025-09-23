import React from "react";

export default function Cuisines() {
  // Example cuisines with images
  const cuisineList = [
    { name: "Pizza", img: "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Burger", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80" },
    { name: "Paneer", img: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Thali", img: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cake", img: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-8 text-center md:text-left">
        Inspiration for Your First Order
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
        {cuisineList.map((cuisine, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-44 h-44 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg hover:scale-105 transition transform">
              <img
                src={cuisine.img}
                alt={cuisine.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-gray-300 cursor-pointer font-medium">{cuisine.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
