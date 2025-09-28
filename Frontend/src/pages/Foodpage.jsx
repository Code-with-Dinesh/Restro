import React from 'react'

const Foodpage = () => {
  return (
      <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Food Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[5].map((food) => (
          <div
            key={food._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-xl transition"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{food.name}</h2>
            <p className="text-gray-600">{food.description}</p>
            <p className="text-green-600 font-bold mt-2">
              ₹{food.price} / {food.unit || "plate"}
            </p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Foodpage