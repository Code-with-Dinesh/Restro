import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import axiosInstance from "../api/axiosinstance.js";
import useAuthStore from "../store/authstore";
import toast from 'react-hot-toast';
export default function Signup() {
  const navigate = useNavigate()
  const {setUser} = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async(userdata) => {
   const result = await axiosInstance.post("/register",userdata,{
      withCredentials:true,
    })
    console.log(result)
     setUser(result.data.user)
     toast.success("Successfully Signup")
     navigate("/login")
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-y-hidden">
      {/* Left Section with SVG */}
      <div className="md:w-1/2 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-52 h-52 mx-auto text-orange-400 drop-shadow-lg"
            viewBox="0 0 64 64"
            fill="currentColor"
          >
            <circle cx="32" cy="32" r="20" className="text-gray-700" />
            <path
              d="M20 12v20m-4-20v20m8-20v20M48 12v40"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M44 32a4 4 0 118 0 4 4 0 01-8 0z" fill="currentColor" />
          </svg>

          <h1 className="text-3xl font-bold mt-6 text-orange-400">
            Welcome to RestoHub
          </h1>
          <p className="text-gray-400 mt-2">
            Fresh flavors, delivered to your door 🍽️
          </p>
        </motion.div>
      </div>

      {/* Right Section with Form */}
      <div className="md:w-1/2 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg mx-4"
        >
          <h2 className="text-2xl font-semibold text-center text-orange-400">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition shadow-md font-semibold"
            >
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-400 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
