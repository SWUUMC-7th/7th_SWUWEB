import { useState, useEffect } from "react";
import { postTodo } from "../apis/Todo/postTodo";
import { getTodo } from "../apis/Todo/getTodo";
import { getTodoTitle } from "../apis/Todo/getTodoTitle";

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

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

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const [fetchedTodos] = await getTodo();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  const searchTodos = async (searchQuery) => {
    setLoading(true);
    try {
      const [fetchedTodos] = await getTodoTitle(searchQuery);
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to search todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    addTodo,
    title,
    setTitle,
    content,
    setContent,
    fetchTodos,
    searchTodos,
    search,
    setSearch,
  };
};

export default useTodo;
