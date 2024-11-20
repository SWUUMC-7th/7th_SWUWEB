import styled from "styled-components";

const StyledInput = styled.input`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  ${(props) =>
    props.disabled && `background-color: #f1f1f1; cursor: not-allowed;`}
`;

const Input = ({
  value,
  onChange,
  type = "text",
  defaultValue,
  placeholder,
  disabled = false,
}) => {
  return (
    <StyledInput
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
