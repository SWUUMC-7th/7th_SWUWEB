import axios from "axios";

const axiosInstance =axios.create({
    headers:{
        Authorization : `Bearer ${import.meta.env.VITE_API_KEY}`
    },
    baseURL: import.meta.env.VITE_TMDB_URL,
})

export {axiosInstance}