
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getcategories } from "../api/productapi.js";
import useCategorystore from "../store/categorystore.js";
export default function Cuisines() {
 
  
  const {setCategories,categories} = useCategorystore()
  console.log(setCategories,categories)
  const fetchcategores = async()=>{
    const result = await getcategories()
    setCategories(result.data)
  }
  useEffect(()=>{
    try {
      fetchcategores()
    } catch (error) {
       console.log('error while fetching categories',error)
    }
  },[])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-8 text-center md:text-left">
        Inspiration for Your First Order
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
        {categories.map((cuisine, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-44 h-44 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg hover:scale-105 transition transform">
              <img
                src={cuisine.coverimage}
                alt={cuisine.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-gray-300 cursor-pointer font-medium">{cuisine.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
