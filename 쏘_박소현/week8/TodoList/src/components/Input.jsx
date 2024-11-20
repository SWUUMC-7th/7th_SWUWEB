import styled from "styled-components";

const StyledInput = styled.input`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
`;

const Input = ({ value, onChange, type = "text", defaultValue }) => {
  return (
    <StyledInput
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default Input;
