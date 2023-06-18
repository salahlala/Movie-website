import { useState, useContext } from "react";
import classes from "./Header.module.css";
import { BiSearch } from "react-icons/bi";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { MovieContext } from "../../store/MovieContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = () => {
  // const [searchValue, setSearchValue] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const { handleOpenNav, handleSearchValue, searchValue } =
    useContext(MovieContext);
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim().length === 0) return;

    navigate(`/search/${searchValue}/page/1`);
    handleSearchValue("");
  };

  // const handleOpenNavbar = () => {
  //   setNavOpen(true);
  // };
  const handleCloseNavbar = () => {
    setNavOpen(false);
  };
  return (
    <div className={`${classes["main-header"]} d-flex  align-items-center`}>
      <div className="container ">
        <div className="row ">
          <div className="col-12 col-md-4 d-flex align-items-center">
            <Link
              className={`${classes.title} text-uppercase px-3 fw-semibold`}
              to={"/"}
            >
              Cimahub
            </Link>
          </div>
          <div
            className={`col-12 col-md-8 justify-content-center justify-content-md-end  d-lg-flex d-md-none align-items-center ${
              classes.navbar
            } ${navOpen && classes.active}`}
          >
            <form
              onSubmit={handleSearchSubmit}
              className={`${classes["search-form"]} ms-3 position-relative`}
            >
              <input
                placeholder="Search movies"
                className="border rounded-4 fw-semibold px-4 py-2"
                onChange={(e) => handleSearchValue(e.target.value)}
                value={searchValue}
              />
              <button type="submit" className={`border-0`}>
                <BiSearch className={`position-absolute ${classes.icon}`} />
              </button>
            </form>

            <AiOutlineClose
              className={`${classes.close}`}
              onClick={handleCloseNavbar}
            />
          </div>
          <div className="">
            <HiBars3CenterLeft
              className={`${classes.open}`}
              onClick={handleOpenNav}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
