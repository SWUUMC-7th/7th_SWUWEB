import styled from "styled-components";

const Category = () => {
  return (
    <CategoryContainer>
      <h1>카테고리</h1>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <CategoryImage src={category.imageUrl} alt={category.name} />
            <CategoryName>{category.name}</CategoryName>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </CategoryContainer>
  );
};

const categories = [
  {
    id: 1,
    name: "현재 상영",
    imageUrl: "https://i.ibb.co/QNCnwJB/IMG-8456.png",
  },
  {
    id: 2,
    name: "인기있는",
    imageUrl: "https://i.ibb.co/bBm2V6M/IMG-8458-2.png",
  },
  {
    id: 3,
    name: "높은 평가를 받은",
    imageUrl: "https://i.ibb.co/C1QyCkS/IMG-8457.png",
  },
  {
    id: 4,
    name: "개봉 예정",
    imageUrl: "https://i.ibb.co/kHWp08n/IMG-8454.png",
  },
];

export default Category;

const CategoryContainer = styled.div`
  padding: 20px;
  color: white;
`;

const CategoryGrid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CategoryCard = styled.div`
  width: 290px;
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
