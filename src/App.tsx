import React, {useEffect} from "react";
import "./App.css";
import Auth from "./pages/Auth";
import {Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("sessionToken")) {
      // TODO: Check if sessionToken is valid (i.e. not expired)
      navigate("/dashboard");
    }
  });

  return (
    <Routes>
      <Route path="/" Component={Auth} />
      <Route path="/dashboard" Component={Dashboard} />
    </Routes>
  );
}

export default App;
