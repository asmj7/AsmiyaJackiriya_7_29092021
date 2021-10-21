import React, { useState } from "react";
import Axios from 'axios';
import '../App.css';

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    Axios.post("http://localhost:3000/api/auth/login", {
      email: email,
      password: password
    })
    .then((response) => {
      if (response.data.loggedIn) {
        console.log(response.data.loggedIn)
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("email", response.data.email)
      } else {
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
        {/* {errorMessage} */}
      </div>
    </div>
  );
}

export default Login;
