import { axiosInstance } from "../../apis/axios-instance";

const useGetMovies = async ({ category, pageParam, isDetail }) => {
    let data; 
    if (isDetail) {
        const response = await axiosInstance.get(`/movie/${category}?language=ko-KR`, {
        });
        data = response.data; 
    } else {
        const response = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`, {
        });
        data = response.data; 
    }
    console.log('data fetch:',category)
    return data; // 최종적으로 데이터를 반환
};

export { useGetMovies };
