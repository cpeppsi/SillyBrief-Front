import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Prompt from "./Components/Prompt"
import About from "./Components/About";
import Instruction from "./Components/Instruction"
import "./index.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Prompt />} />
          <Route path="/about" element={<About />} />
          <Route path="/instruction" element={<Instruction />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;