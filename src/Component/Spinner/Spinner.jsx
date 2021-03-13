import React from 'react';
import style from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={style.loader}>
      <div className={style.yellow}></div>
      <div className={style.orange}></div>
      <div className={style.red}></div>
      <div className={style.pink}></div>
      <div className={style.violet}></div>
      <div className={style.mauve}></div>
      <div className={style.lightYellow}></div>
    </div>
  );
};

export default Spinner;
