import React, { useState, useEffect } from "react";
import "../index.css"; // Import the CSS file

function Prompt() {
  const [prompts, setPrompts] = useState([]);
  const [randomPrompts, setRandomPrompts] = useState({});
  const [isButtonHovered, setIsButtonHovered] = useState(false);
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

  const handleButtonHover = () => {
    setIsButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setIsButtonHovered(false);
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
    <div className="wrapper">
      <div className="holy-grail">
        <div className="copyright">Created by Cooper and Casey Epps &#169; 2024</div>
        <header className="holy-grail-header">
          Silly Brief
        </header>
        <main className="holy-grail-main">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button className="shuffle-button" 
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={shufflePrompts}>
              <span className="arrow"><img src={isButtonHovered ? "/wpaper.svg" : "paper.svg"} alt="paper symbol"/> </span> Brief Me!
            </button>
          </div>
          <div className="container">
            <div className="item">
              <h4 className="label">media</h4>
              <h2 className="a text" onClick={() => toggleLock('media')}>
                {randomPrompts.media || 'Shuffle'}
              </h2>
              <div className="lock-icon" onClick={() => toggleLock('media')}>
                <img src={locked.media ? "/lock.svg" : "/unlock.svg"} alt={locked.media ? "Locked" : "Unlocked"} />
              </div>
            </div>
            <div className="item">
              <h4 className="label">brand</h4>
              <h2 className="b text" onClick={() => toggleLock('brand')}>
                {randomPrompts.brand || 'Shuffle'}
              </h2>
              <div className="lock-icon" onClick={() => toggleLock('brand')}>
                <img src={locked.brand ? "/lock.svg" : "/unlock.svg"} alt={locked.brand ? "Locked" : "Unlocked"} />
              </div>
            </div>
            <div className="item">
              <h4 className="label">target audience</h4>
              <h2 className="c text" onClick={() => toggleLock('targetAudience')}>
                {randomPrompts.targetAudience || 'Shuffle'}
              </h2>
              <div className="lock-icon" onClick={() => toggleLock('targetAudience')}>
                <img src={locked.targetAudience ? "/lock.svg" : "/unlock.svg"} alt={locked.targetAudience ? "Locked" : "Unlocked"} />
              </div>
            </div>
          </div>
        </main>
        <footer className="holy-grail-footer">
          color and audio
        </footer>
      </div>
    </div>
    
  );
}

export default Prompt;