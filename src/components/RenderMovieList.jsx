import React from 'react'

const RenderMovieList = ({movieList, deleteMovie, setUpdatedTitle, updateMovieTitle}) => {
  return (
    <div>
      {movieList.map((movie)=>(
        <div key={movie.id}>
          <h1 style={{color: movie.receivedOscar?'green':'red'}}>{movie.title}</h1>
          <p>{movie.releaseDate}</p>

          <button onClick={() =>deleteMovie(movie.id)}>Delete Movie</button>

          <input
            placeholder='New Title..' 
            onChange={(e) =>setUpdatedTitle(e.target.value)}
          />
          <button onClick={() =>updateMovieTitle(movie.id)}>{" "}Update Title</button>
        </div>
      ))}
    </div>
  )
}

export default RenderMovieList;
