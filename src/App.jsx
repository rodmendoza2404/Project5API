import React, { useState, useEffect } from "react";
import BanList from "./components/BanList";
import DogDisplay from "./components/DogDisplay";
import DogHistory from "./components/DogHistory";
import "./index.css";

const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY;

function App() {
  const [currentDog, setCurrentDog] = useState(null);
  const [banList, setBanList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    fetchRandomDog();
  }, []);

  const handleBanAttribute = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList((prev) => [...prev, attribute]);
    }
  };

  const handleUnbanAttribute = (attribute) => {
    setBanList((prev) => prev.filter((item) => item !== attribute));
  };

  const fetchRandomDog = async () => {
    setLoading(true);
    setError("");

    let attempt = 0;
    const maxAttempts = 15;

    while (attempt < maxAttempts) {
      attempt++;

      try {
        const resp = await fetch("https://api.thedogapi.com/v1/images/search", {
          headers: {
            "x-api-key": DOG_API_KEY,
          },
        });
        const data = await resp.json();

        if (!data || data.length === 0) {
          throw new Error("No data returned from API");
        }

        const dogObject = data[0];
        let breedInfo = dogObject.breeds && dogObject.breeds[0] ? dogObject.breeds[0] : null;
        const name = breedInfo?.name || "Unknown Breed";
        const breedGroup = breedInfo?.breed_group || "Unknown Group";
        const lifeSpan = breedInfo?.life_span || "Unknown Lifespan";
        const temperament = breedInfo?.temperament || "Unknown Temperament";

        const conflicts =
          banList.includes(name) ||
          banList.includes(breedGroup) ||
          banList.includes(lifeSpan) ||
          banList.includes(temperament);

        if (!conflicts) {
          const dogData = {
            url: dogObject.url,
            name,
            breedGroup,
            lifeSpan,
            temperament,
          };
          setCurrentDog(dogData);
          setLoading(false);
          setHistoryList((prev) => [...prev, dogData]);
          return;
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching from The Dog API.");
        break;
      }
    }

    setLoading(false);
    setError("No suitable dog found (maybe everything is banned?)");
  };

  const handleDiscover = () => {
    fetchRandomDog();
  };

  return (
    <div className="app-container">
      <div className="dog-history-section">
        <DogHistory historyList={historyList} />
      </div>
      <div className="main-content">
        <h1 className="title">Veni Vici! (Dog Edition)</h1>
        <p>Discover dogs from your wildest dreams!</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading a dog...</p>}
        {currentDog && !loading && !error && (
          <DogDisplay dog={currentDog} onBan={handleBanAttribute} />
        )}
        <button className="discover-button" onClick={handleDiscover}>
          Discover!
        </button>
      </div>
      <div className="ban-list-section">
        <BanList banList={banList} onUnban={handleUnbanAttribute} />
      </div>
    </div>
  );
}

export default App;
