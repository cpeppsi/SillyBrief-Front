import React, { useState, useEffect } from "react";
import "../index.css";

function Prompt() {
  const [prompts, setPrompts] = useState([]);
  const [randomPrompts, setRandomPrompts] = useState({});
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [locked, setLocked] = useState({
    media: false,
    brand: false,
    targetAudience: false,
  });

  const categories = ["media", "brand", "targetAudience"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.REACT_APP_BACKEND_URI}/prompts`;
        const response = await fetch(URL);
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    fetchData();
  }, []);

  const shufflePrompts = () => {
    const interval = setInterval(() => {
      const newRandomPrompts = { ...randomPrompts };
      categories.forEach((category) => {
        if (!locked[category]) {
          const randomIndex = Math.floor(Math.random() * prompts.length);
          newRandomPrompts[category] = prompts[randomIndex][category];
        }
      });
      setRandomPrompts(newRandomPrompts);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const newRandomPrompts = { ...randomPrompts };
      categories.forEach((category) => {
        if (!locked[category]) {
          const randomIndex = Math.floor(Math.random() * prompts.length);
          newRandomPrompts[category] = prompts[randomIndex][category];
        }
      });
      setRandomPrompts(newRandomPrompts);
    }, 2000);
  };

  const handleButtonHover = () => {
    setIsButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setIsButtonHovered(false);
  };

  const toggleLock = (category) => {
    setLocked((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  if (prompts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="holy-grail">
      <div style={{ textAlign: "center" }}>
        <button
          className="shuffle-button"
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          onClick={shufflePrompts}
        >
          <span className="arrow">
            <img
              src={isButtonHovered ? "/wpaper.svg" : "paper.svg"}
              alt="paper symbol"
            />{" "}
          </span>{" "}
          Brief Me!
        </button>
      </div>
      <main className="holy-grail-main">
        <div className="container">
          {categories.map((category) => (
            <div className="item" key={category}>
            <h4 className="label">{category}</h4>
              <h2
                className={`text ${category}`}
                onClick={() => toggleLock(category)}
              >
                {randomPrompts[category] || "Shuffle"}
              </h2>
              <div
                className="lock-icon"
                onClick={() => toggleLock(category)}
              >
                <img
                  src={locked[category] ? "/lock.svg" : "/unlock.svg"}
                  alt={locked[category] ? "Locked" : "Unlocked"}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="holy-grail-footer">color and audio</footer>
    </div>
  );
}

export default Prompt;
