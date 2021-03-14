import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';

const AppBar = () => {
  return (
    <header className="header">
      <nav className="menu">
        <NavLink
          exact
          to={routes.home}
          className="link"
          activeClassName="active-link"
        >
          Home
        </NavLink>
        <NavLink
          to={routes.search}
          className="link"
          activeClassName="active-link"
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default AppBar;
