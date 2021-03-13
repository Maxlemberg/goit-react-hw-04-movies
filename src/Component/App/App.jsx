import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import Home from '../../pages/Home/HomePage';
import MovieDetails from '../../pages/MovieDetails/MovieDetails';
import Movies from '../../pages/Movies';
import NotFound from '../../pages/NotFound/Notfound';

import '../../styles/base.css';

//className="link" activeClassName="active-link"

const App = () => {
  return (
    <>
      <ul className="list">
        <li>
          <NavLink exact to="/" className="link" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className="link" activeClassName="active-link">
            Movies
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies/:movieId" component={MovieDetails} />
        <Route path="/movies" component={Movies} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
