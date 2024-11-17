import axiosInstance from "./axiosInstance";

//Todo 생성
const postTodo = async({title, content, checked=false}) => {
    const {data} = await axiosInstance.post('/todo',{
        title,
        content,
        checked
    });
    return data;
}

//TodoList 가져오기
const getTodoList = async({title}) => {
    let url = '/todo';
    if(title){
        url+=`?title=${title}`
    }
    const {data} = await axiosInstance.get(url);
    return data;
}

//Todo 단건 가져오기
const getTodo = async({id}) => {
    const {data} = await axiosInstance.get(`/todo/${id}`);
    return data;
}

//Todo 수정하기
const patchTodo = async({id, title, content, checked}) => {
    const {data} = await axiosInstance.patch(`/todo/${id}`,{
        title,
        content,
        checked
    });;
    return data;
}

//Todo 삭제하기
const deleteTodo = async({id}) => {
    const {data} = await axiosInstance.delete(`/todo/${id}`);
    return data;
}

export {postTodo, getTodoList, getTodo, patchTodo, deleteTodo}