import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";

const Test = ({ text }) => {
  return <p>{text}</p>;
};

function App() {
  const [searchText, setSearchText] = useState("");
  const [pokemonList, setList] = useState("");
  const [splitList, setSplitList] = useState([]);

  const handleChange = (evt) => {
    setSearchText(evt.target.value);
    // fetch(`http://localhost:5000/hashmap?move=${evt.target.value}/`, {
    //   method: "get",
    //   mode: "cors",
    // }).then((response) => console.log(response));
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/hashmap?move=${searchText}`)
      .then((res) => res.json())
      .then((data) => setList(data.pokemon));
  }, [searchText]);

  useEffect(() => {
    if (pokemonList !== undefined) {
      setSplitList(pokemonList.split("\n"));
    }
  }, [pokemonList]);

  return (
    <div className="App">
      <h1>PokeMove Dex</h1>
      <SearchBar onChangeHandler={handleChange} />
      <Test text={splitList[0]}></Test>
    </div>
  );
}

export default App;
