
const Button = ({ onClick, children, type = "button" }) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
