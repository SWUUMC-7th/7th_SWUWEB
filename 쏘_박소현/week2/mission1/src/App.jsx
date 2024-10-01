import { useState } from "react";


function App() {

  const [todos, setTodos]= useState([{id: 1, task:'투두 만들기'}]);

  const [text, setText] =useState('');

  console.log(text)

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
          <h4 key={todo.id}>{todo.id}.{todo.task}</h4>
          <button onClick={()=> deleteTodo(todo.id)}>삭제하기</button>
        </div>
        </>
      ))}
    </div>
    </>
  )
}

export default App
