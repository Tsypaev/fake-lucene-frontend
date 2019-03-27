import React from "react";
import ResultItem from "./result-item";
import './results.css';

const Results = ({ results }) => (
  <div className='results'>
  {results ?
    results.length ? 
      results.map(result => 
      <ResultItem 
        key={result.id} 
        {...result} 
      />
    ) : <h1>Ничего не найдено</h1> : null}
  </div>
);

export default Results;
