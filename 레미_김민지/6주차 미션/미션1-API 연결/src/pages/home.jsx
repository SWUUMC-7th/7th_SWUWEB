import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { nickname } = useAuth();
  return (
    <>
      <h1>Home Page</h1>
      {nickname && <p>Welcome, {nickname}!</p>}
    </>
  );
};

export default HomePage;
