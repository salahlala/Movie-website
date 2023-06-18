import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./MovieDetails.module.css";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { FreeMode, Navigation } from "swiper";
import MovieList from "./MovieList";

const MovieDetails = () => {
  const { sendRequest: fetchData, isLoading } = useHttp();
  const [movieDetail, setMovieDetail] = useState();
  const [simialrMovie, setSimilarMovie] = useState();
  const [movieCast, setMovieCast] = useState();
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState();
  const { movieId } = useParams();

  useEffect(() => {
    const sendData = (data) => {
      setMovieDetail(data);
    };
    fetchData(
      {
        url: `https://api.themoviedb.org/3/movie/${movieId}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDhiZDg4OTY0NjU3YmFlZjhhZGIyNzc0OTE3ZTcxMCIsInN1YiI6IjY0NmVjZDQ2ODk0ZWQ2MDBhNjdjNGY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lvAMCRi4BhcXfHFJnVoUF6LyuHdRSFhsK9lGkOk5gQ",
        },
      },
      sendData
    );
  }, [fetchData, movieId]);

  useEffect(() => {
    const sendData = (data) => {
      const cast = data.cast;
      const loadedData = [];
      for (let key in cast) {
        loadedData.push(cast[key]);
      }
      setMovieCast(loadedData);
    };
    fetchData(
      {
        url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=&language=en-US`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDhiZDg4OTY0NjU3YmFlZjhhZGIyNzc0OTE3ZTcxMCIsInN1YiI6IjY0NmVjZDQ2ODk0ZWQ2MDBhNjdjNGY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lvAMCRi4BhcXfHFJnVoUF6LyuHdRSFhsK9lGkOk5gQ",
        },
      },
      sendData
    );
  }, [fetchData, movieId]);

  useEffect(() => {
    const sendData = (data) => {
      setSimilarMovie(data.results);
    };
    fetchData(
      {
        url: `https://api.themoviedb.org/3/movie/${movieId}/similar`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDhiZDg4OTY0NjU3YmFlZjhhZGIyNzc0OTE3ZTcxMCIsInN1YiI6IjY0NmVjZDQ2ODk0ZWQ2MDBhNjdjNGY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lvAMCRi4BhcXfHFJnVoUF6LyuHdRSFhsK9lGkOk5gQ",
        },
      },
      sendData
    );
  }, [fetchData, movieId]);

  useEffect(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, prevPath]);

  const imgSrc =
    movieDetail && `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`;

  const filteProfileCast =
    movieCast && movieCast.filter((cast) => cast.profile_path !== null);
  // const filterCat =
  //   movieCategori &&
  //   movieCategori.filter((cat) => movie.genre_ids.includes(cat.id));
  const filterSimilarMovie =
    simialrMovie && simialrMovie.filter((movie) => movie.poster_path !== null);

  return (
    <div className="col-lg-10 mt-5 mt-lg-4 pt-4 position-relative">
      {isLoading && (
        <div className={`pt-5 mt-5 text-center`}>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && movieDetail && (
        <>
          <div
            className={`${classes["main-detail"]}`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(34,31,31,1) 0%,rgba(34,31,31,0.4) 100%),url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
            }}
          ></div>

          <div className="d-flex flex-column flex-md-row align-items-start gap-4 p-4">
            <div className={`${classes.poster}`}>
              <img src={imgSrc} alt="..." />
            </div>
            <div className={`${classes.details}`}>
              <h2 className={`${classes.title} fw-semibold`}>
                {movieDetail.title}
              </h2>
              <span
                className={`${classes.vote} d-flex align-items-center gap-2`}
              >
                <AiFillStar className={`${classes.star}`} />
                {movieDetail.vote_average.toFixed(2)}/10
              </span>
              <span className={`${classes.detail} d-flex gap-1`}>
                Language :
                <span className={`text-uppercase`}>
                  {movieDetail.original_language}
                </span>
              </span>
              <span className={`${classes.lang}`}>
                {movieDetail.production_countries.name}
              </span>
              <span
                className={`${classes.time} d-flex align-items-center gap-1`}
              >
                Time :<span className="">{movieDetail.runtime} Minute</span>
              </span>
              <span className="d-flex align-items-center gap-1">
                Release Date : <span>{movieDetail.release_date}</span>
              </span>
              <div
                className={`d-flex flex-wrap align-items-center gap-3 mt-3  ${classes.catg}`}
              >
                {movieDetail.genres.map((movie) => (
                  <span className="border rounded-2 px-2 py-1" key={movie.id}>
                    {movie.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`${classes.team} `}>
            <h2
              className={`${classes["similar-title"]} mb-5 pb-3 position-relative`}
            >
              Top Cast
            </h2>

            <div>
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
                breakpoints={{
                  // when window width is >= 640px

                  300: {
                    width: 400,
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  768: {
                    width: 768,
                    slidesPerView: 4,
                  },
                }}
              >
                {filteProfileCast &&
                  filteProfileCast.slice(0, 15).map((cast) => (
                    <SwiperSlide
                      key={cast.id}
                      className={`${classes["cast-slide"]}`}
                    >
                      <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                        alt={`${cast.name}`}
                        className={`${classes["team-img"]} rounded-2 mb-2`}
                        effect="blur"
                      />
                      <div className="text-center">
                        <p className={`${classes.name} m-0`}>{cast.name}</p>
                        <span className={`${classes.character}`}>
                          ({cast.character})
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          {filterSimilarMovie && filterSimilarMovie.length > 0 && (
            <div className="position-relative">
              <h2
                className={`${classes["similar-title"]}  mb-5 pb-3 position-relative`}
              >
                See More
              </h2>

              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode, Navigation]}
                navigation={true}
                className="mySwiper2"
                breakpoints={{
                  // when window width is >= 640px

                  300: {
                    width: 400,
                    slidesPerView: 1,
                  },
                  // when window width is >= 768px
                  768: {
                    width: 768,
                    slidesPerView: 2,
                  },
                }}
              >
                {filterSimilarMovie &&
                  filterSimilarMovie.slice(0, 15).map((movie) => (
                    <SwiperSlide key={movie.id} className={``}>
                      <MovieList movie={movie} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetails;
