import axiosInstance from "./axiosinstance";

export const getcategories = async()=>{
    const res = await axiosInstance.get("/getcategory")
    return res.data;
}