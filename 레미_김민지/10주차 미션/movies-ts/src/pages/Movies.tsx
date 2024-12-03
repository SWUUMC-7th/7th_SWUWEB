import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import RoutePaths from "../routes/RoutePaths";

interface Category {
  id: string;
  label: string;
  image: string;
}

// 카테고리 데이터
const categories: Category[] = [
  {
    id: "now_playing",
    label: "Now Playing",
    image: "https://i.pinimg.com/736x/96/16/d5/9616d593d90be28e9c69b9fec05f57fd.jpg",
  },
  {
    id: "popular",
    label: "Popular",
    image: "https://i.pinimg.com/736x/f9/a3/d5/f9a3d50be6fd220508bc306267a7bda2.jpg",
  },
  {
    id: "top_rated",
    label: "Top Rated",
    image: "https://i.pinimg.com/736x/d1/4c/17/d14c1765b2ef91b862d338b99eb52cc1.jpg",
  },
  {
    id: "upcoming",
    label: "Upcoming",
    image: "https://i.pinimg.com/736x/6b/b2/fb/6bb2fbe87146ac724a3889d8d9834b70.jpg",
  },
];

const Movies: React.FC = () => {
  return (
    <Container>
      <Title>Movie Categories</Title>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <NavLink to={`${RoutePaths.MOVIES}/${category.id}`}>
              <CardImage src={category.image} alt={category.label} />
              <CardContent>
                <CategoryLabel>{category.label}</CategoryLabel>
              </CardContent>
            </NavLink>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </Container>
  );
};

export default Movies;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h1`
  color: #ffffff;
  margin-bottom: 32px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const CategoryCard = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(70%);
  transition: filter 0.3s ease;

  ${CategoryCard}:hover & {
    filter: brightness(50%);
  }
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryLabel = styled.h2`
  font-size: 20px;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
