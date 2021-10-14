import React, { useState } from "react";
import Axios from 'axios';
import '../App.css';

function Identification() {
  const [prenomReg, setPrenomReg] = useState("");
  const [nomReg, setNomReg] = useState("");
  const [emailReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3000/api/signup", {
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

  return (
    <div className="identification">
      <div className="registration">
        <h1>S'inscrire</h1>
        <label>Prénom</label>
        <input type="text"></input>
        <label>Nom</label>
        <input type="text"></input>
        <label>E-mail</label>
        <input type="email"></input>
        <label>Mot de passe</label>
        <input type="password"></input>
        <button onClick={register}>S'inscrire</button>
      </div>
      <div className="login">
        <h1>Se connecter</h1>
        <label>E-mail</label>
        <input type="email"></input>
        <label>Mot de passe</label>
        <input type="text"></input>
        <button>Se connecter</button>
      </div>
    </div>
  );
}

export default Identification;
