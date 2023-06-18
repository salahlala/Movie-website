import classes from "./SearchMovie.module.css";
import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useHttp from "../../hooks/use-http";
const SearchMovie = () => {
  const navigate = useNavigate();
  const { searchQuery, numPage } = useParams();
  const { sendRequest, isLoading } = useHttp();
  const [searchFilmData, setSearchFilmData] = useState();
  const [countPage, setCountPage] = useState();
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState();

  useEffect(() => {
    const sendData = (data) => {
      const filmData = data.results;
      const loadedData = [];
      setCountPage(data.total_pages);
      for (let key in filmData) {
        loadedData.push(filmData[key]);
      }

      setSearchFilmData(loadedData);
    };

    sendRequest(
      {
        url: `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${numPage}`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDhiZDg4OTY0NjU3YmFlZjhhZGIyNzc0OTE3ZTcxMCIsInN1YiI6IjY0NmVjZDQ2ODk0ZWQ2MDBhNjdjNGY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lvAMCRi4BhcXfHFJnVoUF6LyuHdRSFhsK9lGkOk5gQ",
        },
      },
      sendData
    );
  }, [sendRequest, searchQuery, numPage]);

  useEffect(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, prevPath]);

  const handleIncreasePage = () => {
    if (+numPage + 1 > countPage) return;
    navigate(`/search/${searchQuery}/page/${+numPage + 1}`);
  };
  const handleDecreasePage = () => {
    if (+numPage - 1 < 1) return;
    navigate(`/search/${searchQuery}/page/${+numPage - 1}`);
  };

  const filterSearchData =
    searchFilmData &&
    searchFilmData.filter((film) => film.poster_path !== null);

  return (
    <div className="col-lg-10 pt-lg-4 pt-5 mt-lg-0 mt-5">
      <div className="row">
        {isLoading && (
          <div className={`pt-5 mt-5 text-center`}>
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {filterSearchData &&
          filterSearchData.map((movie) => (
            <MovieList movie={movie} grid={3} key={movie.id} />
          ))}
        {!isLoading && filterSearchData && filterSearchData.length < 1 && (
          <p
            className={`${classes.nofound} text-center text-white fw-bold pt-5 text-uppercase`}
          >
            No Result Found
          </p>
        )}
      </div>
      {filterSearchData && filterSearchData.length > 0 && countPage > 1 && (
        <div className="d-flex align-item-center gap-3 mb-4">
          <div
            className={`${classes.pagenation} rounded-2 px-3 py-2`}
            onClick={handleDecreasePage}
          >
            Back
          </div>
          <div className="rounded-pill px-3 py-2 bg-white text-black">
            {numPage}
          </div>
          <div
            className={`${classes.pagenation} rounded-2 px-3 py-2`}
            onClick={handleIncreasePage}
          >
            Next
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
