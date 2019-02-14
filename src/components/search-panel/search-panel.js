import React from 'react';

import './search-panel.css';

const SearchPanel = ({ onSearchChange, term }) => {
  return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search"
              onChange={ onSearchChange }
              value={ term }/>
  );
};

export default SearchPanel;
