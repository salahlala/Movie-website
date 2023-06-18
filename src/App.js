import classes from "./App.module.css";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import SideNavbar from "./components/layout/SideNavbar";
import { Route, Routes } from "react-router-dom";
import Browse from "./components/Movies/MovieCategories/Browse";
import { lazy, Suspense } from "react";

const ComingSoon = lazy(() =>
  import("./components/Movies/MovieCategories/ComingSoon")
);
const MovieDetails = lazy(() => import("./components/Movies/MovieDetails"));
const SearchMovie = lazy(() => import("./components/Movies/SearchMovie"));
const NotFound = lazy(() => import("./components/layout/NotFound"));

function App() {
  return (
    <>
      <div className="row m-0 p-0">
        <Header />
        <SideNavbar />
        <Suspense
          fallback={
            <div className={`col-lg-10 text-center ${classes.loading}`}>
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/coming-soon/page/:pageNum" element={<ComingSoon />} />
            <Route path="movie/:movieId" element={<MovieDetails />} />
            <Route
              path="/search/:searchQuery/page/:numPage"
              element={<SearchMovie />}
            />
            <Route path="/browse/page/:num?/:sort?" element={<Browse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
export default App;
