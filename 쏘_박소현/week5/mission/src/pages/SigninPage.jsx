import { useState, useEffect } from "react";
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

const Input = styled.input`
  background-color: white;
  width: 400px;
  height: 30px;
  border-radius: 4px;
  padding: 5px;
  color: black;
  border: ${(props) => (props.$hasError ? "2px solid red" : "1px solid #ccc")};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0;
  text-align: left;
  width: 400px;
`;

const Button = styled.button`
  width: 404px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => (props.disabled ? "gray" : "#ff3557")};
  color: white;
  padding: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 16;
  };

  useEffect(() => {
    if (touchedFields.email) {
      setEmailError(
        validateEmail(email) ? "" : "올바른 이메일 형식이 아닙니다."
      );
    }

    if (touchedFields.password) {
      setPasswordError(
        validatePassword(password)
          ? ""
          : "비밀번호는 8자리 이상 16자리 이하여야 합니다."
      );
    }
  }, [email, password, touchedFields]);

  const isFormValid = !emailError && !passwordError && email && password;

  return (
    <Container>
      <Title>로그인</Title>

      <Input
        type="email"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouchedFields((prev) => ({ ...prev, email: true }))}
        $hasError={!!emailError}
      />
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouchedFields((prev) => ({ ...prev, password: true }))}
        $hasError={!!passwordError}
      />
      {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

      <Button type="button" disabled={!isFormValid}>
        로그인
      </Button>
    </Container>
  );
};

export default SigninPage;
