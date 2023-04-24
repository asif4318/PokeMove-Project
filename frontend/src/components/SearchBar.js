import React from "react";

const SearchBar = ({ onChangeHandler }) => {
  const style = {
    width: "25rem",
    height: "2vh",
    background: "#F0F0F0",
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem",
  };

  return (
    <input
      style={style}
      type="text"
      placeholder="Search Move"
      onChange={onChangeHandler}
    ></input>
  );
};

export default SearchBar;
