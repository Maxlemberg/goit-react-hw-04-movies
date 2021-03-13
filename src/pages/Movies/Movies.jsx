import React, { Component } from 'react';
import { apiSearch } from '../../apiUtils/apiMovie';
import MoviesList from '../../Component/List';
import Spinner from '../../Component/Spinner';
import styles from './Movie.module.css';

class Movies extends Component {
  state = {
    searchArr: [],
    value: '',
    isLoading: false,
  };
  onInput = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = async event => {
    event.preventDefault();
    try {
      const data = await apiSearch(this.state.value);
      this.setState({ searchArr: data, isLoading: true });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => this.setState({ isLoading: false }), 1000);
      this.resetValue();
    }
  };

  resetValue = () => {
    this.setState({ value: '' });
  };

  render() {
    return (
      <>
        <form>
          <input
            className={styles.input}
            placeholder="Search Movie"
            type="text"
            value={this.state.value}
            onInput={this.onInput}
          />
          <button
            className={styles.button}
            type="submit"
            onClick={this.onSubmit}
          >
            Пошук
          </button>
        </form>
        {this.state.isLoading && <Spinner />}
        {this.state.searchArr && !this.state.isLoading && (
          <ul className={styles.list}>
            <MoviesList
              moviesArr={this.state.searchArr}
              url={this.props.match.url}
            />
          </ul>
        )}
      </>
    );
  }
}

export default Movies;