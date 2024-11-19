
const Input = ({ value, onChange, type = "text", defaultValue }) => {
  return (
    <input
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default Input;
