import React, { useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import './css/navbar.css';
import { withRouter } from 'react-router-dom';
import { loginSuccess } from '../redux/actions/userActions'
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import style from './style';

function Login() {

  const useStyles = makeStyles({
    login: {
      display: 'inline-grid',
      width: "100%"
    },
    loginText: {
      fontSize: "35px"
    }
  })

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
        dispatch(loginSuccess(response))
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
  const classes = useStyles();

  return (

    <div className="identification">
      <div className={classes.login}>
        <h1 className={classes.loginText}>Se connecter</h1>
        <div >
          <TextField
            label="Email"
            id="standard-size-small"
            size="small"
            variant="standard"
            value={email} onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div>
          <TextField
            label="Mot de passe"
            id="standard-size-small"
            size="small"
            variant="standard"
            value={password} onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <Button variant="contained" onClick={login} sx={{ mt: 3.5 }}>Se connecter</Button>
        {errorMessage}
      </div>
    </div>
  );
}

export default withRouter(Login);
