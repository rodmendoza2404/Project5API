import React from "react";
import "../index.css";

 
function DogHistory({ historyList }) {
  return (
    <div className="dog-history-container">
      <h3>Who have we seen so far?</h3>
      {historyList.length === 0 ? (
        <p>None yet!</p>
      ) : (
        historyList.map((dog, index) => (
          <div className="dog-history-item" key={index}>
            <img src={dog.url} alt={dog.name} />
            <p>{dog.name} {dog.breedGroup !== "Unknown Group" ? `(${dog.breedGroup})` : ""}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DogHistory;
