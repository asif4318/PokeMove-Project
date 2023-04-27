import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PokedexEntry = () => {
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
    console.log("URL: " + url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let tempList = data.moves.split("\n");
        setMoveList(tempList);
        //console.log(tempList);
        // for (let i = 0; i < tempList.length; i++) {
        //   const wordRegex = /[A-Z}[a-z\[A-Z]?[a-z\-]+|[0-9]+|[A-Z]/gm;
        //   const string = tempList[i];
        //   const result = string.match(wordRegex);
        //   tempList[i] = result[0] + " " + result[1];
        // }
        // setList(tempList);
      });
  };

  useEffect(() => {
    getSprite();
    fetchMove();
  });

  let { state } = useLocation();
  return (
    <div>
      <h1>{state.pokemon_name}</h1>
      <img src={spriteURL}></img>
      {moveList.map((elem) => {
        return <p>{elem}</p>;
      })}
    </div>
  );
};

export default PokedexEntry;
