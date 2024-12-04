import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-top: 100px;
`;

const Input = styled.input<{ error?: boolean }>`
  background-color: white;
  width: 400px;
  height: 30px;
  border-radius: 4px;
  padding: 5px;
  color: black;
  border: ${(props) => (props.error ? "2px solid red" : "1px solid #ccc")};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0;
  text-align: left;
  width: 400px;
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 404px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => (props.disabled ? "gray" : "#ff3557")};
  color: white;
  padding: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

interface UserValues {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

function useForm({
  initialValue,
  validate,
}: {
  initialValue: UserValues;
  validate: (values: UserValues) => ValidationErrors;
}) {
  const [values, setValues] = useState<UserValues>(initialValue);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

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
    const value = values[name as keyof UserValues];
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

const validateLogin = (values: UserValues): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  }
  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  }
  return errors;
};

const SignInPage = () => {
  const navigate = useNavigate();
  const { handleSignIn } = useAuth();

  const login = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const isFormValid = !login.errors.email && !login.errors.password;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = login.values;

    try {
      await handleSignIn(data);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Container>
        <Title>로그인</Title>

        <Input
          error={login.touched.email && login.errors.email}
          type="email"
          placeholder="이메일을 입력해주세요."
          {...login.getTextInputProps("email")}
        />

        {login.touched.email && login.errors.email && (
          <ErrorMessage>{login.errors.email}</ErrorMessage>
        )}

        <Input
          error={login.touched.password && login.errors.password}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...login.getTextInputProps("password")}
        />

        {login.touched.password && login.errors.password && (
          <ErrorMessage>{login.errors.password}</ErrorMessage>
        )}

        <Button type="submit" disabled={!isFormValid}>
          로그인
        </Button>
      </Container>
    </form>
  );
};

export default SignInPage;
