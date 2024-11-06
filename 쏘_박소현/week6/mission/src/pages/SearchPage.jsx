import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const InputCotainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Input = styled.input`
  width: 500px;
`;

const Button = styled.button`
  background-color: #ff3557; 
`;

const SearchPage = () => {
  return (
    <Container>
      <InputCotainer>
      <Input />
      <Button>검색</Button>
      </InputCotainer>
    </Container>
  );
};

export default SearchPage;
