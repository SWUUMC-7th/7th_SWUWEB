import { useContext } from 'react'
import './App.css'
import Button from './components/Button'
import Input from './Input'
import { TodoContext } from './context/TodoContext'

function App() {
  const {todoList,
    text,
    newText,
    setText,
    setNewText,
    addTodo,
    deleteTodo,
    updateTodo,
    editingId,
    setEditingId,
    handleSubmit} = useContext(TodoContext);

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

