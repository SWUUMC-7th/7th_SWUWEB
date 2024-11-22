import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import useForm from "../hooks/useForm.js";
import { validateLogin } from "../utils/validate.js";
import { loginUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // React Query의 useMutation 사용
  const { mutate: handleLogin, isLoading } = useMutation(loginUser, {
    onSuccess: async ({ accessToken, refreshToken }) => {
      await login(accessToken); // AuthContext에 액세스 토큰 저장
      localStorage.setItem("refreshToken", refreshToken); // 로컬 스토리지에 리프레시 토큰 저장
      console.log("로그인 성공:", { accessToken, refreshToken });
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error.response?.data);
    },
  });

  const loginForm = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const isFormValid = !loginForm.errors.email && !loginForm.errors.password;

  const handleSubmit = () => {
    if (isFormValid) {
      handleLogin({
        email: loginForm.values.email,
        password: loginForm.values.password,
      });
    }
  };

  return (
    <Container>
      <InfoWrapper>
        <Title>로그인</Title>
        <InputWrapper>
          <InputBox
            type="email"
            placeholder="이메일을 입력해주세요!"
            {...loginForm.getTextInputProps("email")}
          />
          {loginForm.touched.email && loginForm.errors.email && (
            <ErrorMessage>{loginForm.errors.email}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputBox
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            {...loginForm.getTextInputProps("password")}
          />
          {loginForm.touched.password && loginForm.errors.password && (
            <ErrorMessage>{loginForm.errors.password}</ErrorMessage>
          )}
        </InputWrapper>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          title={!isFormValid ? "정보를 입력하세요" : ""}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: white;
  transition: background-color 0.2s;

  &:hover {
    color: ${(props) => (props.disabled ? "#fff" : "#ffffffa6")};
    background-color: ${(props) => (props.disabled ? "#ccc" : "#ff213b8b")};
  }
`;

export default Login;
