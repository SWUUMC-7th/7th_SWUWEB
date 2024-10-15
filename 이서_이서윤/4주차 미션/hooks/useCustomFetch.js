import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";

const useCustomFetch=(url, isDetail)=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    const API_KEY = isDetail ? import.meta.env.VITE_DETAIL_KEY : import.meta.env.VITE_API_KEY; 

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const response = await axiosInstance.get(url,{
                    headers:{
                        Authorization : `Bearer ${API_KEY}`
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
    }, [url,API_KEY,isDetail]);
    return {data, isLoading, isError}
}

export default useCustomFetch