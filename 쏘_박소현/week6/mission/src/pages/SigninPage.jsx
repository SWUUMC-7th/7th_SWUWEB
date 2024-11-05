import styled from "styled-components";
import useForm from "../hooks/useForm";
import { validateLogin } from "../utils/validate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
  border: ${(props) => (props.error ? "2px solid red" : "1px solid #ccc")};
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

  const onSubmit = async (data) => {
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
