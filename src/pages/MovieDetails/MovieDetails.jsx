import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { apiMovieDetails } from '../../apiUtils/apiMovie';
import Cast from '../../Component/Cast/Cast';
import Reviews from '../../Component/Reviews/Reviews';
import Spinner from '../../Component/Spinner';
import style from './MovieDetails.module.css';
import routes from '../../routes';

class MovieDetails extends Component {
  state = {
    movie: {},
    genres: [],
    isLoading: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const { movieId } = this.props.match.params;
      const details = await apiMovieDetails(movieId);
      this.setState({
        movie: details,
        genres: details.genres,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => this.setState({ isLoading: false }), 500);
    }
  }
  genresList = data => {
    const genresArr = data.map(genre => {
      return (
        <li className={style.text} key={genre.id}>
          <span role="img" aria-label="face emoji">
            💯
          </span>
          {genre.name}
        </li>
      );
    });
    return genresArr;
  };

  handleGoBack = () => {
    const { location, history } = this.props;
    history.push(location.state?.from?.pathname || routes.home);
  };

  render() {
    const { poster_path, title, vote_average, overview } = this.state.movie;
    const UrlImg = `https://image.tmdb.org/t/p/w200${poster_path}`;
    const genreData = this.genresList(this.state.genres);

    return this.state.isLoading ? (
      <Spinner />
    ) : (
      <>
        <div className={style.wraper}>
          <button
            className={style.button}
            type="button"
            onClick={this.handleGoBack}
          >
            Go back
          </button>
          <div className={style.container}>
            <img className={style.img} src={UrlImg} alt="" />
            <section className={style.section}>
              <h2 className={style.text}>{title}</h2>
              <p className={style.text}> User Score: {vote_average * 10}% </p>
              <h3 className={style.text}>Overview</h3>
              <p className={style.text}>{overview}</p>
              <h3 className={style.text}>Genres</h3>
              <ul className={style.list}>{genreData}</ul>
            </section>
          </div>
          <div>
            <h3 className={style.titleText}>Additional Information</h3>
            <ul className={style.genres}>
              <li>
                <NavLink
                  className={style.li}
                  activeClassName={style.active}
                  to={{
                    pathname: `${this.props.match.url}/credits`,
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={style.li}
                  activeClassName={style.active}
                  to={{
                    pathname: `${this.props.match.url}/reviews`,
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Route
          path={`${this.props.match.path}/credits`}
          component={Cast}
        ></Route>
        <Route
          path={`${this.props.match.path}/reviews`}
          component={Reviews}
        ></Route>
      </>
    );
  }
}

export default MovieDetails;
