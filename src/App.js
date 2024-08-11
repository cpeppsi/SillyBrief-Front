import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Import the new Navbar component
import Prompt from "./Components/Prompt";
import About from "./Components/About";
import Instruction from "./Components/Instruction";
import Copy from "./Components/Copy";
import Art from "./Components/Art";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Prompt />} />
          <Route path="/about" element={<About />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/copy" element={<Copy />} />
          <Route path="/art" element={<Art />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
