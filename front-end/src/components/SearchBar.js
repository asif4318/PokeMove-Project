import React, { useState } from "react";

const SearchBar = () => {
  const style = {
    width: "25rem",
    height: "2vh",
    background: "#F0F0F0",
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem",
  };
  return <input style={style} type="text" placeholder="Search Move"></input>;
};

export default SearchBar;
