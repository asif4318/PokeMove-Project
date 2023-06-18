import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon_name }) => {
  const [spriteURL, setSpriteURL] = useState("");
  const missingSpriteURL =
    "https://static.wikia.nocookie.net/pokemon/images/b/be/MissingNo.%28Aero%29Sprite.png";

  const getSprite = () => {
    try {
      const temp = pokemon_name.split(" ")[0];
      //Smogon api to get image
      setSpriteURL(`https://www.smogon.com/dex/media/sprites/xy/${temp}.gif`);
    } catch (error) {
      setSpriteURL("");
    }
  };

  // Capitalize the first letter of the word
  const capitalize = (word) =>
    word.substring(0, 1).toUpperCase() + word.substring(1);

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
          {capitalize(pokemon_name)}
        </Link>
      </h2>
      <img
        onError={() => setSpriteURL(missingSpriteURL)}
        style={{ height: "45%", maxWidth: "50%" }}
        src={spriteURL}
      ></img>
    </div>
  );
};

export default PokemonCard;
