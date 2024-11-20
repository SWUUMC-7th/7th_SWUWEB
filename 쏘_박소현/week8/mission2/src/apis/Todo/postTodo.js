import axiosInstance from "..";

export const postTodo = async (data) => {
  try {
    const response = await axiosInstance.post("/todo", {
      title: data.title,
      content: data.content,
      checked: data.checked,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting todo:", error);
    throw error;
  }
};
