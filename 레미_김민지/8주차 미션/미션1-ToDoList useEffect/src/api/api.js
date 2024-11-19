import axios from "axios";

// 로컬 환경이라서 바로 작성
const API_BASE_URL = "http://localhost:3000";

// POST 투두 추가
export const addToDo = async (toDo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/todo`, toDo);
    console.log("API Response:", response.data); // Log the entire response object
    return response.data; // Ensure this is the actual data from the API
  } catch (error) {
    console.error("Error adding to-do:", error);
    throw error;
  }
};

// GET 투두 호출
export const fetchToDos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todo`);
    if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
      return response.data[0]; // 실제 데이터만 반환
    }
    throw new Error("Unexpected API response format");
  } catch (error) {
    console.error("Error fetching to-dos:", error);
    throw error;
  }
};

// Delete a to-do
export const deleteToDo = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/todo/${id}`);
  } catch (error) {
    console.error("Error deleting to-do:", error);
    throw error;
  }
};

// Update a to-do
export const updateToDo = async (id, updatedToDo) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/todo/${id}`, updatedToDo);
    console.log("API Response (Update):", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error updating to-do:", error);
    throw error;
  }
};
