import React, { useState } from "react";
import "./css/SearchBar.css";

const SearchBar = ({ onChangeHandler, isSmallScreen }) => {
  return (
    <input
      type="text"
      placeholder="Search Move"
      onChange={onChangeHandler}
    ></input>
  );
};

export default SearchBar;
