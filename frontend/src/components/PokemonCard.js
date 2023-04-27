import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        background: "gray",
        background:
          "radial-gradient(circle, rgba(148,187,233,1) 0%, rgba(204,202,244,1) 100%)",
      }}
      className="pokemon-card"
    >
      <h2>
        <Link
          to={`/card/${pokemon_name}`}
          state={{ pokemon_name: pokemon_name }}
        >
          {capitalizeName(pokemon_name)}
        </Link>
      </h2>
      <img src={spriteURL}></img>
    </div>
  );
};

export default PokemonCard;
