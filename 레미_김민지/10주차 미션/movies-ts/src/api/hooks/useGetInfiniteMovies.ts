import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../movieApi";

export const useGetInfiniteMovies = (category: string) => {
  return useInfiniteQuery({
    queryKey: ["movies", category],
    queryFn: ({ pageParam = 1 }) => getMovies({ category, pageParam }),
    initialPageParam: 1, // 초기 페이지
    getNextPageParam: (lastPage) => {
      // 다음 페이지로 이동 조건
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};
