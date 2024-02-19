import React from 'react'

const AddMovie = ({
  onSubmitMovie,
  isNewMovieOscar,
  setIsNewMovieOscar,
  setNewMovieTitle,
  setNewReleaseDate
}) => {
  return (
    <div>
      <input 
        placeholder='Movie Title' 
        onChange={(e) =>setNewMovieTitle(e.target.value)}
      />
      <input 
        type="number" 
        placeholder='Released Year'
        onChange={(e) =>setNewReleaseDate(Number(e.target.value))}
      />        
      <label>Received an Oscar?</label>
      <input 
        type="checkbox" 
        checked={isNewMovieOscar}  
        id='receivedOscar'
        onChange={(e) =>setIsNewMovieOscar(e.target.checked)}
      />
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>
  )
}

export default AddMovie