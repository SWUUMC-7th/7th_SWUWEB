import './App.css';
import { MOVIES } from './mocks/movies';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

function App() {

  console.log(MOVIES);


  return (
    <>
      {MOVIES.results.map(movie => (
        <div key={movie.id}>
          <img src={`${baseUrl}${movie.poster_path}`} alt={movie.title}/>
        </div>
      ))}
    </>
  )
}

export default App
