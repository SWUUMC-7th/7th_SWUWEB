import axiosInstance from "..";

export const patchTodo = async (id, title, content, checked) => {
  try {
    const response = await axiosInstance.patch(`/todo/${id}`, {
      title,
      content,
      checked,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
