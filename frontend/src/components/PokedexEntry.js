import React from "react";

const PokedexEntry = ({ speciesName, lastName }) => {
  return (
    <div>
      <h1>{`${speciesName} ${lastName}`}</h1>
      <p>Placeholder</p>
    </div>
  );
};

export default PokedexEntry;
