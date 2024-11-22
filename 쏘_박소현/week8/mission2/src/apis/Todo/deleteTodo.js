import axiosInstance from "..";

export const deleteTodo = async (todoId) => {
  try {
    const response = await axiosInstance.delete(`/todo/${todoId}`);
    return response.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};
