import React from "react";
import "./index.css";
import { Link, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Students from "./components/Students";
import EditStudent from "./components/EditStudent";
import AddStudent from "./components/AddStudent";

function HomePage() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              style={{ color: "#0C5DC7", padding: "5px", fontSize: "25px" }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              style={{ color: "#0C5DC7", padding: "5px", fontSize: "25px" }}
            >
              Add
            </Link>
          </li>
        </ul>
      </nav>
      <Students />
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:rollNumber" element={<EditStudent />} />
        <Route path="/add" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
