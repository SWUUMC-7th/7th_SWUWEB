import styled, { keyframes } from "styled-components";

interface SkeletonListProps {
  count: number;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ count }) => {
  return (
    <SkeletonWrapper>
      {Array.from({ length: count }, (_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </SkeletonWrapper>
  );
};

export default SkeletonList;

const SkeletonWrapper = styled.div`
  display: flex;
  gap: 42px;
`;

const CARD_WIDTH = 200;
const CARD_HEIGHT = 300;
const CARD_RADIUS = 8;

const loading = keyframes`
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #c0c0c0;
  }
  100% {
    background-color: #e0e0e0;
  }
`;

const SkeletonCard = styled.div`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: ${CARD_RADIUS}px;
  animation: ${loading} 1.5s infinite;
`;
