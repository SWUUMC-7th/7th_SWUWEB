import { useState, useEffect } from "react";
import axios from 'axios';

const useGetTodo=( isDetail)=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const response = await axios.get('http://localhost:3000/todo');
                console.log('response',response)
                setData(isDetail ? response.data : response.data);
            }catch(error){
                setIsError(true);
                console.log(error)
            }finally{
                setIsLoading(false);
            }
        };
        fetchData();
    }, [isDetail]);
    return {data, isLoading, isError}
}

export default useGetTodo