const Input = ({ type, register, error }) => (
  <div style={{ marginBottom: "16px" }}>
    <input type={type} {...register} />
    {error && <p style={{ color: "red" }}>{error}</p>}
  </div>
);

export default Input;
