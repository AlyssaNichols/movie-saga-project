import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieDetails from "../MovieDetails/MovieDetails";
import AddMovie from "../AddMovie/AddMovie";
// import EditDetails from "../EditDetails/EditDetails";


// navbar has title
// navbar has links to home, add movie, and details page
// details page will be blank unless a movie is clicked on first
// probably don't need the details link for functionality but I just kept it in for ease to get around
function App() {
  return (
    <div className="App">
      <h1 className="mainHeader"></h1>
      <Router>
        <nav>
          <div className="navbar-title">
            <h1>Movie Saga Project</h1>
          </div>
          <ul>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/addMovie">
                Add Movie
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/details/:id">
                Movie Details
              </NavLink>
            </li>
          </ul>
        </nav>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/addMovie" exact>
          <AddMovie />
        </Route>
        <Route path="/details/:id" exact>
          <MovieDetails />
        </Route>
        {/* <Route path="/edit/:id" exact>
        <EditDetails />
        </Route> */}
      </Router>
    </div>
  );
}

export default App;
