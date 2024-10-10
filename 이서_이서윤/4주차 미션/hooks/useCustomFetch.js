import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";

const useCustomFetch=(url)=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const resoponse = await axiosInstance.get(url);
                setData(resoponse.data.results);
            }catch(error){
                setIsError(true);
                console.log(error)
            }finally{
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);
    return {data, isLoading, isError}
}

export default useCustomFetch