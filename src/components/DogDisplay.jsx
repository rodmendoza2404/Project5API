import React from "react";
import "../index.css";

// Show the dog's image + up to 4 attributes: name, breedGroup, lifeSpan, temperament
function DogDisplay({ dog, onBan }) {
  const { url, name, breedGroup, lifeSpan, temperament } = dog;

  // Helper function to display an attribute as a clickable "button"
  const renderAttribute = (label) => {
    if (!label) return null;
    return (
      <span
        className="dog-attribute-btn"
        onClick={() => onBan(label)}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="dog-display-container">
      <h2>{name}</h2>
      <div>
        {renderAttribute(breedGroup)}
        {renderAttribute(lifeSpan)}
        {renderAttribute(temperament)}
      </div>

      <img
        src={url}
        alt={name}
        className="dog-image"
      />

  
      {renderAttribute(name)}
    </div>
  );
}

export default DogDisplay;
