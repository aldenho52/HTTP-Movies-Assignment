import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { movies } = props
  
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link className='link-card' key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
