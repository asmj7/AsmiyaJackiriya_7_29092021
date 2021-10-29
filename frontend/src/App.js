import React from "react";
import Navbar from "./components/Navbar";
import './App.css';
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import Accueil from "./components/Accueil";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
        <Route path="api/post/" exact component={Accueil} />
        <Route path="api/post/profile" exact component={Profile} />
        <Route path="api/post/upload" exact component={Upload} />
        <Route path="api/auth/login" exact component={Login} />
        <Route path="api/auth/signup" exact component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
