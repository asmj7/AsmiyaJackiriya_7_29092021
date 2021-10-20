import React, { useState } from "react";
import Axios from 'axios';
import '../App.css';

function Identification() {
  const [prenomReg, setPrenomReg] = useState("");
  const [nomReg, setNomReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const register = () => {
    console.log(prenomReg)
    Axios.post("http://localhost:3000/api/auth/signup", {
      prenom: prenomReg,
      nom: nomReg,
      email: emailReg,
      password: passwordReg
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err))
  }
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
      <div className="registration">
        <h1>S'inscrire</h1>
        <label>Prénom</label>
        <input type="text" value={prenomReg} onChange={(e) => setPrenomReg(e.target.value)}></input>
        <label>Nom</label>
        <input type="text" value={nomReg} onChange={(e) => setNomReg(e.target.value)}></input>
        <label>E-mail</label>
        <input type="email" value={emailReg} onChange={(e) => setEmailReg(e.target.value)}></input>
        <label>Mot de passe</label>
        <input type="password" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)}></input>
        <button onClick={register}>S'inscrire</button>
      </div>
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

export default Identification;
