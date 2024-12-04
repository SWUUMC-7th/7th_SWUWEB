import { useState, useEffect } from "react";

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormTouched {
  [key: string]: boolean;
}

type ValidateFunction = (values: FormValues) => FormErrors;

interface UseFormProps {
  initialValue: FormValues;
  validate: ValidateFunction;
}

function useForm({ initialValue, validate }: UseFormProps) {
  const [values, setValues] = useState<FormValues>(initialValue);
  const [touched, setTouched] = useState<FormTouched>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChangeInput = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: string) => {
    const value = values[name];
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      handleChangeInput(name, event.target.value);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getTextInputProps };
}

export default useForm;
