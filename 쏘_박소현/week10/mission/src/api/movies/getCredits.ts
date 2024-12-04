import { axiosInstance } from "..";

export const getCredits = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(
      `movie/${movieId}/credits?language=ko-KR`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
