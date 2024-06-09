import React, { useState, useEffect } from "react";
import "../index.css"; // Import the CSS file

function Prompt() {
  const [prompts, setPrompts] = useState([]);
  const [randomPrompts, setRandomPrompts] = useState({
    media: '',
    brand: '',
    targetAudience: ''
  });
  const [locked, setLocked] = useState({
    media: false,
    brand: false,
    targetAudience: false
  });
  const [error, setError] = useState(null);
  const [shuffling, setShuffling] = useState(false);

  const categories = ["media", "brand", "targetAudience"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `${process.env.REACT_APP_BACKEND_URI}/prompts`;
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const shufflePrompts = () => {
    setShuffling(true);

    const interval = setInterval(() => {
      const newRandomPrompts = { ...randomPrompts };
      categories.forEach(category => {
        if (!locked[category]) {
          const filteredPrompts = prompts.filter(prompt => prompt[category]);
          const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
          newRandomPrompts[category] = filteredPrompts[randomIndex][category];
        }
      });
      setRandomPrompts(newRandomPrompts);
    }, 100); // Change prompt every 100ms

    setTimeout(() => {
      clearInterval(interval);

      const finalRandomPrompts = { ...randomPrompts };
      categories.forEach(category => {
        if (!locked[category]) {
          const filteredPrompts = prompts.filter(prompt => prompt[category]);
          const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
          finalRandomPrompts[category] = filteredPrompts[randomIndex][category];
        }
      });
      setRandomPrompts(finalRandomPrompts);
      setShuffling(false);
    }, 2000); // Duration of the animation
  };

  const toggleLock = (category) => {
    setLocked(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  if (prompts.length === 0 && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="title text">Silly Brief</h1>
      <div style={{ textAlign: "center" }}>
        <button className="shuffle-button" onClick={shufflePrompts}>
          <span className="arrow">&#x21A9;</span> Brief Me!
        </button>
      </div>
      <div className="container">
        <div className="item">
          <h2 className={`a text ${shuffling ? 'shuffling' : ''}`} onClick={() => toggleLock('media')}>
            {randomPrompts.media || 'Select Media'} {locked.media ? '🔒' : '🔓'}
          </h2>
          <h4 className="label">Media</h4>
        </div>
        <div className="item">
          <h2 className={`b text ${shuffling ? 'shuffling' : ''}`} onClick={() => toggleLock('brand')}>
            {randomPrompts.brand || 'Select Brand'} {locked.brand ? '🔒' : '🔓'}
          </h2>
          <h4 className="label">Brand</h4>
        </div>
        <div className="item">
          <h2 className={`c text ${shuffling ? 'shuffling' : ''}`} onClick={() => toggleLock('targetAudience')}>
            {randomPrompts.targetAudience || 'Select Target Audience'} {locked.targetAudience ? '🔒' : '🔓'}
          </h2>
          <h4 className="label">Target Audience</h4>
        </div>
      </div>
    </div>
  );
}

export default Prompt;

