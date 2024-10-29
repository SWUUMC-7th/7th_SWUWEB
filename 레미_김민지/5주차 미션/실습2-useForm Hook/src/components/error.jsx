import React from "react";
import styled from "styled-components";

const Error = ({ text = "문제가 발생했습니다. 다시 시도해주세요." }) => {
  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorMessage>{text}</ErrorMessage>
        <RetryButton onClick={() => window.location.reload()}>다시 시도</RetryButton>
      </ErrorContent>
    </ErrorContainer>
  );
};

export default Error;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const ErrorContent = styled.div`
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 80px;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.div`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 36px;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  font-size: 20px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff213b;
    color: #ffffff;
  }
`;
