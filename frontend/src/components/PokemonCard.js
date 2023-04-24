import React, { useState, useEffect } from "react";

const PokemonCard = ({ pokemon_name }) => {
  const [spriteURL, setSpriteURL] = useState("");

  const getSprite = () => {
    try {
      const temp = pokemon_name.split(" ")[0];
      //Smogon api to get image
      setSpriteURL(`https://www.smogon.com/dex/media/sprites/xy/${temp}.gif`);
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
    <div
      style={{
        border: "2px",
        borderRadius: "10px",
        borderColor: "black",
        background: "gray",
        margin: "1%",
      }}
    >
      <h2>{capitalizeName(pokemon_name)}</h2>
      <img src={spriteURL}></img>
    </div>
  );
};

export default PokemonCard;
