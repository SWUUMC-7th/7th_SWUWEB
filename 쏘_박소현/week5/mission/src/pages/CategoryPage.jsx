import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.p`
  margin-bottom: 20px;
  margin: 0;
  font-size: 40px;
  display: flex;
  justify-content: flex-start;
  font-weight: 700;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const CategoryItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  flex: 1; 
  margin: 0 10px; 
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff4545;
  }
`;

const CategoryPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/movies/categories/${category}`); 
  };

  return (
    <Container>
      <Title>카테고리</Title>
      <CategoryContainer>
        <CategoryItem onClick={() => handleCategoryClick('now_playing')}>현재 상영중인</CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick('popular')}>인기 있는</CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick('top_rated')}>높은 평가를 받은</CategoryItem>
        <CategoryItem onClick={() => handleCategoryClick('upcoming')}>개봉 예정중인</CategoryItem>
      </CategoryContainer>
    </Container>
  );
}

export default CategoryPage;
