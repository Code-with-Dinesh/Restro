import React from "react";

// Hardcoded Menu Data
const menuData = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with mozzarella cheese and tomato sauce",
    price: 12,
    category: "Main Course",
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Fresh lettuce, croutons, parmesan, and Caesar dressing",
    price: 8,
    category: "Starters",
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with gooey center",
    price: 6,
    category: "Desserts",
  },
  {
    id: 4,
    name: "Grilled Chicken",
    description: "Juicy grilled chicken with herbs and spices",
    price: 15,
    category: "Main Course",
  },
  {
    id: 5,
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter and herbs",
    price: 5,
    category: "Starters",
  },
  {
    id: 6,
    name: "Mango Smoothie",
    description: "Refreshing mango smoothie with fresh fruit",
    price: 4,
    category: "Drinks",
  },
];

export default function Menu() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <h1 className="text-4xl font-bold text-orange-400 text-center mb-10">
        Our Menu
      </h1>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {menuData.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-orange-400 mb-2">
              {item.name}
            </h2>
            <p className="text-gray-300 mb-4">{item.description}</p>
            <p className="font-bold text-white">${item.price}</p>
            <span className="text-sm text-gray-400 mt-2 block">
              Category: {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
