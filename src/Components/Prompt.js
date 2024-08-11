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

  // Add state for theme images
  const [themeImages, setThemeImages] = useState({
    lockSrc: '/lock.svg',
    paperSrc: '/paper.svg',
    unlockSrc: '/unlock.svg',
    inversePaperSrc: '/wpaper.svg',
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

  const changeTheme = (theme) => {
    document.documentElement.className = theme;

    let lockSrc, paperSrc, unlockSrc, inversePaperSrc;

    if (theme === 'theme1') {
      lockSrc = '/lock.svg';
      paperSrc = '/paper.svg';
      unlockSrc = '/unlock.svg';
      inversePaperSrc = '/wpaper.svg';
    } else if (theme === 'theme2') {
      lockSrc = '/glock.svg';
      paperSrc = '/gpaper.svg';
      unlockSrc = '/gUnlock.svg';
      inversePaperSrc = '/bluePaper.svg';
    } else if (theme === 'theme3') {
      lockSrc = '/pinkLock.svg';
      paperSrc = '/pinkPaper.svg';
      unlockSrc = '/pinkUnlock.svg';
      inversePaperSrc = '/paper.svg';
    } else if (theme === 'theme4') {
      lockSrc = '/paleLock.svg';
      paperSrc = '/wpaper.svg';
      unlockSrc = '/paleUnlock.svg';
      inversePaperSrc = '/redPaper.svg';
    } else if (theme === 'theme5') {
      lockSrc = '/pinkLock.svg';
      paperSrc = '/pinkPaper.svg';
      unlockSrc = '/pinkUnlock.svg';
      inversePaperSrc = '/purplePaper.svg';
    }

    setThemeImages({
      lockSrc,
      paperSrc,
      unlockSrc,
      inversePaperSrc
    });
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
          <img
            src={isButtonHovered ? themeImages.inversePaperSrc : themeImages.paperSrc}
            alt="Paper"
          />
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
                  src={locked[category] ? themeImages.lockSrc : themeImages.unlockSrc}
                  alt={locked[category] ? "Locked" : "Unlocked"}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="holy-grail-footer">
        <button className="color-button" onClick={() => changeTheme("theme1")}>
          <img alt="White/black color button" src="../black-white.svg"/>
        </button>
        <button className="color-button" onClick={() => changeTheme("theme2")}>
          <img alt="Blue/green color button" src="../bluegreen.svg"/>
        </button>
        <button className="color-button" onClick={() => changeTheme("theme3")}>
          <img alt="Black/pink color button" src="../blackpink.svg"/>
        </button>
        <button className="color-button" onClick={() => changeTheme("theme4")}>
          <img alt="Red/white color button" src="../redwhite.svg"/>
        </button>
        <button className="color-button" onClick={() => changeTheme("theme5")}>
          <img alt="Purple/pink color button" src="../purplepink.svg"/>
        </button>
      </footer>
    </div>
  );
}

export default Prompt;
