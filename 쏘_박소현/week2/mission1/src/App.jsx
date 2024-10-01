import { useState } from "react";


function App() {

  const [todos, setTodos]= useState([{id: 1, task:'투두 만들기'}]);

  const [text, setText] =useState('');

  const [editingId, setEditingId] =useState('');

  const [editText, setEditText]= useState('');

  //랜더링 방지 => form 태그 안에서 버튼을 누르면 리랜더링 되는데 그것을 방지하기 위한 것
  const handleSubmit =(e)=>{
    e.preventDefault();
  }

  //추가하기
  const addTodo= ()=>{
    setTodos((prev)=> [
      ...prev, 
      {id:Math.floor(Math.random()*100 +2), task: text}
    ]);
    setText('');

  };

  //삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  //수정진행
  const updateTodo = (id, text)=> {
    setTodos((prev) => 
      prev.map((item)=> (item.id === id ? {...item, task:text}: item))
    )
    setEditingId('');
  }
  

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type='text' value={text} onChange={(e)=> setText(e.target.value)}/>
      <button onClick={()=> addTodo()} type="submit">할 일 등록</button>
    </form>
    <div>
      {todos.map((todo, _)=> (
        <>
        <div style={{display:'flex' ,gap:'20px'}}>
          <div key={todo.id} style={{display:'flex' ,gap:'5px'}}>
            {editingId === todo.id ? (
          // 수정 중일 때
          <>
            <p>{todo.id}</p>
            <input defaultValue={todo.task} onChange={(e)=> setEditText(e.target.value)}/>
          </>
           ) : (
          // 수정 중이 아닐 때
          <>
            <p>{todo.id}</p>
            <p>{todo.task}</p>
          </>
          )}
            </div>
          <button onClick={()=> deleteTodo(todo.id)}>삭제하기</button>
          {editingId===todo.id? (
            <button onClick={()=> updateTodo(editingId,editText)} >수정 완료</button>
          ):(
            <button onClick={()=> setEditingId(todo.id)} >수정 진행</button>
          )}
          
        </div>
        </>
      ))}
    </div>
    </>
  )
}

export default App
