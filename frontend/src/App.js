import React, { usestate } from "react";
import Navbar from "./components/Navbar";
import './App.css';
import Accueil from "./components/Accueil";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Route path="/" exact component={Accueil} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Router>
    </div>
  );
}

export default App;
