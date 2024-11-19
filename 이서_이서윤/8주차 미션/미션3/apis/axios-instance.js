import axios from "axios";

const axiosInstance =axios.create({
    baseURL: import.meta.env.VITE_TMDB_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
})

export {axiosInstance}