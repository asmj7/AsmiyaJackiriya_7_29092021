import React, { useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import '../css/accueil.css';
import { withRouter } from 'react-router-dom';
import { loginSuccess } from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

function Login() {

  const useStyles = makeStyles({
    login: {
      display: 'inline-grid',
      width: "100%"
    },
    loginText: {
      fontSize: "35px",
      marginTop: '10px'
    }
  })

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState('');

  let Login = document.querySelector('.Login')

  function Validation(e) {
    // e.preventDefault();

    let errorMessageBox = document.querySelector('.errorMessageBox');
    let email = document.querySelector('#email').value
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    let hasEmptyValue = false;

    if (!email.match(pattern) || hasEmptyValue) {
      errorMessageBox.innerText = 'Veuillez renseigner tous les champs obligatoires au format valide';
      errorMessageBox.style.color = '#F04824';
    } else {
      Axios.post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password
      })
        .then((response) => {
          dispatch(loginSuccess(response))
          if (response.data.loggedIn) {
            history.push("/")
            console.log(response.data)
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("email", response.data.token)
          } else {
            console.log(response.data)
          }
        })
        .catch((error) => { setErrorMessage(error.response.data.message) });
    }
  }

  const dispatch = useDispatch();
  let history = useHistory();
  
  const classes = useStyles();

  return (
    <>
      <Box sx={{ color: 'red', mt: '20px' }}>{errorMessage}</Box>
      <Box className="errorMessageBox"></Box>
      <div className="identification">
        <div className={classes.login}>
          <h1 className={classes.loginText}>Se connecter</h1>
          <div >
            <TextField
              label="Email"
              id="email"
              required={true}
              size="small"
              variant="standard"
              value={email} onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <TextField
              label="Mot de passe"
              required={true}
              id="standard-size-small"
              size="small"
              variant="standard"
              value={password} onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <Button variant="contained" className="Login" onClick={() => Validation()} sx={{ mt: 3.5 }}>Se connecter</Button>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);
