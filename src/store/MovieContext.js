import { createContext, useState, useCallback, useMemo } from "react";
import useHttp from "../hooks/use-http";
const MovieContext = createContext();

const MovieState = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState();
  const [movieCategori, setMovieCategori] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { sendRequest, isLoading, error } = useHttp();
  const HeaderApi = useMemo(() => {
    return {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDhiZDg4OTY0NjU3YmFlZjhhZGIyNzc0OTE3ZTcxMCIsInN1YiI6IjY0NmVjZDQ2ODk0ZWQ2MDBhNjdjNGY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lvAMCRi4BhcXfHFJnVoUF6LyuHdRSFhsK9lGkOk5gQ",
    };
  }, []);
  const main = document.querySelector("html");
  const handleOpenNav = () => {
    setIsOpen(true);
    main.classList.add("hidden");
  };
  const handleCloseNav = () => {
    setIsOpen(false);
    main.classList.remove("hidden");
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const popularMoviesData = useCallback(async () => {
    const getData = (data) => {
      setPopularMovies(data.results);
    };
    sendRequest(
      {
        url: "https://api.themoviedb.org/3/movie/popular",
        headers: HeaderApi,
      },
      getData
    );
  }, [sendRequest, HeaderApi]);

  const trendingMoviesData = useCallback(async () => {
    const getData = (data) => {
      setTrendingMovie(data.results);
    };

    sendRequest(
      {
        url: "https://api.themoviedb.org/3/trending/movie/week",
        headers: HeaderApi,
      },
      getData
    );
  }, [sendRequest, HeaderApi]);

  const topRatedMoviesData = useCallback(async () => {
    const getData = (data) => {
      setTopRatedMovies(data.results);
    };
    sendRequest(
      {
        url: "https://api.themoviedb.org/3/movie/top_rated",
        headers: HeaderApi,
      },
      getData
    );
  }, [sendRequest, HeaderApi]);

  const NowPlayingData = useCallback(async () => {
    const getData = (data) => {
      setNowPlayingMovies(data.results);
    };

    sendRequest(
      {
        url: "https://api.themoviedb.org/3/movie/now_playing",
        headers: HeaderApi,
      },
      getData
    );
  }, [sendRequest, HeaderApi]);
  const upcomingMoviesData = useCallback(
    async (num) => {
      const getData = (data) => {
        const filterData = data.results.filter(
          (film) => film.poster_path !== null
        );
        setUpcomingMovies(filterData);
        setPageCount(data.total_pages);
      };
      sendRequest(
        {
          url: `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${num}`,
          headers: HeaderApi,
        },
        getData
      );
    },
    [sendRequest, HeaderApi]
  );

  const categoryMovieData = useCallback(async () => {
    const getData = (data) => {
      setMovieCategori(data.genres);
    };

    sendRequest(
      {
        url: "https://api.themoviedb.org/3/genre/movie/list",
        headers: HeaderApi,
      },
      getData
    );
  }, [sendRequest, HeaderApi]);

  const mainMoviesData = useCallback(
    async (num, sort) => {
      const getData = (data) => {
        const filterData = data.results.filter(
          (film) => film.poster_path !== null
        );
        setMovies(filterData);
        setPageCount(data.total_pages);
      };

      sendRequest(
        {
          url: `https://api.themoviedb.org/3/discover/movie?page=${num}`,
          headers: HeaderApi,
        },
        getData
      );
    },
    [sendRequest, HeaderApi]
  );

  return (
    <MovieContext.Provider
      value={{
        movies,
        popularMovies,
        upcomingMovies,
        topRatedMovies,
        nowPlayingMovies,
        movieCategori,
        isOpen,
        searchValue,
        pageCount,
        trendingMovie,
        // searchData,
        isLoading,
        error,
        setPageCount,
        popularMoviesData,
        topRatedMoviesData,
        upcomingMoviesData,
        handleOpenNav,
        handleCloseNav,
        handleSearchValue,
        NowPlayingData,
        categoryMovieData,
        mainMoviesData,
        // handleSearchRequest,
        trendingMoviesData,
        // setSearchData,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieState };
