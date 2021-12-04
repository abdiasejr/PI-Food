import React from "react";

export const SearchBar = ({
  setSearchValue,
}) => {
  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        onChange={onSearchChange}
      />
    </div>
  );
};
