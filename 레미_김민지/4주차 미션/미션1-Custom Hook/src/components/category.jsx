import styled from "styled-components";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <>
      <h1>카테고리</h1>
      <CategoryGrid>
        {categories.map((category) => (
          <StyledLink to={category.route} key={category.id}>
            <CategoryCard>
              <CategoryImage src={category.imageUrl} alt={category.name} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          </StyledLink>
        ))}
      </CategoryGrid>
    </>
  );
};

const categories = [
  {
    id: 1,
    name: "현재 상영",
    imageUrl: "https://i.ibb.co/QNCnwJB/IMG-8456.png",
    route: "/movies/now-playing",
  },
  {
    id: 2,
    name: "인기있는",
    imageUrl: "https://i.ibb.co/bBm2V6M/IMG-8458-2.png",
    route: "/movies/popular",
  },
  {
    id: 3,
    name: "높은 평가를 받은",
    imageUrl: "https://i.ibb.co/C1QyCkS/IMG-8457.png",
    route: "/movies/top-rated",
  },
  {
    id: 4,
    name: "개봉 예정",
    imageUrl: "https://i.ibb.co/kHWp08n/IMG-8454.png",
    route: "/movies/up-coming",
  },
];

export default Category;

const CategoryGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CategoryCard = styled.div`
  width: 300px;
  height: 180px;
  border-radius: 12px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: #000000;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  opacity: 0.7;
`;

const CategoryName = styled.div`
  position: absolute;
  bottom: 14px;
  left: 12px;
  color: white;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 8px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
