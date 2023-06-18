import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../../store/MovieContext";
import MovieList from "../MovieList";
import classes from "./NowPlaying.module.css";
import useHttp from "../../../hooks/use-http";

const NowPlaying = () => {
  const { NowPlayingData, nowPlayingMovies } = useContext(MovieContext);
  const { sendRequest: fetchData } = useHttp();
  const [filmCat, setFilmCat] = useState();

  useEffect(() => {
    NowPlayingData();
  }, [NowPlayingData]);

  useEffect(() => {
    const sendData = (data) => {
      const catData = data.genres;
      const loadedData = [];
      for (let key in catData) {
        loadedData.push(catData[key]);
      }

      setFilmCat(loadedData);
    };
    fetchData(
      {
        url: "https://api.themoviedb.org/3/genre/movie/list",
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDhiZDg4OTY0NjU3YmFlZjhhZGIyNzc0OTE3ZTcxMCIsInN1YiI6IjY0NmVjZDQ2ODk0ZWQ2MDBhNjdjNGY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lvAMCRi4BhcXfHFJnVoUF6LyuHdRSFhsK9lGkOk5gQ",
        },
      },
      sendData
    );
  }, [fetchData]);

  return (
    <div className="py-5">
      <h2
        className={`text-white text-uppercase fw-semibold mb-4 position-relative ${classes.title}`}
      >
        Now Playing
      </h2>

      <div className="row">
        {nowPlayingMovies &&
          nowPlayingMovies
            .slice(0, 8)
            .map((movie) => (
              <MovieList
                movie={movie}
                filmCategory={filmCat}
                key={movie.id}
                grid="3"
              />
            ))}
      </div>
    </div>
  );
};

export default NowPlaying;
