import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

const StyledInput = styled.input`
  background-color: white;
  width: 400px;
  height: 30px;
  border-radius: 4px;
  padding: 5px;
  color: black;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid #ccc")};
`;

const StyledDatePickerInput = styled.input`
  background-color: white;
  width: 400px;
  height: 30px;
  border-radius: 4px;
  padding: 5px;
  color: black;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid #ccc")};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0;
  text-align: left;
  width: 400px;
`;

const Container = styled.div`
  margin-bottom: 16px;
`;

const Input = ({ type, register, error, placeholder, onChange, value }) => (
  <Container>
    {type === "date" ? (
      <DatePicker
        selected={value}
        onChange={(date) => {
          onChange(date);
        }}
        dateFormat="yyyy/MM/dd"
        customInput={
          <StyledDatePickerInput error={!!error} placeholder={placeholder} />
        }
        placeholderText={placeholder}
      />
    ) : (
      <StyledInput
        type={type}
        {...register}
        error={!!error}
        placeholder={placeholder}
      />
    )}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Container>
);

export default Input;
