import React from "react";
import './SortList.css';

export const SortList = ({
  setSortValue,
}) => {
  const onSortChange = (e) => {
    setSortValue(e.target.value);
  };

  return (
    <div className="body_select">
      <select className="sort-select" onChange={onSortChange}>
        <option value="">Sort by</option>
        <option value="title alphabetically">A-Z</option>
        <option value="healthScore higher">Highest Score</option>
        <option value="healthScore lower">Lowest Score</option>
        <option value="title reversed">Z-A</option>
      </select>
    </div>
  );
};
