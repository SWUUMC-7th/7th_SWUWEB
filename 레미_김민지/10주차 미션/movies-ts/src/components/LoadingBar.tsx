import styled, { keyframes } from "styled-components";

interface LoadingBarProps {
  text?: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ text = "로딩 중입니다..." }) => {
  return (
    <Container>
      <LoadingBarContainer>
        <LoadingBarFiller />
      </LoadingBarContainer>
      <LoadingText>{text}</LoadingText>
    </Container>
  );
};

export default LoadingBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const LoadingBarContainer = styled.div`
  width: 30%;
  height: 2vh;
  position: relative;
  background-color: #ffecec;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const loadingAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const LoadingBarFiller = styled.div`
  height: 100%;
  width: 0;
  background-color: #ff213b;
  animation: ${loadingAnimation} 3s linear infinite;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
  color: #ffffff;
`;
