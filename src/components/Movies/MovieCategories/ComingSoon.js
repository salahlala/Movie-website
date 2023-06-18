import classes from "./ComingSoon.module.css";
import { useEffect, useContext } from "react";
import { MovieContext } from "../../../store/MovieContext";
import MovieList from "../MovieList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ComingSoon = () => {
  const { upcomingMoviesData, upcomingMovies, isLoading, pageCount, error } =
    useContext(MovieContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState();
  const { pageNum } = useParams();
  const [isEndPage, setISEndPage] = useState(false);

  const handleIncreasePage = () => {
    if (+pageNum + 1 > pageCount) {
      setISEndPage(true);
      return;
    }

    navigate(`/coming-soon/page/${+pageNum + 1}`);
    // setPage(page + 1);
  };
  const handleDecreasePage = () => {
    if (+pageNum - 1 < 1) return;
    navigate(`/coming-soon/page/${+pageNum - 1}`);
    // setPage(page - 1);
  };

  useEffect(() => {
    upcomingMoviesData(pageNum);
  }, [upcomingMoviesData, pageNum]);

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
    upcomingMoviesData(pageNum);
  };
  return (
    <div className="col-lg-10 pb-5 pt-4 mt-lg-0 mt-5">
      <div className="container">
        {upcomingMovies && upcomingMovies.length > 0 && (
          <>
            <h2 className={`${classes.title} mb-5 pb-3 position-relative`}>
              Coming Soon
            </h2>

            {!isLoading && !error && (
              <>
                <div className="row">
                  {upcomingMovies.map((movie) => (
                    <MovieList movie={movie} key={movie.id} grid="3" />
                  ))}
                </div>

                <div className="d-flex align-item-center gap-3">
                  <div
                    className={`${classes.pagenation}   rounded-2 px-3 py-2 ${
                      isLoading && classes.disable
                    } ${isEndPage && classes.disable}`}
                    onClick={handleDecreasePage}
                  >
                    Back
                  </div>
                  <div className="rounded-pill px-3 py-2 bg-white text-black">
                    {pageNum}
                  </div>
                  <div
                    className={`${classes.pagenation}   rounded-2 px-3 py-2 ${
                      isLoading && classes.disable
                    } ${isEndPage && classes.disable}`}
                    onClick={handleIncreasePage}
                  >
                    Next
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {!isLoading &&
          !error &&
          upcomingMovies &&
          upcomingMovies.length < 1 && (
            <p className="text-center text-white fw-semibold ">No Data Found</p>
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
    </div>
  );
};

export default ComingSoon;
