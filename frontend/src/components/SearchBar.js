import React, { useState } from "react";
import "./css/SearchBar.css";

const SearchBar = ({ onChangeHandler, searchMethod }) => {
  return (
    <input
      type="text"
      placeholder={`Search for Moves using ${searchMethod} data structure`}
      onChange={onChangeHandler}
    ></input>
  );
};

export default SearchBar;
