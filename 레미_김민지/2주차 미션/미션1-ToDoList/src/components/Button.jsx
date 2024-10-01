import PropTypes from "prop-types";

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default Button;
