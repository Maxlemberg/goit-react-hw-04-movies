import React, { Component } from 'react';
import { apiCast } from '../../apiUtils/apiMovie';
import Spinner from '../Spinner';
import style from '../../Component/Cast/Cast.module.css';

class Cast extends Component {
  state = {
    cast: [],
    loader: false,
  };

  async componentDidMount() {
    try {
      const response = await apiCast(this.props.match.params.movieId);
      this.setState({ cast: response, loader: true });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loader: false });
    }
  }

  render() {
    const { cast } = this.state;
    const castArr = cast.map(({ name, character, profile_path, id }) => {
      return (
        <li key={id} className={style.item}>
          <img src={`https://image.tmdb.org/t/p/w200/${profile_path}`} alt="" />
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      );
    });
    return this.state.loader ? (
      <Spinner />
    ) : (
      <ul className={style.list}>{castArr}</ul>
    );
  }
}

export default Cast;
