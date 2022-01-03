import React from "react";
import Navbar from "./components/Navbar";
import './App.css';
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import Accueil from "./components/Accueil";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./components/Post";
import Comments from './components/Admin/Comments';
import Posts from './components/Admin/Posts';
import Users from './components/Admin/Users';
import Admin from './components/Admin/Admin'
import { useSelector } from "react-redux";
import Footer from "./components/Footer";


function App() {

  const loggedInUser = useSelector((state) => state.loggedInUser.user)

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Accueil} />
          {!loggedInUser ? (
            <>
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
            </>
          ) : (
            <>
              <Route path="/profile/:id" exact component={Profile} />
              <Route path="/upload" exact component={Upload} />
              <Route path="/post/:id" exact component={Post} />
              {loggedInUser.user.data && loggedInUser.user.data.isAdmin &&
                <>
                  <Route path="/admin/comments" exact component={Comments} />
                  <Route path="/admin/posts" exact component={Posts} />
                  <Route path="/admin/users" exact component={Users} />
                  <Route path="/admin" exact component={Admin} />
                </>}
            </>)}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
