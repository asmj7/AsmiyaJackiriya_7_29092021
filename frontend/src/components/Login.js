import React, { usestate } from "react";
import Axios from 'axios';

function Login() {

    // const [usernameReg, setUsernameReg] = usestate('');
    // const [uspasswordReg, setPasswordReg] = usestate('');

    // const Register = () => {
    //     Axios.post("http://localhost:3000/signup")
    // }

    return (
      <div className="App">
        <div className="registration">
          <h1>S'inscrire</h1>
          <label>Nom</label>
          <input type="text"></input>
          <label>Prénom</label>
          <input type="text"></input>
          <label>E-mail</label>
          <input type="email"></input>
          <label>Mot de passe</label>
          <input type="text"></input>
        </div>
        <div className="login">
          <h1>Se connecter</h1>
          <label>E-mail</label>
          <input type="email"></input>
          <label>Mot de passe</label>
          <input type="text"></input>
        </div>
      </div>
    );
  }
  
  export default Login;
  