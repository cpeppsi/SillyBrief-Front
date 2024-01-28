import React from "react";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

function Prompt() {
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const URL = `${process.env.REACT_APP_BACKEND_URI}/prompts`
      const response = await fetch(URL)
      const data = await response.json()
      setPrompts(data)
    }

    fetchData();
  }, []);

  const display = prompts.map(prompt => {
    return (
      <div className="container">
        <h2 className="a text">{prompt.media}</h2>
        <h4 className="label">Media</h4>
        <h2 className="b text">{prompt.brand}</h2>
        <h4 className="label">Brand</h4>
        <h2 className="c text">{prompt.targetAudience}</h2>
        <h4 className="label">Target Audience</h4>
      </div>
    )
  });

  return (
    <div>
      <h1 className="title text">Silly Brief</h1>
      {display}
    </div>
  );
}

export default Prompt;