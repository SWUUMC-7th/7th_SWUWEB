import { useState } from "react";
import { fetchToDos, addToDo, deleteToDo, updateToDo } from "../api/api";

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch to-dos
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

  const editToDo = async (id, updatedToDo) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await updateToDo(id, updatedToDo); // API call
      console.log("Updated To-Do (API Response):", updated); // Debugging
      setData((prevData) =>
        prevData.map(
          (toDo) => (toDo.id === id ? { ...toDo, ...updated } : toDo), // Update the specific to-do in state
        ),
      );
    } catch (err) {
      setError(err);
      console.error("Error updating to-do:", err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getToDos, createToDo, removeToDo, editToDo };
};
