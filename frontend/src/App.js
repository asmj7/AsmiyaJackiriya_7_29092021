import React from "react";
import Navbar from "./components/Navbar";
import './App.css';
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import Accueil from "./components/Accueil";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/GetPostTest"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./components/Post"


function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
        <Switch>
          <Route path="/" exact component={Accueil} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/post/:id" exact component={Post} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
