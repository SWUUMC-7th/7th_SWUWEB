import { axiosInstance } from "../../apis/axios-instance";

interface getMoviesProps{
    category:string, 
    pageParam?:number, 
    isDetail?:boolean
}

const useGetMovies = async ({category, pageParam, isDetail}:getMoviesProps) => {
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
    return data;
};

export { useGetMovies };