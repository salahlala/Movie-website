import classes from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={`col-lg-10 ${classes.main}`}>
      <div className="container text-center">
        <h1 className={`${classes.title}`}>404</h1>
        <p className={`${classes.desc}`}>Oops! Page not found</p>
        <span
          className={`${classes.btn} px-3 py-2 rounded-2 text-uppercase`}
          onClick={() => navigate("/")}
        >
          Back to home
        </span>
      </div>
    </div>
  );
};

export default NotFound;
