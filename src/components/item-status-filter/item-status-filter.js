import React from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({ currentFilter, onFilterChanged, filters }) => {
  const filterButtons = Object.keys(filters).map((item) => {

    const filter = filters[item];
    let classes = 'btn';

    if (filter === currentFilter) {
      classes += ' btn-info';
    } else {
      classes += ' btn-outline-secondary';
    }

    return (
      <button key={ filter }
              type="button"
              onClick={ () => onFilterChanged(filter) }
              className={ classes }>{ filter }</button>
    );
  });

  return (
    <div className="btn-group">
      { filterButtons }
    </div>
  );
};

export default ItemStatusFilter;
