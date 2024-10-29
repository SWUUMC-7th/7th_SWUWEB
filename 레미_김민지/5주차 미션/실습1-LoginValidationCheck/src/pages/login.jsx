import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <InfoWrapper>
        <Title>로그인</Title>
        <InputBox type="email" placeholder="이메일을 입력해주세요!" />
        <InputBox type="password" placeholder="비밀번호를 입력해주세요!" />
        <Button>로그인</Button>
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
  width: 30%;
`;

const InputBox = styled.input`
  all: unset;
  width: 100%;
  height: 20px;
  margin-bottom: 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: white;
  font-size: 14px;
  color: black;
`;

const Button = styled.button`
  all: unset;
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: #ff213b;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    color: #ffffff96;
    background-color: #ff213b8b; /* 호버 시 변경될 색상 */
  }
`;

export default Login;
