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

  async componentDidMount() {
    if (this.props.location.value) {
      try {
        const data = await apiSearch(this.props.location.value);
        this.setState({
          searchArr: data,
          isLoading: true,
          value: this.props.location.value,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => this.setState({ isLoading: false }), 500);
        // this.resetValue();
      }
    }
  }

  // componentDidUpdate() {
  //   if (this.state.searchArr.length > 0) {
  //     this.props.history.push(this.state.value);
  //   }
  // }

  onInput = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = async event => {
    event.preventDefault();
    try {
      const data = await apiSearch(this.state.value);
      this.setState({ searchArr: data, isLoading: true });
      this.props.history.push({
        pathname: this.props.match.url,
        search: `query=${this.state.value}`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => this.setState({ isLoading: false }), 500);
      // this.resetValue();
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
          <MoviesList
            moviesArr={this.state.searchArr}
            value={this.state.value}
          />
        )}
        {/* <Route path={`${this.props.match.path}/:searchName`}></Route> */}
      </>
    );
  }
}

export default Movies;
