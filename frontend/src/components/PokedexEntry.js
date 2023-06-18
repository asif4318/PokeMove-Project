import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/PokedexEntry.css";

// The Page that loads when a pokemon is clicked
const PokedexEntry = () => {
  let { state } = useLocation();
  const missingSpriteURL =
    "https://static.wikia.nocookie.net/pokemon/images/b/be/MissingNo.%28Aero%29Sprite.png";

  const [spriteURL, setSpriteURL] = useState("");
  const [moveList, setMoveList] = useState([]);
  const [fetchTime, setFetchTime] = useState(0);
  const [searchMethod, setSearchMethod] = useState("splaytree");

  // Function to set sprite
  const getSprite = () => {
    const temp = state.pokemon_name.split(" ")[0];
    //Smogon api to get image
    setSpriteURL(`https://www.smogon.com/dex/media/sprites/xy/${temp}.gif`);
  };

  // Fetch the list of moves from backend api
  const fetchMove = () => {
    const searchName = state.pokemon_name;
    const url =
      `https://asifislam510.pythonanywhere.com/${searchMethod}/pokemon?name=` +
      searchName;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // if OK
          let tempList = data.moves.split("\n");
          setMoveList(tempList);
          setFetchTime(data.time);
        } else {
          // if error
          setMoveList([]);
          setFetchTime(0);
        }
      });
  };

  useEffect(() => {
    getSprite();
    fetchMove();
  }, []);

  // Toggle between API endpoints
  const switchSearchMethod = () => {
    if (searchMethod === "hashmap") {
      setSearchMethod("splaytree");
    } else {
      setSearchMethod("hashmap");
    }
    fetchMove();
  };

  // split names (Ex: pikachuAlan => Pikachu Alan)
  const getFormattedName = (pokemon_name) => {
    return capitalize(pokemon_name);
  };

  // Capitalize the first letter of the word
  const capitalize = (word) =>
    word.substring(0, 1).toUpperCase() + word.substring(1);

  // Function to return "splaytree" as "Splay Tree" and "hashmap" as "Hash Map"
  const searchMethodAsText = () => {
    if (searchMethod === "splaytree") {
      return "Splay Tree";
    }
    return "Hash Map";
  };

  return (
    <div>
      <div className="pokedex-layout">
        <div>
          <img
            className="pokemon-sprite-large"
            src={spriteURL}
            onLoad={() => {
              getSprite();
            }}
            onError={() => setSpriteURL(missingSpriteURL)}
          ></img>
        </div>
        <div className="information-section">
          <h1>{getFormattedName(state.pokemon_name)}</h1>
          <div className="move-header">
            <h2>Moves</h2>
            <button onClick={switchSearchMethod}>{`Fetch Moves`}</button>
          </div>
          <p>
            {`Results fetched in ${fetchTime} nanoseconds using ${searchMethodAsText()}
            implementation`}
          </p>
          <div className="move-list">
            {/**Map each move to a link */}
            {moveList.map((elem, i) => {
              return (
                <a
                  href={`https://www.smogon.com/dex/ss/moves/${elem}/`}
                  key={i}
                  className="moveEntry"
                >
                  <p>{capitalize(elem)}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexEntry;
