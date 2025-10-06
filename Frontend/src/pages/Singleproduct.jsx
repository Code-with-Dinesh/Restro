import { useParams } from "react-router-dom";
import { singleprodctapi,addcartApi } from "../api/productapi.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Singleproduct = () => {
  const { id } = useParams(); 
  const [food, setFood] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("full");
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const result = await singleprodctapi(id); 
        console.log(result.data)
        setFood(result.data); 
      } catch (error) {
        console.log("Error while fetching single product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  const cartHandler = async(foodId,quantity)=>{
    console.log(foodId,quantity)
     const result = await addcartApi(foodId,quantity)
    
      toast.success('Item added to cart')
     
     console.log("add cart api data",result)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p className="text-lg font-semibold">Loading product...</p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p className="text-lg font-semibold">Product not found!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen p-6 md:p-12 text-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-96 object-cover hover:scale-105 transition duration-300"
          />
        </div>

       
        <div>
          <h1 className="text-4xl font-extrabold mb-4">{food.name}</h1>
          <p className="text-gray-300 mb-6">{food.description}</p>

         
          {food.options && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Choose Size</h3>
              <div className="flex gap-4">
                {Object.entries(food.options).map(([option, price]) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedOption === option
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-600"
                    }`}
                  >
                    {option} - ₹{price}
                  </button>
                ))}
              </div>
            </div>
          )}

          
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold">Quantity</h3>
            <div className="flex items-center border border-gray-600 rounded-lg">
              <button
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

         
          <p className="text-2xl font-bold text-green-400 mb-6">
            Total: ₹
            {food.options
              ? food.options[selectedOption] * quantity
              : food.price * quantity}
          </p>

         
          <button onClick={()=>cartHandler(food._id,quantity)} className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition">
            Add to Cart
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default Singleproduct;
