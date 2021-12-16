import React from "react";
import Navbar from "./components/Navbar";
import './App.css';
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import Accueil from "./components/Accueil";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./components/Post";
import Comments from './components/Admin/Comments';
import Posts from './components/Admin/Posts';
import Users from './components/Admin/Users';
import Admin from './components/Admin/Admin'
import { useSelector } from "react-redux";

function App() {

  const loggedInUser = useSelector((state) => state.loggedInUser.user)

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
          {/* {loggedInUser.data.isAdmin === true && */}
            <>
              <Route path="/admin/comments" exact component={Comments} />
              <Route path="/admin/posts" exact component={Posts} />
              <Route path="/admin/users" exact component={Users} />
              <Route path="/admin" exact component={Admin} />
            </>
            {/* } */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
