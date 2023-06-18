import { useState, useEffect, useContext } from "react";
import classes from "./SecondNavBar.module.css";
import useHttp from "../../hooks/use-http";
import { Menu, MenuItem, Button } from "@mui/material";
import { MovieContext } from "../../store/MovieContext";
const SecondNavBar = () => {
  const [categori, setCategori] = useState();
  const { sendRequest } = useHttp();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectValue, setSelectValue] = useState("");
  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData } =
    useContext(MovieContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const sendData = (data) => {
      const movieData = data.genres;
      const loadedMovie = [];
      for (let key in movieData) {
        loadedMovie.push(movieData[key]);
      }
      setCategori(loadedMovie);
    };
    sendRequest(
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
  }, [sendRequest]);
  const ITEM_HEIGHT = 48;

  const handleChange = (event) => {
    setSelectValue(event.target.innerText);
  };
  return (
    <div className={`${classes.navbar} py-3 mb-4 `}>
      <div className="container d-flex justify-content-between">
        <div className="d-flex gap-3 align-items-center">
          <div>
            <div onClick={handleClick}>open</div>
            <Menu
              id="long-menu"
              value={selectValue}
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {categori &&
                categori.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    onClick={(e) => {
                      handleClose(e);
                      handleChange(e);
                    }}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
            </Menu>
          </div>
          <div>
            <div onClick={handleClick}>open</div>
            <Menu
              id="long-menu"
              value={selectValue}
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {categori &&
                categori.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    onClick={(e) => {
                      handleClose(e);
                      handleChange(e);
                    }}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <Button variant="outlined" onClick={popularMoviesData}>
            Popular
          </Button>
          <Button variant="outlined" onClick={topRatedMoviesData}>
            Top Rated
          </Button>
          <Button variant="outlined" onClick={upcomingMoviesData}>
            Upcoming
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecondNavBar;
