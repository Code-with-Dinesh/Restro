import React, { useEffect, useState } from "react";
import { getcartapi,removecartApi } from "../../api/productapi";
import toast from 'react-hot-toast'
const MyOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const result = await getcartapi();
        setCartItems(result.data.cart);
        
      } catch (error) {
        console.log("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);


  const removeItem = async(id)=>{
    try {
       const result = await removecartApi(id)
       console.log(result)
       setCartItems((prev)=>prev.filter((elem)=>elem._id != id))
       toast.success('Item remove successfully')
    } catch (error) {
      console.log('error while remove cart',error)
    }
  }

 
  const handleCheckout = () => alert("Proceeding to payment...");

  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  if (loading) return <p className="text-white text-center mt-12">Loading Cart...</p>;

  return (
    <div className="bg-gray-900 min-h-screen px-4 sm:px-6 md:px-12 py-8 text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-orange-400 text-center md:text-left">
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
                className="flex flex-col md:flex-row items-center md:items-start justify-between p-4 sm:p-6 bg-gray-800 rounded-2xl shadow-lg gap-4 hover:scale-[1.02] transition-transform"
              >
                <img
                  src={item.food.image}
                  alt={item.food.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-xl"
                />

                <div className="flex-1 md:ml-6 text-center md:text-left">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">{item.food.name}</h2>
                  <p className="text-gray-300 mt-1">Option: {item.options}</p>
                  <p className="text-gray-300 mt-1">Quantity: {item.quantity}</p>
                  <p className="text-green-400 font-bold text-xl sm:text-2xl mt-2">₹{item.totalPrice}</p>
                </div>

                <button
                  className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 bg-red-600 text-sm sm:text-base rounded-lg hover:bg-red-700 transition-colors"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-gray-800 rounded-2xl shadow-lg gap-4">
            <p className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
              Total: <span className="text-green-400">₹{totalPrice}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleCheckout}
              >
                Checkout
              </button>
             
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrder;
