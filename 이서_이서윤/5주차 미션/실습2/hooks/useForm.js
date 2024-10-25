import { useEffect, useState } from "react";

function useForm({initialValue, validate}){
    const [values, setValues]=useState(initialValue);
    const [errors, setErrors]=useState({});

    const handleChangeInput=(name,value)=>{
        setValues({
            ...values,
            [name]: value
        });
    }
    const getTextInputProps=(name)=>{
        const value=values[name];
        const onChange=(e)=>handleChangeInput(name,e.target.value)

        return {value, onChange};
    }
    useEffect(()=>{
        const newErrors=validate(values);
        setErrors(newErrors);
    },[validate,values])
    return {values, errors, getTextInputProps};
}
export default useForm;