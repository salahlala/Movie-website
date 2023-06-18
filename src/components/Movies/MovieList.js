import classes from "./MovieList.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { Skeleton } from "@mui/material";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../store/MovieContext";
import { Link } from "react-router-dom";
const MovieList = ({ movie, grid }) => {
  const { movieCategori, categoryMovieData } = useContext(MovieContext);
  const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  useEffect(() => {
    categoryMovieData();
  }, [categoryMovieData]);

  const filterCat =
    movieCategori &&
    movieCategori.filter((cat) => movie.genre_ids.includes(cat.id));
  return (
    <div
      className={`${grid && `col-lg-${grid}`}   ${
        grid && "col-md-6"
      } mb-4 position-relative ${classes["movie-box"]}`}
    >
      <div className={`${classes["img-div"]}`}>
        <LazyLoadImage
          src={imgSrc}
          alt="..."
          effect="blur"
          className={`${classes.img} w-100`}
          placeholder={<Skeleton />}
        />
      </div>

      {/* <h4>{movie.title}</h4> */}

      <div
        className={`${classes.details} px-3 d-flex justify-content-center align-items-center flex-wrap `}
      >
        <h4>{movie.title}</h4>
      </div>
      <div
        className={`${classes.categories} p-2 flex-wrap d-flex align-items-center gap-3`}
      >
        {filterCat &&
          filterCat.slice(0, 4).map((cat) => (
            <span className="border px-2 py-1" key={cat.id}>
              {cat.name}
            </span>
          ))}
      </div>
      <div className={`${classes.icon} position-absolute`}>
        <Link to={`/movie/${movie.id}`}>
          <AiFillPlayCircle />
        </Link>
      </div>
    </div>
  );
};

export default MovieList;
