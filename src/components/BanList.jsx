import React from "react";
import "../index.css";

function BanList({ banList, onUnban }) {
  return (
    <div className="ban-list-container">
      <h3>Ban List</h3>
      <p>Select an attribute in your listing to ban it</p>
      {banList.length === 0 ? (
        <p>No banned attributes yet</p>
      ) : (
        <div>
          {banList.map((attribute) => (
            <span
              key={attribute}
              className="ban-list-item"
              onClick={() => onUnban(attribute)}
              title="Click to remove from ban list"
            >
              {attribute}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default BanList;
