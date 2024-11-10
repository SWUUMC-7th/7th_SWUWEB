import { useInfiniteQuery } from "@tanstack/react-query";
import { useGetMovies } from "./useGetMovies";

function useGetInfiniteMovies(category){
    return useInfiniteQuery({
        queryFn:({pageParam})=>useGetMovies({category,pageParam}),
        queryKey:['movies',category],
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages)=>{
            // const lastMovies = lastPage.results[lastPage.results.length-1];
            const lastMovies = lastPage.results.at(-1);
            
            return lastMovies ? allPages?.length + 1 : undefined;
        }
    })
}
export {useGetInfiniteMovies}