import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [searchText, setSearchText] = useState("");
  const [pokemonList, setList] = useState("");
  const [firstTen, setFirstTen] = useState([]);
  const [apiURL, setApiURL] = useState(
    "http://127.0.0.1:5000/splaytree/moves?name="
  );
  const [resultsCount, setResultsCount] = useState(0);
  const [fetchTime, setFetchTime] = useState(0);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const handleChange = (evt) => {
    setSearchText(evt.target.value);
  };

  useEffect(() => {
    if (searchText != "") {
      fetch(apiURL + searchText)
        .then((res) => res.json())
        .then((data) => {
          let tempList = data.pokemon.split("\n");
          console.log(tempList);
          for (let i = 0; i < tempList.length; i++) {
            const wordRegex = /[A-Z}[a-z\[A-Z]?[a-z\-]+|[0-9]+|[A-Z]/gm;
            const string = tempList[i];
            const result = string.match(wordRegex);
            tempList[i] = result[0] + " " + result[1];
          }
          setResultsCount(data.count);
          setFetchTime(data.time);
          if (data.count > 0) {
            setList(tempList);
          } else {
            setList(undefined);
          }
        })
        .catch((e) => {
          console.log(e);
          setList(undefined);
        });
    } else {
      setList(undefined);
      setFetchTime(0);
    }
  }, [searchText]);

  useEffect(() => {
    if (pokemonList !== undefined) {
      console.log(pokemonList[0]);
      setFirstTen([]);
      let temp = [];
      const i_max =
        pokemonList.length < arrayIndex + 50 ? pokemonList : arrayIndex + 50;
      for (let i = 0 + arrayIndex; i < i_max; i++) {
        console.log(i_max);
        temp.push(pokemonList[i]);
      }
      setFirstTen(temp);
      console.log(temp);
    } else {
      setResultsCount(0);
    }
  }, [pokemonList, arrayIndex]);

  const decrementPage = () => {
    if (arrayIndex - 50 > 0) {
      setArrayIndex(arrayIndex - 50);
      setPageCount(pageCount - 1);
    }
  };
  const incrementPage = () => {
    if (arrayIndex + 50 < pokemonList.length) {
      setArrayIndex(arrayIndex + 50);
      setPageCount(pageCount + 1);
    }
  };
  const numPages = () => {
    if (pokemonList != undefined) {
      return Math.ceil(pokemonList.length / 50);
    } else {
      return 1;
    }
  };

  return (
    <div className="App">
      <h1>PokeMove Dex</h1>
      <div>
        <SearchBar onChangeHandler={handleChange} />
      </div>
      <div className="buttonBar" style={{ margin: "1%" }}>
        <div>
          <h4>
            {resultsCount} results fetched in {fetchTime}s
          </h4>
          <button>Pokemon/Move</button>
        </div>
        <button onClick={() => decrementPage()}>Previous 50</button>
        <span>
          Page {pageCount} of {numPages()}
        </span>
        <button onClick={() => incrementPage()}>Next 50</button>
      </div>
      <div className="pokemon-grid">
        {firstTen.map((names) => {
          return <PokemonCard pokemon_name={names} />;
        })}
      </div>
    </div>
  );
}

export default App;
