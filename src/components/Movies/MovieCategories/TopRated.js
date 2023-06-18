import classes from "./TopRated.module.css";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../../store/MovieContext";
import MovieList from "../MovieList";

const TopRated = () => {
  const { topRatedMoviesData, topRatedMovies } = useContext(MovieContext);
  const movieData = topRatedMovies && topRatedMovies.slice(0, 8);

  useEffect(() => {
    topRatedMoviesData();
  }, [topRatedMoviesData]);

  return (
    <div className="py-5">
      <h2
        className={`text-white text-uppercase fw-semibold mb-4 position-relative ${classes.title}`}
      >
        Top Rated
      </h2>

      <div className="row">
        {movieData.map((movie) => (
          <MovieList movie={movie} key={movie.id} grid="3" />
        ))}
      </div>
    </div>
  );
};

export default TopRated;
