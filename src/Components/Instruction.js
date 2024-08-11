import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Instruction() {
  return (
    <div className="instruction-page">
      <header className="instruction-header">Instructions</header>
      <main className="instruction-main">
        <p>
          This application generates random prompts for creative projects. Use
          the "Brief Me!" button to shuffle through different media, brand, and
          target audience combinations. You can lock any category to keep it
          from changing while shuffling the others.
        </p>
        <Link to="/">Go Back</Link>
      </main>
      <footer className="instruction-footer">color and audio</footer>
    </div>
  );
}

export default Instruction;
