import axiosInstance from "..";

export const getTodo = async () => {
  try {
    const response = await axiosInstance.get(`/todo`);
    return response.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};
