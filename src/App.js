import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Prompt from "./Components/Prompt"
import About from "./Components/About";
import Instruction from "./Components/Instruction"
import Copy from "./Components/Copy";
import "./index.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Prompt />} />
          <Route path="/about" element={<About />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/copy" element={<Copy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;