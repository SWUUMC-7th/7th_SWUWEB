import { useEffect, useState } from "react";

interface useFormProps {
    initialValue: { [key: string]: string },
    validate:  (values: { [key: string]: string }) => { [key: string]: string },
}

interface UseFormReturn {
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
    values: { [key: string]: string };
    getTextInputProps: (key: string) => object;
  }

function useForm({initialValue, validate}:useFormProps):UseFormReturn{
    const [values, setValues] = useState<{ [key: string]: string }>(initialValue);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const handleChangeInput=(name:string,value:string)=>{
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleBlur=(name:string)=>{
        setTouched({
            ...touched,
            [name]:true
        })
    }
    const getTextInputProps=(name:string)=>{
        const value=values[name];
        const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>handleChangeInput(name,e.target.value)
        const onBlur=()=>handleBlur(name)
        return {value, onChange, onBlur};
    }
    useEffect(()=>{
        const newErrors=validate(values);
        setErrors(newErrors);
    },[validate,values])
    return {values, errors, touched,  getTextInputProps};
}
export default useForm;