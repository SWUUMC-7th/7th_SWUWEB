import { useEffect, useState } from 'react';
import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../components/Loading';
// import Error from '../components/Error';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTodoList } from '../apis/todo';
import { postTodo } from '../apis/todo';
import { queryClient } from '../main';
import { deleteTodo } from '../apis/todo';
import { patchTodo } from '../apis/todo';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingId, setEditingId] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const {data} = useQuery({
    queryFn:()=>getTodoList({title:search}),
    queryKey:["todos",search]
  })

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTodoList(data[0]);
    } else {
      setTodoList([]);
    }
  }, [data]);
  
  const {mutate:postTodoMutation} = useMutation({
    mutationFn:postTodo,
    onSuccess:(data)=>{
      console.log(data);
      queryClient.invalidateQueries({
        queryKey:["todos"]
      })
    },
    onError:(error)=>{
      console.log(error)
    },
  });

  const {mutate:deleteTodoMutation} = useMutation({
    mutationFn:deleteTodo,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["todos"]
      })
    },
    onError:(error)=>{
      console.log('삭제 실패',error)
    },
  });
  
  const {mutate:patchTodoMutation} = useMutation({
    mutationFn:patchTodo,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["todos"]
      })
    },
    onError:(error)=>{
      console.log('수정 실패',error)
    },
  });
  // 렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 1. 추가
  const handleAdd = async() => {
    postTodoMutation({title,content})
    if (title && content) {
      setTitle('');
      setContent('');
    }
  };

  // 2. 삭제
  const handleDelete = async(id) => {
    deleteTodoMutation({id});
  };

  // 3. 수정
  const handleUpdate = async(id , title, content) => {
    patchTodoMutation({id , title, content})
    setEditingId('');
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="main_input"
          placeholder="내용을 입력해주세요"
        />
        <Button onClick={()=>handleAdd()} id="input_button">
          할 일 등록
        </Button>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="main_input"
          placeholder="검색할 일정의 제목을 입력해주세요"
        />
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
                  checked={todo.checked}
                  onClick={(e) => e.stopPropagation()}
                  onChange={()=>patchTodoMutation({id:todo.id, checked:!todo.checked})}
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
                      setNewTitle(todo.title)
                      setNewContent(todo.content)
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
                  onClick={(e) => e.stopPropagation()}
                  onChange={()=>patchTodoMutation({id:todo.id, checked:!todo.checked})}
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
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    id="update_input"
                  />
                </div>
                <div>
                  <Button
                    onClick={() => handleUpdate(todo.id, newTitle, newContent)}
                    className="button"
                  >
                    수정완료
                  </Button>
                  <Button
                    onClick={() => handleDelete(todo.id)}
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