import styled, { keyframes } from "styled-components";

const Error = () => {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <ErrorMessage>에러가 발생했습니다</ErrorMessage>
    </ErrorContainer>
  );
};

export default Error;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const ErrorIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ff4d4d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 1.5s infinite;
  position: relative;

  &::before {
    content: "✖";
    font-size: 50px;
    color: white;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 16px;
  font-size: 18px;
  color: #555;
`;
