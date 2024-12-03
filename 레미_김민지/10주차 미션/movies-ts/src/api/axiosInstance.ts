import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_MOVIES_API_URL,
});

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export { axiosInstance, api };
