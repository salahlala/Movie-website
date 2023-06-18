import Landing from "./Landing";
import Header from "./Header";
import NowPlaying from "../Movies/MovieCategories/NowPlaying";
import TopRated from "../Movies/MovieCategories/TopRated";
import PopularMovie from "../Movies/MovieCategories/PopularMovie";
const Main = () => {
  return (
    <div className="col-lg-10 col-md-12 mt-5 mt-lg-4 pt-lg-0 pt-5 m-0 p-0">
      <div className="container">
        {/* <Header /> */}
        <Landing />
        <NowPlaying />
        <TopRated />
        <PopularMovie />
      </div>
    </div>
  );
};

export default Main;
