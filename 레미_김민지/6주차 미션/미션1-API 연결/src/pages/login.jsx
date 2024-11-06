import styled from "styled-components";
import useForm from "../hooks/useForm.js";
import { validateLogin } from "../utils/validate.js";
import { loginUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const isFormValid = !login.errors.email && !login.errors.password;

  const handleLogin = async () => {
    if (isFormValid) {
      try {
        const { accessToken, refreshToken } = await loginUser({
          email: login.values.email,
          password: login.values.password,
        });
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("로그인 성공:", { accessToken, refreshToken });

        navigate("/");
      } catch (error) {
        console.error("로그인 실패:", error.response?.data);
      }
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
            {...login.getTextInputProps("email")}
          />
          {login.touched.email && login.errors.email && (
            <ErrorMessage>{login.errors.email}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputBox
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            {...login.getTextInputProps("password")}
          />
          {login.touched.password && login.errors.password && (
            <ErrorMessage>{login.errors.password}</ErrorMessage>
          )}
        </InputWrapper>
        <Button
          onClick={handleLogin}
          disabled={!isFormValid}
          title={!isFormValid ? "정보를 입력하세요" : ""}
        >
          로그인
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
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    color: ${(props) => (props.disabled ? "#fff" : "#ffffffa6")};
    background-color: ${(props) => (props.disabled ? "#ccc" : "#ff213b8b")};
  }
`;

export default Login;
