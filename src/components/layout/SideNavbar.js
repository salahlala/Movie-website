import classes from "./SideNavbar.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { MovieContext } from "../../store/MovieContext";
import { BiSearch } from "react-icons/bi";
import { useNavigate, NavLink } from "react-router-dom";
const SideNavbar = () => {
  const { isOpen, handleCloseNav, handleSearchValue, searchValue } =
    useContext(MovieContext);

  const navigate = useNavigate();
  // useEffect(() => {
  // }, [handleSearchRequest]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchValue}/page/1`);
    handleSearchValue("");
    handleCloseNav();
  };

  return (
    <div
      className={`col-lg-2 ${isOpen && classes.active}  ${
        classes["main-nav"]
      } pt-4 p-0 m-0 `}
    >
      <div className={``}>
        <h4 className={`mb-3 text-white-50 fw-smibold px-3`}>News Feed</h4>
        <ul className={`${classes.list} m-0 mx-3 p-0 d-flex flex-column gap-3`}>
          <NavLink
            to={`/browse/page/1`}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? `${classes.activeLink}` : ""
            }
            onClick={() => handleCloseNav()}
          >
            <li className={`position-relative px-3 py-2 rounded-2`}>Browse</li>
          </NavLink>
          <NavLink
            to={"/coming-soon/page/1"}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? `${classes.activeLink}` : ""
            }
            onClick={() => handleCloseNav()}
          >
            <li className={`position-relative px-3 py-2 rounded-2`}>
              Coming Soon
            </li>
          </NavLink>
        </ul>
      </div>

      <form
        onSubmit={handleSearchSubmit}
        className={`${classes["search-form"]} mt-3 ms-3 position-relative`}
      >
        <input
          placeholder="Search movies"
          className="border rounded-4 fw-semibold px-4 py-2"
          onChange={(e) => handleSearchValue(e.target.value)}
          value={searchValue}
        />
        <button
          type="submit"
          className={`border-0 position-absolute  ${classes.search}`}
        >
          <BiSearch className={`${classes.icon}`} />
        </button>
      </form>

      <AiOutlineClose className={`${classes.close}`} onClick={handleCloseNav} />
    </div>
  );
};

export default SideNavbar;
