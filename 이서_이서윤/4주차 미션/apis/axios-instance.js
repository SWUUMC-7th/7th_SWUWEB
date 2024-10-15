import axios from "axios";

const axiosInstance =axios.create({
    baseURL: import.meta.env.VITE_TMDB_URL,
})

export {axiosInstance}