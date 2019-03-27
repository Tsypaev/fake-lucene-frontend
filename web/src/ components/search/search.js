import React from "react";
import "./search.css";

const Search = ({ setSearchQuery, search, onEnterPress }) => (
  <div className="search">
    <div className='search-wrap'>
      <input
        className="search-input"
        placeholder="Enter your query..."
        onChange={setSearchQuery}
        onKeyDown={onEnterPress}
      />
      <button 
        className="search-button"
        onClick={search}
      >
        Search
      </button>
    </div>
  </div>
);

export default Search;
