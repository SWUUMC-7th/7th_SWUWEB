import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";

const useCustomFetch=(url:string, isDetail:boolean)=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const response = await axiosInstance.get(url,{
                    headers:{
                        Authorization : `Bearer ${ import.meta.env.VITE_API_KEY}`
                    },
                });
                console.log('response',response.data)
                setData(isDetail ? response.data : response.data.results);
            }catch(error){
                setIsError(true);
                console.log(error)
            }finally{
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url,isDetail]);
    return {data, isLoading, isError}
}

export default useCustomFetch