import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PokedexEntry = () => {
  let { state } = useLocation();

  const [spriteURL, setSpriteURL] = useState("");
  const [moveList, setMoveList] = useState([]);

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
    const url = `http://127.0.0.1:5000/hashmap/pokemon?name=` + searchName;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let tempList = data.moves.split("\n");
        setMoveList(tempList);
      });
  };

  useEffect(() => {
    getSprite();
    fetchMove();
  }, []);

  const getFormattedName = (pokemon_name) => {
    const fname = pokemon_name.split(" ")[0];
    const upperCase = fname.substring(0, 1).toUpperCase() + fname.substring(1);
    return upperCase + " " + pokemon_name.split(" ")[1];
  };

  const capitalize = (word) =>
    word.substring(0, 1).toUpperCase() + word.substring(1);

  return (
    <div>
      <h1>{getFormattedName(state.pokemon_name)}</h1>
      <img src={spriteURL}></img>
      {moveList.map((elem) => {
        return <p>{capitalize(elem)}</p>;
      })}
    </div>
  );
};

export default PokedexEntry;
