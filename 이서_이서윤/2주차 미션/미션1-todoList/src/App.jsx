import { useState } from 'react'
import './App.css'
import Button from './Button'
import Input from './Input'

function App() {
  const [todoList,setTodoList]=useState([])
  const [id,setId]=useState(1)
  const [text,setText]=useState('')
  const [newText,setNewText]=useState(text)
  const [editingId,setEditingId]=useState('')

  console.log('todoList:',todoList)
  console.log('edititngId:',editingId)

  //렌더링 방지
  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  //1. 추가
  const addTodo=()=>{
    // setTodoList((prev)=>[
    //   ...prev,{id:Math.floor(Math.random()*100)+1,task:text}
    // ])
    setTodoList((prev)=>[
        ...prev, {id:id,task:text}
    ])
    setId((prev)=>prev+1);
  }
  //2. 삭제
  const deleteTodo=(todoId)=>{
    setTodoList(todoList.filter((todo)=>todo.id!=todoId))
    setEditingId(editingId.filter((todo)=>todo.id!=todoId))
  }
  //3. 수정
  const updateTodo=(todoId, newText)=>{
    setTodoList((prev)=>prev.map((item)=>(item.id===todoId ? {...item, task:newText}:item)))
    setEditingId('')
  }
  return (
    <>
     <h1>🍒Todo List🍒</h1>
     <div onSubmit={handleSubmit} id="inputContainer">
        <Input type="text" value={text} onChange={(e)=>{setText(e.target.value)}} id="main_input"></Input>
        <Button onClick={()=>addTodo()} id='input_button'>할 일 등록</Button>
     </div>
     <div id='list'>
        {todoList.map((todo)=>(
          <div key={todo.id}>
            {/*수정 중 아닐 때*/}
            {editingId!==todo.id  &&
              <div className='listContainer'>
                <div className="todo">{todo.id}. </div> 
                <div className="todo">{todo.task}</div> 
                <div>
                  <Button onClick={()=>setEditingId(todo.id)} className='button'>수정하기</Button>
                  <Button onClick={()=>deleteTodo(todo.id)} className='button'>삭제하기</Button>
                </div>
              </div>
            }
            {/*수정 중일 때*/}
            {editingId===todo.id && 
                <div className='listContainer'>
                  <div className="todo">{todo.id}. </div> 
                  <Input type="text" value={newText} onChange={(e)=>{setNewText(e.target.value)}}></Input>
                  <div>
                    <Button onClick={()=>updateTodo(todo.id,newText)} className='button'>수정완료</Button>
                    <Button onClick={()=>deleteTodo(todo.id)} className='button'>삭제하기</Button>
                  </div>
                </div>
            }
          </div>
        ))}
     </div>
    </> 
  )
}

export default App

