import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppBar from '../AppBar';
import routes from '../../routes';
import '../../styles/base.css';
import Spinner from '../Spinner';

const Home = lazy(() =>
  import('../../pages/Home/HomePage' /* webpackChunkName: "home-page" */),
);
const Movies = lazy(() =>
  import('../../pages/Movies' /* webpackChunkName: "search-movie" */),
);
const MovieDetails = lazy(() =>
  import(
    '../../pages/MovieDetails/MovieDetails' /* webpackChunkName: "movie-details" */
  ),
);

const App = () => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route path={routes.movieDetail} component={MovieDetails} />
          <Route path={routes.search} component={Movies} />
          <Redirect to={routes.home} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
