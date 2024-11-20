import styled from "styled-components";

const StyledButton = styled.button`
  width: 100px;
  height: 36px;
  background-color: rgb(99, 151, 255);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(77, 131, 240);
  }
`;

const Button = ({ onClick, children, type = "button" }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;
