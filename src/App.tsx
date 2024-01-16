import React from "react";
import "./App.css";
import Auth from "./pages/Auth";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Auth} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
