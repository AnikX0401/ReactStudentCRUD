import React from "react";
import { Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import EditStudent from "./components/EditStudent";
import AddStudent from "./components/AddStudent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/edit/:rollNumber" element={<EditStudent />} />
      <Route path="/add" element={<AddStudent />} />
      {/* <Route
        path="/add"
        element={
          <AddStudent
            onBackclick={onBackclick}
            onAddClick={onAddClick}
            showDuplicateEmailError={showDuplicateEmailError}
            showDuplicateRollNoError={showDuplicateRollNoError}
          />
        }
      /> */}
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
