import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import './navbar.css';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerSuccess} from '../redux/actions/userActions';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const login = () => {
    Axios.post("http://localhost:3000/api/auth/login", {
      email: email,
      password: password
    })
      .then((response) => {
        dispatch(registerSuccess(response))
        if (response.data.loggedIn) {
          history.push("/")
          console.log(response.data)
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("email", response.data.token)
        } else {
          // localStorage.setItem("loggedIn", false);
          setErrorMessage(response.data.message)
        }
      })

  }

  return (
    
    <div className="identification">
      <div className="login">
        <h1>Se connecter</h1>
        <label>E-mail</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={login}>Se connecter</button>
        {errorMessage}
      </div>
    </div>
  );
}

export default withRouter(Login);
