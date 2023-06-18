import { useContext } from "react";
import { MovieContext } from "../../store/MovieContext";
import MovieList from "./MovieList";
import classes from "./Movies.module.css";
const Movies = () => {
  const { movies } = useContext(MovieContext);
  return (
    <div className={`pt-5 mt-5 ${classes["main-movies"]}`}>
      <div className="container">
        <div className="row">
          {movies &&
            movies.map((movie) => <MovieList movie={movie} key={movie.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Movies;
