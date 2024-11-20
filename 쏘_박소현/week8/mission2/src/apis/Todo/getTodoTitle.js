import axiosInstance from "..";

export const getTodoTitle = async (title) => {
  try {
    const response = await axiosInstance.get(`/todo?title=${title}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};
