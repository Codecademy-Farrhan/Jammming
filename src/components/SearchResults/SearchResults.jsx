import React from 'react';
import '../SearchBar/SearchBar';
import './SearchResults.css';

const SearchResults = ({ searchData }) => {
    return (
      <div className="search-results">
        {results.map(result => (
          <div key={result.id}>
          </div>
        ))}
      </div>
    );
  };
  
  export default SearchResults;
