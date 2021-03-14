import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import style from './List.module.css';

const MoviesList = ({ moviesArr = [], location }) => {
  const arr = moviesArr.map(movie => (
    <li className={style.item} key={movie.id}>
      <NavLink
        className={style.link}
        to={{
          pathname: `movies/${movie.id}`,
          state: {
            from: location,
          },
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt=""
        />
        <p>{movie.title ? movie.title : movie.name}</p>
      </NavLink>
    </li>
  ));
  //console.log(arr);
  return <ul className={style.list}>{arr}</ul>;
};

export default withRouter(MoviesList);
