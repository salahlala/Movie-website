import classes from "./Browse.module.css";
import MovieList from "../MovieList";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieContext } from "../../../store/MovieContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Browse = () => {
  const { num } = useParams();
  const { mainMoviesData, movies, pageCount, isLoading, error } =
    useContext(MovieContext);
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    mainMoviesData(num);
  }, [mainMoviesData, num]);

  const handleIncreasePage = () => {
    if (+num + 1 > pageCount) {
      return;
    }
    navigate(`/browse/page/${+num + 1}`);

    // setPage(page + 1);
  };
  const handleDecreasePage = () => {
    if (+num - 1 < 1) return;

    navigate(`/browse/page/${+num - 1}`);

    // setPage(page - 1);
  };

  useEffect(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, prevPath]);

  const handleFetchAgain = () => {
    mainMoviesData(num);
  };

  return (
    <div className="col-lg-10 pt-5 pt-lg-4 mt-lg-0 mt-5">
      <div className="row mb-4">
        {!isLoading &&
          movies &&
          movies.map((movie) => (
            <MovieList movie={movie} grid={3} key={movie.id} />
          ))}
      </div>

      {!isLoading && movies && movies.length > 0 && pageCount > 1 && (
        <div className="d-flex align-item-center gap-3 mb-4">
          <div
            className={`${classes.pagenation} rounded-2 px-3 py-2`}
            onClick={handleDecreasePage}
          >
            Back
          </div>
          <div className="rounded-pill px-3 py-2 bg-white text-black">
            {num}
          </div>
          <div
            className={`${classes.pagenation} rounded-2 px-3 py-2`}
            onClick={handleIncreasePage}
          >
            Next
          </div>
        </div>
      )}

      {isLoading && (
        <div className={`pt-5 mt-5 text-center`}>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && error && (
        <div className="text-center pt-5 mt-5 d-flex justify-content-center align-items-center gap-2 flex-column">
          <p className={`${classes["error-msg"]} text-uppercase fw-semibold`}>
            {error}
          </p>
          <div
            className={`${classes.btn} d-flex justify-content-center align-items-center px-2 py-1 rounded-2`}
            onClick={handleFetchAgain}
          >
            Try again
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;
