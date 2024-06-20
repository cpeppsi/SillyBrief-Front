import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Prompt from "./Components/Prompt"
import About from "./Components/About";
import "./index.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Prompt />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;