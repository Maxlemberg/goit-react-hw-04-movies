import React, { Component } from 'react';
import { apiCast } from '../../apiUtils/apiMovie';
import Spinner from '../Spinner';
import style from '../../Component/Cast/Cast.module.css';

class Cast extends Component {
  state = {
    cast: [],
    isLoader: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoader: true });
      const response = await apiCast(this.props.match.params.movieId);
      this.setState({ cast: response });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => this.setState({ isLoader: false }), 500);
    }
  }

  render() {
    const { cast } = this.state;
    const castArr = cast.map(({ name, character, profile_path, id }) => {
      let avatar;
      profile_path
        ? (avatar = `https://image.tmdb.org/t/p/w200/${profile_path}`)
        : (avatar =
            'https://www.flaticon.com/svg/static/icons/svg/3784/3784184.svg');
      return (
        <li key={id} className={style.item}>
          <img src={avatar} alt="" width="200" />
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      );
    });
    let castItems;
    castArr.length > 0
      ? (castItems = [...castArr])
      : (castItems = (
          <li>
            <h2 className={style.title}>Whoops Error</h2>
          </li>
        ));

    return this.state.isLoader ? (
      <Spinner />
    ) : (
      <ul className={style.list}>{castItems}</ul>
    );
  }
}

export default Cast;
