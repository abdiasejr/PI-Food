import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import './SearchBar.css';
import { useDispatch, useSelector } from "react-redux";
import { findRecipe } from "../actions";
import { useNavigate } from "react-router";

export const SearchBar = ({
  setSearchValue,
  searchValue,
}) => {
  let search = useSelector(state => state.search);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
    if(e.keyCode === 13) {
      dispatch(findRecipe(e.target.value));
    }
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
    dispatch(findRecipe(searchValue));
  };

  useEffect(() => {
    if(searchValue.length > 0) {
      navigate(`${search.id}`);
    }
  }, [search]);

  return (
    <div className="search-bar">
      <input
        className="search-bar_input"
        type="text"
        placeholder={""}
        onKeyDown={onSearchChange}
      />
        <button
          className="search-bar_button"
          onClick={onSearchSubmit}
        >
          <BiSearch className="search-bar_icon" />
        </button>
    </div>
  );
};
