import React from "react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import DrinkCardFront from "./DrinkCardFront";
import DrinkCardBack from "./DrinkCardBack";

const FlippingCard = ({ cocktail }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <DrinkCardFront cocktail={cocktail} handleClick={handleClick}>
        This is the front of the card.
        <button onClick={handleClick}>Click to flip</button>
      </DrinkCardFront>

      <DrinkCardBack cocktail={cocktail} handleClick={handleClick}>
        This is the back of the card.
        <button onClick={handleClick}>Click to flip</button>
      </DrinkCardBack>
    </ReactCardFlip>
  );
};

export default FlippingCard;
