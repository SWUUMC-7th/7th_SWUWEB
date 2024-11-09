import { axiosInstance } from "../../apis/axios-instance";

const useGetMovies = async ({ category, pageParam, isDetail }) => {
    let data; 
    if (isDetail) {
        const response = await axiosInstance.get(`/movie/${category}?language=ko-KR`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        });
        data = response.data; 
    } else {
        const response = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        });
        data = response.data; 
    }

    return data; // 최종적으로 데이터를 반환
};

export { useGetMovies };
