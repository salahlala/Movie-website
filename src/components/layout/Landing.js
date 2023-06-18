import classes from "./Landing.module.css";
import { useEffect, useState, useContext } from "react";
import { MovieContext } from "../../store/MovieContext";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import { SwiperSlide, Swiper } from "swiper/react";

import { Pagination, Autoplay, Thumbs, Navigation } from "swiper";

const Landing = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { trendingMoviesData, trendingMovie } = useContext(MovieContext);
  let mainSlider = document.querySelectorAll(`.${classes["details"]}`);
  useEffect(() => {
    trendingMoviesData();
  }, [trendingMoviesData]);
  return (
    <div className={`${classes.landing}  position-relative rounded-2`}>
      <Swiper
        spaceBetween={50}
        modules={[Pagination, Navigation, Autoplay, Thumbs]}
        autoplay={{
          delay: 3700,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1200}
        // navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="mySwiper2 rounded-3"
        pagination={true}
        onSlideChange={({ realIndex: r, previousIndex: p }) => {
          if (mainSlider.length > 0) {
            mainSlider.forEach((slide) =>
              slide.classList.remove(classes.active)
            );

            if (!isNaN(r)) {
              mainSlider[r].classList.add(classes.active);
            }
          }
        }}
      >
        {trendingMovie &&
          trendingMovie.slice(0, 7).map((movie) => (
            <SwiperSlide
              key={movie.id}
              className={`${classes["swiper-slide"]} position-relative`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(34,31,31,1) 0%,rgba(34,31,31,0.4) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="container">
                <div className={`${classes.details} px-5`}>
                  <h1 className={`${classes.title} text-capitalize fw-bold`}>
                    {movie.title}
                  </h1>
                  <p className={`mb-4 lh-lg ${classes.desc}`}>
                    {movie.overview.slice(0, 300)}
                  </p>

                  <Link
                    to={`movie/${movie.id}`}
                    className={`${classes.btn} rounded-2 text-capitalize  fw-bold px-lg-3 py-lg-2 px-2 py-1 `}
                  >
                    Show Details
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={5}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Thumbs, Navigation]}
        className="mySwiper mt-3"
      >
        {trendingMovie &&
          trendingMovie.slice(0, 7).map((movie, ix) => (
            <SwiperSlide key={ix}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt="..."
                className={`${classes["swiper-img"]}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Landing;
