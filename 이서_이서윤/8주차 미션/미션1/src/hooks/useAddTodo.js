import { useState } from 'react';
import axios from 'axios';

const useAddTodo = (title, content) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = async () => {
    if (title && content) {
      const addTodo = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.post('http://localhost:3000/todo', {
            "title":title,
            "content":content,
          });
          setLoading(false);
          console.log('Todo 추가 성공:', response.data);
        } catch (err) {
          setLoading(false);
          setError('Todo 추가 실패');
          console.error('Todo 추가 실패:', err);
        }
      };

      addTodo();  
    }
  } 

  return {addTodo, loading, error };
};

export default useAddTodo;