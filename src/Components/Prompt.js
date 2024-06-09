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
    const newRandomPrompts = { ...randomPrompts };
    categories.forEach(category => {
      if (!locked[category]) {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        newRandomPrompts[category] = prompts[randomIndex][category];
      }
    });
    setRandomPrompts(newRandomPrompts);
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
          <span className="arrow">&#x21A9;</span>Brief Me!
        </button>
      </div>
      <div className="container">
        <div className="item">
          <h2 className="a text" onClick={() => toggleLock('media')}>
            {randomPrompts.media} {locked.media ? '🔒' : '🔓'}
          </h2>
          <h4 className="label">Media</h4>
        </div>
        <div className="item">
          <h2 className="b text" onClick={() => toggleLock('brand')}>
            {randomPrompts.brand} {locked.brand ? '🔒' : '🔓'}
          </h2>
          <h4 className="label">Brand</h4>
        </div>
        <div className="item">
          <h2 className="c text" onClick={() => toggleLock('targetAudience')}>
            {randomPrompts.targetAudience} {locked.targetAudience ? '🔒' : '🔓'}
          </h2>
          <h4 className="label">Target Audience</h4>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
