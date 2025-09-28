import React, { useState, useEffect } from "react";
import { getfooditems } from "../api/productapi.js";

const Foodpage = () => {
  const [fooditem, setfooditem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchfooditem = async () => {
      try {
        const result = await getfooditems();
        setfooditem(result.data);
      } catch (error) {
        console.log("Error while fetching the product data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchfooditem();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-xl font-semibold text-white">Loading Food Items...</p>
      </div>
    );

  return (
   <div className="p-6 md:p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
  <h1 className="text-4xl md:text-6xl text-orange-400 font-semibold mt-6 mb-12 text-center drop-shadow-lg">
    Our Delicious Food Items
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
    {fooditem.map((food) => (
      <div
        key={food._id}
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300"
      >
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-52 object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{food.name}</h2>
            <p className="text-gray-300 mt-1 line-clamp-3 text-sm md:text-base">
              {food.description}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-green-400 font-semibold text-lg md:text-xl">
              ₹{food.price} / {food.unit || "plate"}
            </p>
            <button className="w-full cursor-pointer px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-900 transition shadow-md">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Foodpage;
