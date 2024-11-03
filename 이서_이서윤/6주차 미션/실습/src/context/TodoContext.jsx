import { createContext, useState } from "react";

export const TodoContext = createContext();

export function TodoContextProvider({ children }) {
    const [todoList, setTodoList] = useState([]);
    const [id, setId] = useState(1);
    const [text, setText] = useState('');
    const [newText, setNewText] = useState('');
    const [editingId, setEditingId] = useState(null);

    console.log('todoList:', todoList);
    console.log('editingId:', editingId);

    //렌더링 방지
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    // 1. 추가
    const addTodo = () => {
        setTodoList((prev) => [
            ...prev, { id: id, task: text }
        ]);
        setId((prev) => prev + 1);
        setText('');  // 입력 필드 초기화
    };

    // 2. 삭제
    const deleteTodo = (todoId) => {
        setTodoList((prev) => prev.filter((todo) => todo.id !== todoId));
        if (editingId === todoId) {
            setEditingId(null); // 삭제한 todo가 수정 중이었다면 초기화
        }
    };

    // 3. 수정
    const updateTodo = (todoId, newText) => {
        setTodoList((prev) =>
            prev.map((item) => (item.id === todoId ? { ...item, task: newText } : item))
        );
        setEditingId(null);
    };

    return (
        <TodoContext.Provider
            value={{
                todoList,
                text,
                newText,
                setText,
                setNewText,
                addTodo,
                deleteTodo,
                updateTodo,
                editingId,
                setEditingId,
                handleSubmit
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}
