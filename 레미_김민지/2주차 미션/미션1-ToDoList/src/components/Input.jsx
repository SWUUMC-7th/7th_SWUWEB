import PropTypes from "prop-types";

function Input({ value, onChange, placeholder, ...rest }) {
  return (
    <input type="text" value={value} onChange={onChange} placeholder={placeholder} {...rest} />
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  // 기본 속성
  placeholder: "텍스트를 입력해주세요",
};

export default Input;
