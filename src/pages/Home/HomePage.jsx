import React, { Component } from 'react';
import MoviesList from '../../Component/List';
import { apiMovies } from '../../apiUtils/apiMovie';
import Spinner from '../../Component/Spinner';
import style from './HomePage.module.css';

class Home extends Component {
  state = {
    movies: [],
    isLoader: false,
  };

  async componentDidMount() {
    try {
      const movies = await apiMovies();
      this.setState({ movies: movies, isLoader: true });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => this.setState({ isLoader: false }), 500);
    }
  }

  render() {
    return (
      <>
        <h1 className={style.title}>Головна</h1>
        {this.state.isLoader ? (
          <Spinner />
        ) : (
          <MoviesList moviesArr={this.state.movies} />
        )}
      </>
    );
  }
}

export default Home;
