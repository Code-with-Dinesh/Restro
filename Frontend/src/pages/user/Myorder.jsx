import React, { useEffect, useState } from "react";

const MyOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        setCartItems([
          {
            _id: "1",
            name: "Margherita Pizza",
            image: "https://via.placeholder.com/150",
            option: "Full",
            price: 250,
            quantity: 2,
          },
          {
            _id: "2",
            name: "Veg Burger",
            image: "https://via.placeholder.com/150",
            option: "Single",
            price: 150,
            quantity: 1,
          },
          {
            _id: "3",
            name: "Chocolate Cake",
            image: "https://via.placeholder.com/150",
            option: "Half",
            price: 200,
            quantity: 3,
          },
        ]);
      } catch (error) {
        console.log("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeItem = (id) => setCartItems((prev) => prev.filter((item) => item._id !== id));
  const clearCart = () => setCartItems([]);
  const handleCheckout = () => alert("Proceeding to payment...");
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <p className="text-white text-center mt-12">Loading Cart...</p>;

  return (
    <div className="bg-gray-900 min-h-screen p-6 md:p-12 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-orange-400 text-center md:text-left">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg md:text-xl text-gray-300 mt-10">Your cart is empty!</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center md:items-start justify-between p-4 bg-gray-800 rounded-xl shadow-lg gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
                />
                <div className="flex-1 md:ml-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">{item.name}</h2>
                  <p className="text-gray-300 mt-1">Option: {item.option}</p>
                  <p className="text-green-400 font-bold text-xl md:text-2xl mt-2">₹{item.price}</p>
                  <p className="text-gray-300 mt-1">Quantity: {item.quantity}</p>
                </div>
                <button
                  className="mt-4 md:mt-0 px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-gray-800 rounded-xl shadow-lg gap-4">
            <p className="text-2xl md:text-3xl font-bold text-white">Total: ₹{totalPrice}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrder;
