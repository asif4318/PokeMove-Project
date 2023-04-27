import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/PokedexEntry.css";

const PokedexEntry = () => {
  let { state } = useLocation();
  const missingSpriteURL =
    "https://static.wikia.nocookie.net/pokemon/images/b/be/MissingNo.%28Aero%29Sprite.png";

  const [spriteURL, setSpriteURL] = useState("");
  const [moveList, setMoveList] = useState([]);
  const [fetchTime, setFetchTime] = useState(0);
  const [searchMethod, setSearchMethod] = useState("splaytree");

  const getSprite = () => {
    try {
      const temp = state.pokemon_name.split(" ")[0];
      //Smogon api to get image
      setSpriteURL(`https://www.smogon.com/dex/media/sprites/xy/${temp}.gif`);
    } catch (error) {
      setSpriteURL("");
    }
  };

  const fetchMove = () => {
    const searchName =
      state.pokemon_name.split(" ")[0] + state.pokemon_name.split(" ")[1];
    const url =
      `http://127.0.0.1:5000/${searchMethod}/pokemon?name=` + searchName;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          let tempList = data.moves.split("\n");
          setMoveList(tempList);
          setFetchTime(data.time);
        }
      });
  };

  useEffect(() => {
    getSprite();
    fetchMove();
  }, []);

  const switchSearchMethod = () => {
    if (searchMethod === "hashmap") {
      setSearchMethod("splaytree");
    } else {
      setSearchMethod("hashmap");
    }
    fetchMove();
  };

  const getFormattedName = (pokemon_name) => {
    const fname = pokemon_name.split(" ")[0];
    const upperCase = fname.substring(0, 1).toUpperCase() + fname.substring(1);
    return upperCase + " " + pokemon_name.split(" ")[1];
  };

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
            onError={() => setSpriteURL(missingSpriteURL)}
            src={spriteURL}
          ></img>
        </div>
        <div className="information-section">
          <h1>{getFormattedName(state.pokemon_name)}</h1>
          <div class="move-header">
            <h2>Moves</h2>
            <button onClick={switchSearchMethod}>{`Fetch Moves`}</button>
          </div>
          <p>
            {`Results fetched in ${fetchTime} nanoseconds using ${searchMethodAsText()}
            implementation`}
          </p>
          <div className="move-list">
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
