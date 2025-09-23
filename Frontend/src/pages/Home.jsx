import React from "react";
import { Link } from "react-router-dom";
import Cuisines from "../components/Cuisines";
export default function Home() {
  return (
    <>
    
   
    <div className="relative max-w-full h-[70vh] flex items-center justify-start overflow-hidden bg-amber-400">
      {/* Unsplash Dish Image */}
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80"
        alt="Dish"
        className="absolute top-0 right-0 h-full w-full object-cover object-right opacity-70 md:opacity-90 transition-transform duration-1000 ease-in-out transform hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/80 via-amber-400/60 to-transparent"></div>

      {/* Text Content */}
      <div className="relative z-10 max-w-2xl px-6 md:px-12 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-4 tracking-tight">
          RestoHub
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-6 leading-relaxed">
          Discover the finest dishes from top restaurants. Order your favorite meals quickly and enjoy culinary delights at your doorstep.
        </p>
       <Link to="/menu"> <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 transform hover:scale-105 text-white font-semibold px-6 py-3 rounded-full shadow-xl transition duration-300">
          Order Now
        </button></Link>
      </div>
    </div>
     <Cuisines/>
     </>
  );
}
