import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './List.module.css';

const MoviesList = ({ moviesArr = [], url }) => {
  const arr = moviesArr.map(movie => (
    <li className={style.list} key={movie.id}>
      <NavLink
        className={style.link}
        to={url === '/' ? `movies/${movie.id}` : `${url}/${movie.id}`}
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
  return arr;
};

export default MoviesList;
