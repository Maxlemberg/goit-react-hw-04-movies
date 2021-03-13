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
      const { movieId } = this.props.match.params;
      const response = await apiReviews(movieId);
      this.setState({
        items: [...response],
        isLoading: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
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

    return this.state.items.length > 0 ? (
      <ul className={style.list}>{listItem}</ul>
    ) : (
      <h1 className={style.title}> Whoops Error</h1>
    );

    // this.state.isLoading && (
    //   <Spinner />
    // );
  }
}

export default Reviews;
