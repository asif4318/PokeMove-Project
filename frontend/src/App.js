import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [searchText, setSearchText] = useState("");
  const [pokemonList, setList] = useState("");
  const [firstTen, setFirstTen] = useState([]);

  const handleChange = (evt) => {
    setSearchText(evt.target.value);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/hashmap?move=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        let tempList = data.pokemon.split("\n");
        for (let i = 0; i < tempList.length; i++) {
          const wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
          const string = tempList[i];
          const result = string.match(wordRegex);
          tempList[i] = result[0] + " " + result[1];
        }
        setList(tempList);
      });
  }, [searchText]);

  useEffect(() => {
    if (pokemonList !== undefined) {
      console.log(pokemonList[0]);
      setFirstTen([]);
      let temp = [];
      const i_max = pokemonList.length < 10 ? pokemonList : 10;
      for (let i = 0; i < i_max; i++) {
        {
          console.log(i_max);
          temp.push(pokemonList[i]);
        }
      }
      setFirstTen(temp);
    }
  }, [pokemonList]);

  return (
    <div className="App">
      <h1>PokeMove Dex</h1>
      <SearchBar onChangeHandler={handleChange} />
      <div
        style={{
          display: "flex-box",
          flexWrap: "wrap",
          padding: "0.5rem",
          marginTop: "1rem",
          marginBottom: "1rem",
          marginLeft: "4rem",
          marginRight: "4rem",
        }}
      >
        {firstTen.map((names) => {
          return <PokemonCard pokemon_name={pokemonList[0]} />;
        })}
      </div>
    </div>
  );
}

export default App;
