import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/?format=json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setMovies(data.results.map(movie => ({
          movieId: movie.episode_id, 
          movieName: movie.title, 
          movieReleaseDate: movie.release_date,
          movieInformation: movie.opening_crawl,
          director:movie.director
        })));
      } catch (error) {
        console.error('Could not fetch the data:', error);
      }
    };

    fetchData();
  }, []);



  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSortChange = (event) => {
    let sortedMovies = [...movies];
    if (event.target.value === 'episode') {
      sortedMovies.sort((a, b) => a.movieId - b.movieId);
    } else if (event.target.value === 'year') {
      sortedMovies.sort((a, b) => new Date(a.movieReleaseDate) - new Date(b.movieReleaseDate));
    }
    setMovies(sortedMovies);
  };


  const handleSearchChange = (event) =>{
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = (event) =>{
    event.preventDefault();
  }

  const handleClearSearch = () =>{
    setSearchTerm('');
  }

  const filteredMovies = movies.filter(movie =>
    movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <>

      <div className="container1">

        <div className="container1-item1">

          <select name="" id="select-element" onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option id='sortby-episode' value="episode">Episode</option>
            <option id='sortby-year' value="year">Year</option>
          </select>

        </div>



        <div className="container1-item2">

            <form onSubmit={handleSearchSubmit}>

                <input className='search-input' type="text" placeholder='Search here' value={searchTerm} onChange={handleSearchChange} />
                <button className='remove-input' onClick={handleClearSearch}>Clear</button>

            </form>

        </div>

      </div>




      <div className="container2">



        <div className="container2-item1">
                


        {filteredMovies.map((movie, index) => (
            <div
              className="container2-item1-element"
              key={movie.movieId}
              onClick={() => handleMovieClick(movie)}
            >
              {`Episode ${movie.movieId} - ${movie.movieName} - (${movie.movieReleaseDate})`}
            </div>
        ))}



        </div>




        <div className="container2-item2">


          {selectedMovie ? (
            <>
              <h3 className='container2-item2-movie-title'>Episode {selectedMovie.movieId} - {selectedMovie.movieName}</h3>
              <p className='container2-item2-movie-information'>{selectedMovie.movieInformation}</p>
              <p className='container2-item2-movie-information'>Directed by: {selectedMovie.director}</p>

            </>
          ) : (
            <p className='selectamovie'>No movie selected</p>
          )}
        </div>




      </div>
    </>
  );
}

export default Home;
