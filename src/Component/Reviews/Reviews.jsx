import React, { Component } from 'react';
import { apiReviews } from '../../apiUtils/apiMovie';
import Spinner from '../Spinner';
import style from './Reviews.module.css';

class Reviews extends Component {
  state = {
    items: [],
    isLoading: false,
  };
  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const { movieId } = this.props.match.params;
      const response = await apiReviews(movieId);
      this.setState({
        items: [...response],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => this.setState({ isLoading: false }), 500);
    }
  }

  render() {
    const listItem = this.state.items.map(({ id, author, content }) => {
      return (
        <li className={style.item} key={id}>
          <h2>Author: {author}</h2>
          <p>{content}</p>
        </li>
      );
    });

    let list;
    if (this.state.items.length > 0) {
      list = [...listItem];
    } else {
      list = (
        <li>
          <h2 className={style.title}>Whoops Error</h2>
        </li>
      );
    }
    return this.state.isLoading ? (
      <Spinner />
    ) : (
      <ul className={style.list}>{list}</ul>
    );
  }
}

export default Reviews;
