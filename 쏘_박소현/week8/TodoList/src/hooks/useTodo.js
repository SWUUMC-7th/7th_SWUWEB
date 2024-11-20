import { useState } from "react";
import { postTodo } from "../apis/Todo/postTodo";

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addTodo = async (data) => {
    setLoading(true);
    try {
      const newTodo = await postTodo(data);
      setTodos((prev) => [...prev, newTodo]);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to add todo.");
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    title,
    setTitle,
    content,
    setContent,
  };
};

export default useTodo;
