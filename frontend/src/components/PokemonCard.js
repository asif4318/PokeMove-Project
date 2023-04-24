import React, { useState, useEffect } from "react";

const PokemonCard = ({ pokemon_name }) => {
  const [spriteURL, setSpriteURL] = useState("");

  const style = {
    display: "flex",
    background: "#F0F0F0",
    border: "none",
    borderRadius: "8px",
    padding: "4rem",
    margin: "2rem",
  };

  const getSprite = () => {
    try {
      const temp = pokemon_name.split(" ")[0];
      fetch(`https://pokeapi.co/api/v2/pokemon/${temp}`)
        .then((res) => res.json())
        .then((data) => setSpriteURL(data.sprites.front_default));
    } catch (error) {
      setSpriteURL("");
    }
  };

  const capitalizeName = (nameToCapitalize) => {
    try {
      const temp = nameToCapitalize.split(" ");
      const firstName = temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
      const lastName = temp[1];
      console.log(firstName + " " + lastName);
      return `${firstName} ${lastName}`;
    } catch (error) {
      console.log("Error: name undefined");
      return "";
    }
  };

  useEffect(() => {
    getSprite();
  }, [pokemon_name]);

  return (
    <div>
      <h2 style={{ margin: "0.5rem" }}>{capitalizeName(pokemon_name)}</h2>
      <img src={spriteURL}></img>
    </div>
  );
};

export default PokemonCard;
