import axios from 'axios'

const API_URL = import.meta.env.API_URL

const axiosInstance = axios.create({
    baseUrl:API_URL,
    withCredentials: true,
})

export default axiosInstance