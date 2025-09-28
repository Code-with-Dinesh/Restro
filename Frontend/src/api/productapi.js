import axiosInstance from "./axiosinstance";

export const getcategories = async()=>{
    const res = await axiosInstance.get("/getcategory")
    return res.data;
}

export const getfooditems = async()=>{
    const res = await axiosInstance.get("/getfooditems")
    return res.data;
}

export const singleprodctapi = async(id)=>{
   const res =  await axiosInstance.get(`/singlefood/${id}`)
   return res.data;
}