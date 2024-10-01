import PropTypes from "prop-types";

function Input({ value, onChange, placeholder, className = "", ...rest }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className}`}
      {...rest}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  placeholder: "텍스트를 입력해주세요",
  className: "",
};

export default Input;
