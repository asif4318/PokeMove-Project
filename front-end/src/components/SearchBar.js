import React, { useState } from "react";
import data from "./names.csv";

const SearchBar = () => {
  const style = {
    width: "25rem",
    height: "2vh",
    background: "#F0F0F0",
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem",
  };

  const [searchText, setSearchText] = useState("");

  const handleChange = (evt) => {
    setSearchText(evt.target.value);
    console.log(searchText);
    getName(searchText);
  };

  const getName = (searchString) => {
    let names;
    fetch(data)
      .then((r) => r.text())
      .then((text) => {
        const rows = text.split("\n");
        names = rows;
      })
      .then(() => {
        console.log(names.filter((element) => element.includes(searchString)));
      });
  };

  return (
    <input
      style={style}
      type="text"
      placeholder="Search Move"
      onChange={handleChange}
    ></input>
  );
};

export default SearchBar;
