import classes from "./PopularMovie.module.css";
import { useContext, useEffect } from "react";

import { MovieContext } from "../../../store/MovieContext";
import MovieList from "../MovieList";
const PopularMovie = () => {
  const { popularMoviesData, popularMovies } = useContext(MovieContext);
  const movieData = popularMovies && popularMovies.slice(0, 8);

  useEffect(() => {
    popularMoviesData();
  }, [popularMoviesData]);

  return (
    <div className="py-5">
      <h2
        className={`text-white text-uppercase fw-semibold mb-4 position-relative ${classes.title}`}
      >
        Popular
      </h2>

      <div className="row">
        {movieData.map((movie) => (
          <MovieList movie={movie} key={movie.id} grid="3" />
        ))}
      </div>
    </div>
  );
};

export default PopularMovie;
