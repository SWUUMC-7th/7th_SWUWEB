import { useEffect, useState } from 'react';
import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import useAddTodo from '../hooks/useAddTodo';
import useGetTodo from '../hooks/useGetTodo';
import useDeleteTodo from '../hooks/useDeleteTodo';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [text, setText] = useState('');
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState('');
  const navigate = useNavigate();

  const { addTodo, loading, error } = useAddTodo(title, text);
  const {data, isLoading, isError} = useGetTodo();
  const { deleteTodo } = useDeleteTodo();
  

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTodoList(data[0]);
    } else {
      setTodoList([]);
    }
  }, [data]);
  
  // 렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 1. 추가
  const handleAdd = async() => {
    if (loading) {
      console.log('로딩 중...');
      return;
    }
    if (error) {
      console.error('에러 발생:', error);
      return;
    }
    addTodo();
    if (title && text) {
      setTitle('');
      setText('');
    }
  };

  // 2. 삭제
  const handleDelete = async(id) => {
    const result = await deleteTodo(id);
    if (result) {
      setTodoList(todoList.filter(todo => todo.id !== id)); // 삭제된 todo를 목록에서 제거
    }
  };

  // 3. 수정
  const updateTodo = (todoId, newTitle, newText) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === todoId
          ? { ...item, title: newTitle, task: newText }
          : item
      )
    );
    setEditingId('');
  };

  // 4. 체크박스 상태 토글
  const toggleCheckbox = (todoId) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === todoId
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    );
  };

  return (
    <>
      <h1>🍒Todo List🍒</h1>
      <div onSubmit={handleSubmit} id="inputContainer">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="main_input"
          placeholder="제목을 입력해주세요"
        />
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="main_input"
          placeholder="내용을 입력해주세요"
        />
        <Button onClick={()=>handleAdd()} id="input_button">
          할 일 등록
        </Button>
      </div>
      <div id="list">
        {todoList && todoList.map((todo) => (
          <div key={todo.id}>
            {/* 수정 중 아닐 때 */}
            {editingId !== todo.id && (
              <div className="listContainer" 
              onClick={()=>navigate(`/todo/${todo.id}`)}>
                <input
                  type="checkbox"
                  checked={todo.isChecked}
                  onChange={() => toggleCheckbox(todo.id)}
                />
                <div>
                  <div className="todo">{todo.title}</div>
                  <div className="todo">{todo.content}</div>
                </div>
                <div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(todo.id)
                    }}
                    className="button"
                  >
                    수정하기
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(todo.id)
                    }}
                    className="button"
                  >
                    삭제하기
                  </Button>
                </div>
              </div>
            )}
            {/* 수정 중일 때 */}
            {editingId === todo.id && (
              <div className="listContainer">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => toggleCheckbox(todo.id)}
                />
                <div id="updateInputBox">
                  <Input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    id="update_input"
                  />
                  <Input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    id="update_input"
                  />
                </div>
                <div>
                  <Button
                    onClick={() => updateTodo(todo.id, newTitle, newText)}
                    className="button"
                  >
                    수정완료
                  </Button>
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                    className="button"
                  >
                    삭제하기
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoList;