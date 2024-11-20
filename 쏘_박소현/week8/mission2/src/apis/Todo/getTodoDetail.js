import axiosInstance from "..";

export const getTodoDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/todo/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};
