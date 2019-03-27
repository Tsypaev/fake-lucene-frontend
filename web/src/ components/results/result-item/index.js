import React from "react";
import './result-item.css';

const ResultItem = ({ name, year, id }) => (
  <div className='result-item'>
    <p>{id}</p>
    <h1>{name}</h1>
    <p>{year}</p>
  </div>
);

export default ResultItem;
