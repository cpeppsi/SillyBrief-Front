import React, { useState, useEffect } from "react";
import "../index.css"; // Import the CSS file

function Prompt() {
  const [prompts, setPrompts] = useState([]);
  const [randomPrompts, setRandomPrompts] = useState({});
  const [locked, setLocked] = useState({
    media: false,
    brand: false,
    targetAudience: false
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
      categories.forEach(category => {
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
      categories.forEach(category => {
        if (!locked[category]) {
          const randomIndex = Math.floor(Math.random() * prompts.length);
          newRandomPrompts[category] = prompts[randomIndex][category];
        }
      });
      setRandomPrompts(newRandomPrompts);
    }, 2000);
  };

  const toggleLock = (category) => {
    setLocked(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  if (prompts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="title text">Silly Brief</h1>
      <div style={{ textAlign: "center" }}>
        <button className="shuffle-button" onClick={shufflePrompts}>
          <span className="arrow"><img src="/paper.svg" alt="paper symbol"/> </span> Brief Me!
        </button>
      </div>
      <div className="container">
        <div className="item">
          <h4 className="label">media</h4>
          <h2 className="a text" onClick={() => toggleLock('media')}>
            {randomPrompts.media}
          </h2>
          <div className="lock-icon" onClick={() => toggleLock('media')}>
            <img src="/lock.svg" alt={locked.media ? "Locked" : "Unlocked"} />
          </div>
        </div>
        <div className="item">
          <h4 className="label">brand</h4>
          <h2 className="b text" onClick={() => toggleLock('brand')}>
            {randomPrompts.brand}
          </h2>
          <div className="lock-icon" onClick={() => toggleLock('brand')}>
            <img src="/lock.svg" alt={locked.brand ? "Locked" : "Unlocked"} />
          </div>
        </div>
        <div className="item">
          <h4 className="label">target audience</h4>
          <h2 className="c text" onClick={() => toggleLock('targetAudience')}>
            {randomPrompts.targetAudience}
          </h2>
          <div className="lock-icon" onClick={() => toggleLock('targetAudience')}>
            <img src="/lock.svg" alt={locked.targetAudience ? "Locked" : "Unlocked"} />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <span>color and audio</span>
      </div>
    </div>
  );
}

export default Prompt;
