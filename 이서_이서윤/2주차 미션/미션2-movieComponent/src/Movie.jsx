import { useState } from 'react';
import {MOVIES} from './mocks/movies'

function Movie() {
  const [mouseOn,setMouseOn]=useState('');
  const src='https://image.tmdb.org/t/p/w500'
  return (
    <>
      <div style={{display:'flex',flexWrap:'wrap', gap:'15px'}}>
        {MOVIES.results.map((movie,index)=>(
          <>
            <div
              style={{
                width:'150px',
                height:'200px',
                borderRadius:'10px',
                backgroundColor: mouseOn === index ? 'black' : 'none',
              }}
              onMouseEnter={()=>setMouseOn(index)}
              onMouseLeave={()=>setMouseOn('')}
            >
              <img 
                src={`${src}${movie.poster_path}`} 
                alt={movie.name} key={movie.id}
                style={{
                  width:'150px',
                  height:'200px',
                  borderRadius:'10px',
                  opacity: mouseOn===index ? 0.3 : 1,
                }}  
              />
            </div>
          </>
        ))
      }
     </div>
    </>
  )
}

export default Movie
