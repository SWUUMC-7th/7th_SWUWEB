import { useSelector,useDispatch  } from 'react-redux'
import {add, remove, complete} from '../redux/todoSlice'
import '../App.css';
import Button from './Button';
import Input from './Input';
import { useState } from 'react';
function TodoList() {
    const todoList = useSelector(state => state.todo);
    const dispatch=useDispatch();
    const [text,setText]=useState('');
    return (
        <div id="containerAll">
        <h1>Todo List</h1>
        <div id="inputContainer">
            <Input
            type="text"
            id="main_input"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="내용을 입력해주세요"
            />
            <Button onClick={()=>{
                dispatch(add(text))
                setText('');
            }}id="input_button">
            할 일 등록
            </Button>
        </div>
        <div id="list">
            {todoList && todoList.map((todo) => (
            <div key={todo.id}>
                <div className="listContainer" >
                    <input
                    type="checkbox"
                    checked={todo.complete}
                    onClick={(e) => e.stopPropagation()}
                    onChange={()=>dispatch(complete(todo.id))}
                    />
                    <div>
                    <div className={`todo${todo.complete?'done':''}`}>{todo.text}</div>
                    </div>
                    <div>
                    <Button
                        onClick={(e) => {
                        e.stopPropagation();
                        dispatch(remove(todo.id));
                        }}
                        className="button"
                    >
                        삭제하기
                    </Button>
                    </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    }

export default TodoList;