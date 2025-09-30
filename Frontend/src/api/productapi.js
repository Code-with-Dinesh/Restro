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

export const addfooditem = async(userdata)=>{
    const res = await axiosInstance.post("/additem",userdata)
    return res.data;
}

export const deletefood = async(id)=>{
    const res = await axiosInstance.delete(`/fooditem/${id}`)
    return res.data;
}

export const updatefooditem = async(id,userdata)=>{
    const res = await axiosInstance.put(`/updteitem/${id}`,userdata)
    return res.data;
}

export const orderapi =  async()=>{
    const res = await  axiosInstance.get('/allorders')
    return res.data;
}

export const updateorderApi = async(id,newStatus)=>{
    console.log('skdjfskfj',id,newStatus)
    const res = await axiosInstance.put(`/updateorder/${id}`,{status:newStatus})
    return res.data;
}