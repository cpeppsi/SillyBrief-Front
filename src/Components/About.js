import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function About() {
  return (
    <div className="about-page">
      <header className="about-header">About Silly Brief</header>
      <main className="about-main">
        <p>
          Silly Brief is an interactive application designed to provide random
          creative prompts for media, brand, and target audience categories.
          It's a fun tool for brainstorming and creativity exercises.
        </p>
        <p>Created by Cooper and Casey Epps in 2024.</p>
        <Link to="/">Go Back</Link>
      </main>
      <footer className="about-footer">color and audio</footer>
    </div>
  );
}

export default About;
