import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";


function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
      <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/details/:id">
                Details
              </NavLink>
            </li>
          </ul>
        </nav>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details/:id" exact>
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}

export default App;
