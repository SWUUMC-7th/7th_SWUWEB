import { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 16;
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  return (
    <Container>
      <InfoWrapper>
        <Title>로그인</Title>
        <InputWrapper>
          <InputBox
            type="email"
            placeholder="이메일을 입력해주세요!"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setIsEmailFocused(true)}
            onFocus={() => setIsEmailFocused(true)}
          />
          {isEmailFocused && !validateEmail(email) && (
            <ErrorMessage>올바른 이메일 형식이 아닙니다.</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputBox
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setIsPasswordFocused(true)}
            onFocus={() => setIsPasswordFocused(true)}
          />
          {isPasswordFocused && !validatePassword(password) && (
            <ErrorMessage>비밀번호는 8자리 이상 16자리 이하입니다.</ErrorMessage>
          )}
        </InputWrapper>
        <Button disabled={!isFormValid}>로그인</Button>
      </InfoWrapper>
    </Container>
  );
};

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
  cursor: "pointer";
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#ff213b8b")};
  }
`;

export default Login;
