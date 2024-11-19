import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <Dots>
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
        <Dot delay="0.6s" />
      </Dots>
      <LoadingText>게시글을 불러오는 중입니다..</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 
  40% {
    transform: scale(1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 5px;
  background-color: ${(props) => props.color || "#000"};
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay};
`;

const LoadingText = styled.p`
  font-size: 14px;
  color: #555;
`;
