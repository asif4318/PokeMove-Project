import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";

function App() {
  // State variables
  const [searchText, setSearchText] = useState("");
  const [pokemonList, setList] = useState("");
  const [pokemonToDisplay, setPokemonToDisplay] = useState([]);
  const [searchMethod, setSearchMethod] = useState("splaytree");
  const [resultsCount, setResultsCount] = useState(0);
  const [fetchTime, setFetchTime] = useState(0);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  // Function to handle when search bar text changes and update state
  const handleChange = (evt) => {
    const currentVal = evt.target.value.toLowerCase();
    //Get rid of spaces
    const valNoSpaces = currentVal.split(" ").join("");
    setSearchText(valNoSpaces);
  };

  // Update side effects when search text state is updated
  useEffect(() => {
    if (searchText !== "") {
      // If not empty send API request
      fetch(
        `https://asifislam510.pythonanywhere.com/${searchMethod}/moves?name=${searchText}`
      )
        .then((res) => res.json()) // Convert API response to json
        .then((data) => {
          // Parse data
          if (data.status !== 400) {
            let tempList = data.pokemon.split("\n");

            // Update count and fetch time
            setResultsCount(data.count);
            setFetchTime(data.time);
            setList(tempList);
          }

          if (data.count > 0) {
            // Update list of pokemon with fetch results
          } else {
            console.log("NO DATA");
            // Set all to 0/undefined if no results
            setList(undefined);
            setResultsCount(0);
            setFetchTime(0);
          }
        })
        .catch((e) => {
          // Error handling
          console.log(e);
          setList(undefined);
        });
    } else {
      setList(undefined);
      setFetchTime(0);
    }
  }, [searchText, searchMethod]);

  // Update list of displayed pokemon when array index or the results are updated
  useEffect(() => {
    if (pokemonList !== undefined) {
      setPokemonToDisplay([]);
      let temp = [];
      const i_max =
        pokemonList.length > arrayIndex + 50
          ? arrayIndex + 50
          : pokemonList.length;

      // pokemonList.length < arrayIndex + 50 ? pokemonList : arrayIndex + 50;
      for (let i = 0 + arrayIndex; i < i_max; i++) {
        console.log(i_max);
        temp.push(pokemonList[i]);
      }
      setPokemonToDisplay(temp);
    } else {
      // If the search bar is empty
      setResultsCount(0);
      setPokemonToDisplay([]);
    }
  }, [pokemonList, arrayIndex]);

  // Decrement currently viewed page of pokemon
  const decrementPage = () => {
    if (pokemonList === undefined) {
      return;
    }
    if (arrayIndex - 50 >= 0) {
      setArrayIndex(arrayIndex - 50);
      setPageCount(pageCount - 1);
    }
  };

  // Increment currently viewed page of pokemon
  const incrementPage = () => {
    console.log(pokemonList[52]);
    if (pokemonList === undefined) {
      return;
    }
    if (arrayIndex + 50 < pokemonList.length) {
      setArrayIndex(arrayIndex + 50);
      setPageCount(pageCount + 1);
    }
  };

  // Calculate the number of pages of pokemon results
  const numPages = () => {
    if (pokemonList !== undefined) {
      return Math.ceil(pokemonList.length / 50);
    } else {
      return 1;
    }
  };

  const toggleSearchMethod = () => {
    if (searchMethod === "hashmap") {
      setSearchMethod("splaytree");
    } else {
      setSearchMethod("hashmap");
    }
  };

  // Function to return "splaytree" as "Splay Tree" and "hashmap" as "Hash Map"
  const searchMethodAsText = () => {
    if (searchMethod === "splaytree") {
      return "Splay Tree";
    }
    return "Hash Map";
  };

  return (
    <div className="App">
      <h1>PokeMove Dex</h1>
      <div>
        <SearchBar
          onChangeHandler={handleChange}
          searchMethod={searchMethodAsText()}
        />
      </div>
      <div className="buttonBar" style={{ margin: "1%" }}>
        <div>
          <h4>
            {resultsCount} results fetched in {fetchTime} nanoseconds using{" "}
            {searchMethodAsText()} data structure
          </h4>
          <button onClick={toggleSearchMethod}>
            {searchMethod === "hashmap" ? "Hash Map" : "Splay Tree"}
          </button>
        </div>
        <button onClick={() => decrementPage()}>Previous 50</button>
        <span>
          Page {pageCount} of {numPages()}
        </span>
        <button onClick={() => incrementPage()}>Next 50</button>
      </div>
      <div className="pokemon-grid">
        {/*Map each pokemon to a Pokemon Card element */}
        {pokemonToDisplay.map((names, i) => {
          return <PokemonCard pokemon_name={names} key={i} />;
        })}
      </div>
    </div>
  );
}

export default App;
