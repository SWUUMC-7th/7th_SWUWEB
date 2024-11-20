import styled from "styled-components";

const StyledButton = styled.button`
  width: 100px;
  height: 36px;
  background-color: ${(props) =>
    props.disabled ? "rgb(187, 187, 187)" : "rgb(99, 151, 255)"};
  border: none;
  border-radius: 4px;
  color: ${(props) => (props.disabled ? "rgba(255, 255, 255, 0.5)" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgb(187, 187, 187)" : "rgb(77, 131, 240)"};
  }
`;

const Button = ({ onClick, children, type = "button", disabled = false }) => {
  return (
    <StyledButton onClick={onClick} type={type} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
