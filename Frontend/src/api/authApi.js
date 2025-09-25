import axiosInstance from "./axiosinstance.js";

export const signupApi = async(userdata)=>{
   const res  =  await axiosInstance.post("/register",userdata)
   return res.data;
}

export const loginApi = async(userdata)=>{
    const res = await axiosInstance.post("/login",userdata)
    return res.data;
}