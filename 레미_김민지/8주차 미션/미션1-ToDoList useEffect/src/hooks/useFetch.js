import { useState } from "react";
import { fetchToDos, addToDo, deleteToDo, updateToDo, getToDo } from "../api/api";

export const useFetch = () => {
  const [data, setData] = useState([]); // 전체 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // Fetch 전체 to-dos
  const getToDos = async () => {
    setLoading(true);
    try {
      const result = await fetchToDos();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch 단일 to-do
  const fetchToDoById = async (id) => {
    setLoading(true);
    try {
      const todo = await getToDo(id); // API 호출
      return todo; // 단일 TODO 반환
    } catch (err) {
      setError(err);
      console.error("Error fetching single to-do:", err);
      throw err; // 호출부에서 에러를 처리할 수 있도록 던짐
    } finally {
      setLoading(false);
    }
  };

  // Add a new to-do
  const createToDo = async (newToDo) => {
    setLoading(true);
    try {
      const addedToDo = await addToDo(newToDo);
      setData((prevData) => [...prevData, addedToDo]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a to-do
  const removeToDo = async (id) => {
    setLoading(true);
    try {
      await deleteToDo(id);
      setData((prevData) => prevData.filter((toDo) => toDo.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit a to-do
  const editToDo = async (id, updatedToDo) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await updateToDo(id, updatedToDo); // API 호출
      console.log("Updated To-Do (API Response):", updated); // 디버깅용
      setData((prevData) =>
        prevData.map((toDo) => (toDo.id === id ? { ...toDo, ...updated } : toDo)),
      );
    } catch (err) {
      setError(err);
      console.error("Error updating to-do:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getToDos,
    fetchToDoById,
    createToDo,
    removeToDo,
    editToDo,
  };
};
