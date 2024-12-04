import React from "react";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validate";
import { LoginResponse, loginUser, LoginUserData } from "../api/authApi";
import useForm from "../hooks/useForm";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending } = useMutation<
    LoginResponse, // TData: 성공 시 반환값의 타입
    Error, // TError: 에러 객체 타입
    LoginUserData // TVariables: mutate에 전달될 매개변수 타입
  >(loginUser, {
    onSuccess: ({ accessToken, refreshToken }) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message || error.response?.data);
    },
  });

  const loginForm = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    if (!loginForm.errors.email && !loginForm.errors.password) {
      handleLogin(loginForm.values as LoginUserData);
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <InputWrapper>
        <InputBox
          type="email"
          placeholder="이메일을 입력하세요"
          {...loginForm.getTextInputProps("email")}
        />
        {loginForm.touched.email && loginForm.errors.email && (
          <ErrorMessage>{loginForm.errors.email}</ErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <InputBox
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...loginForm.getTextInputProps("password")}
        />
        {loginForm.touched.password && loginForm.errors.password && (
          <ErrorMessage>{loginForm.errors.password}</ErrorMessage>
        )}
      </InputWrapper>
      <Button onClick={handleSubmit} disabled={isPending || !loginForm.isValid}>
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 28px 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 28px;
  position: relative;
`;

const InputBox = styled.input`
  all: unset;
  width: 100%;
  height: 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: white;
  font-size: 14px;
  color: black;
  border: 1px solid #ddd;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ff213b;
  }
`;

const ErrorMessage = styled.span`
  align-items: center;
  color: #ff213b;
  font-size: 12px;
  position: absolute;
  bottom: -20px;
  left: 12px;
`;

const Button = styled.button`
  all: unset;
  width: 100%;
  padding: 12px 0;
  border-radius: 12px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ff213b")};
  font-weight: bold;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: white;
  transition: background-color 0.2s;

  &:hover {
    color: ${(props) => (props.disabled ? "#fff" : "#ffffffa6")};
    background-color: ${(props) => (props.disabled ? "#ccc" : "#ff213b8b")};
  }
`;
