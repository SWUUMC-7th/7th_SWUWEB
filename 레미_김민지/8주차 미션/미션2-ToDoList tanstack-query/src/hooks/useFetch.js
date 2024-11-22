import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// API 요청 함수들
const fetchToDos = async () => {
  const response = await axios.get(`${API_BASE_URL}/todo`);
  if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
    return response.data[0];
  }
  throw new Error("Unexpected API response format");
};

const fetchToDoById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/todo/${id}`);
  return response.data;
};

const createToDo = async (newToDo) => {
  const response = await axios.post(`${API_BASE_URL}/todo`, newToDo);
  return response.data;
};

const updateToDo = async ({ id, updatedToDo }) => {
  const response = await axios.patch(`${API_BASE_URL}/todo/${id}`, updatedToDo);
  return response.data;
};

const deleteToDo = async (id) => {
  await axios.delete(`${API_BASE_URL}/todo/${id}`);
};

// Custom Hook
export const useFetch = () => {
  const queryClient = useQueryClient();

  // Fetch all ToDos
  const toDosQuery = useQuery({
    queryKey: ["todos"], // queryKey는 객체 내에 설정
    queryFn: fetchToDos, // queryFn은 함수
  });

  // Fetch a single ToDo by ID
  const toDoQueryById = (id) =>
    useQuery({
      queryKey: ["todo", id], // queryKey는 ID와 함께 고유하게 설정
      queryFn: () => fetchToDoById(id),
      enabled: !!id, // ID가 있을 때만 실행
    });

  // Add ToDo Mutation
  const addToDoMutation = useMutation({
    mutationFn: createToDo, // mutationFn 설정
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // ToDos 새로고침
    },
  });

  // Update ToDo Mutation
  const updateToDoMutation = useMutation({
    mutationFn: updateToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete ToDo Mutation
  const deleteToDoMutation = useMutation({
    mutationFn: deleteToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    toDosQuery,
    toDoQueryById,
    addToDoMutation,
    updateToDoMutation,
    deleteToDoMutation,
  };
};
