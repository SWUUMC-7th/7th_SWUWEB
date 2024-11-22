import { useState, useEffect } from "react";
import axios from 'axios';

const useGetTodo=(id)=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let intervalId;

        const fetchData = async () => {
            setIsLoading(true);
            try{
                if(id){
                    const response = await axios.get(`http://localhost:3000/todo/${id}`);
                    setData(response.data);
                }else{
                    const response = await axios.get('http://localhost:3000/todo');
                    setData(response.data);
                }
            }catch(error){
                setIsError(true);
                console.log(error)
            }finally{
                setIsLoading(false);
            }
        };
        fetchData();
        intervalId = setInterval(() => {
            fetchData();
          }, 1000);
        return () => clearInterval(intervalId);

    });
    return {data, isLoading, isError}
}

export default useGetTodo