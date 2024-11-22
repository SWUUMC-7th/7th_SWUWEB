import axios from 'axios';

const useDeleteTodo = () => {

  const deleteTodo = async (id) => {

    try {
      const response = await axios.delete(`http://localhost:3000/todo/${id}`);
      if (response.status === 200) {
        console.log('Todo 삭제 성공');
        return true;
      } else {
        console.error('Todo 삭제 실패');
        return false;
      }
    } catch (err) {
      console.error('삭제 중 오류:', err);
      return false;
    } 
  };

  return { deleteTodo};
};

export default useDeleteTodo;