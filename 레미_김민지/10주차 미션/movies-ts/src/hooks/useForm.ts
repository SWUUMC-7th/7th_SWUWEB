import { useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
}

interface UseFormReturn<T> {
  isValid: any;
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  getTextInputProps: (name: keyof T) => {
    value: T[keyof T];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  const handleChangeInput = (name: keyof T, value: T[keyof T]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      handleChangeInput(name, event.target.value as T[keyof T]);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  return { values, errors, touched, getTextInputProps };
}

export default useForm;
