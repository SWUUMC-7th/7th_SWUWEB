import axios from 'axios';

const usePatchTodo=()=>{

    const updateTodo = async (id,title,content,check) => {
        const data={}
        if(title&&content){
            data.title=title;
            data.content=content
        }
        if(check||!check){
            data.checked=check;
        }
        try {
          const response = await axios.patch(`http://localhost:3000/todo/${id}`,data);
          if (response.status === 200) {
            console.log('Todo 수정 성공');
            return true;
          } else {
            console.error('Todo 수정 실패');
            return false;
          }
        } catch (err) {
          console.error('수정 중 오류:', err);
          return false;
        } 
      };
    
      return { updateTodo};
}
export default usePatchTodo