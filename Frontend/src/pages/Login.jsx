import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosinstance.js";
import useAuthStore from "../store/authstore";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate()
  const {setUser} = useAuthStore()
   const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm()

   const onsubmit = async(userdata)=>{
     try {
      const res = await axiosInstance.post('/login',userdata,{
      withCredentials:true,
     })
     if (res.data) {
      setUser(res.data); 
      console.log("Updated role:", res.data.role);
      toast.success("successfull Login")
      navigate("/");
    }
     } catch (error) {
        toast.error(error.message)
     }
     
   }
  return (
    <div className="min-h-screen   flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Left Section with Chef Hat SVG */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        >
          {/* Chef Hat SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-64 h-64 mx-auto text-orange-400 drop-shadow-lg"
            viewBox="0 0 64 64"
            fill="currentColor"
          >
            <path d="M32 10c-6.627 0-12 4.477-12 10a8 8 0 00-8 8c0 3.314 2.686 6 6 6h28c3.314 0 6-2.686 6-6a8 8 0 00-8-8c0-5.523-5.373-10-12-10z" />
            <rect x="20" y="34" width="24" height="18" rx="2" ry="2" />
            <path d="M24 52h16v2a2 2 0 01-2 2H26a2 2 0 01-2-2v-2z" />
          </svg>

          <h1 className="text-3xl font-bold text-center mt-6 text-orange-400">
            Welcome Back
          </h1>
          <p className="text-center text-gray-400 mt-2">
            Login to continue your delicious journey 🍕
          </p>
        </motion.div>
      </div>

      {/* Right Section with Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-orange-400">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(onsubmit)} className="mt-6 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email",{required:"Email is required"})}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              {errors.email && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                {...register("password",{required:"password is required"})}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
                  {errors.email && <p className="text-red-500">{errors.name.message}</p>}

            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-orange-400 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition shadow-md font-semibold"
            >
              {isSubmitting ? "Login..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-orange-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
