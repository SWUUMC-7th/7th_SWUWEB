import styled from 'styled-components';

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
  border: none;
`;

const Button = styled.button`
  width: 404px;
  border-radius: 4px;
  border: none;
  background-color: #ff3557;
`;

const SigninPage = () => {

  return (
    <>
      <Container>
        <Title>로그인</Title>
        <Input type="email" placeholder="이메일을 입력해주세요." />
        <Input type="password" placeholder="비밀번호를 입력해주세요." />
        <Button type="button">로그인</Button>
      </Container>
    </>
  );
};

export default SigninPage;
