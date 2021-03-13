import React, { Component } from 'react';
import MoviesList from '../../Component/List';
import { apiMovies } from '../../apiUtils/apiMovie';
import Spinner from '../../Component/Spinner';
import style from './HomePage.module.css';

class Home extends Component {
  state = {
    movies: [],
    spinner: false,
  };

  async componentDidMount() {
    try {
      const movies = await apiMovies();
      this.setState({ movies: movies, spinner: true });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ spinner: false });
    }
  }

  render() {
    return (
      <>
        <h1 className={style.title}>Головна</h1>
        {this.state.spinner ? (
          <Spinner />
        ) : (
          <ul className={style.list}>
            <MoviesList
              moviesArr={this.state.movies}
              url={this.props.match.url}
            />
          </ul>
        )}
      </>
    );
  }
}

export default Home;
