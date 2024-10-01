import { useState } from "react";
import { MOVIES } from "./mocks/movies";

function App() {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredMovieId(id);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
  };

  const handleClick = (movie) => {
    alert(`Overview: ${movie.overview}\nRating: ${movie.vote_average}`);
  };

  return (
    <div style={styles.container}>
      {MOVIES.results.map((movie) => (
        <div
          key={movie.id}
          style={styles.movieCard}
          onMouseEnter={() => handleMouseEnter(movie.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(movie)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            style={styles.poster}
          />
          {hoveredMovieId === movie.id && (
            <div style={styles.hoverInfo}>
              <h3 style={styles.hoverText}>{movie.title}</h3>
              <p style={styles.hoverText}>{movie.release_date}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    margin: "40px 0",
  },
  movieCard: {
    position: "relative",
    width: "260px",
    height: "380px",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "16px", // 포스터와 hoverInfo 모서리를 일치
  },
  poster: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
  },
  hoverInfo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // 어둡게 만드는 배경
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    flexDirection: "column",
    textAlign: "center",
    padding: "5px", // 너무 큰 padding을 제거하여 텍스트가 잘리지 않도록 설정
    boxSizing: "border-box", // padding과 height가 겹치지 않도록 box-sizing 설정
  },
  hoverText: {
    margin: 0, // h3와 p 요소의 기본 margin을 제거하여 텍스트가 중앙에 위치하도록 설정
    lineHeight: "1.2", // 텍스트 줄 간격을 좁게 조정
  },
};

export default App;
