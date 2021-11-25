import React, { useState } from "react";
import Axios from 'axios';
import './css/navbar.css';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../redux/actions/userActions';
import { Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fontSize, fontWeight } from "@mui/system";

function Signup() {

    const useStyles = makeStyles({
        login: {
            display: 'inline-grid',
            width: "100%"
        },
        loginText: {
            fontSize: "35px"
        }
    })

    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    let history = useHistory();

    const register = () => {
        console.log(firstNameReg)
        Axios.post("http://localhost:3000/api/auth/signup", {
            firstName: firstNameReg,
            lastName: lastNameReg,
            email: emailReg,
            password: passwordReg
        }).then((response) => {
            dispatch(registerSuccess(response))
            if (response.data.loggedIn) {
                history.push("/")
                console.log(response.data)
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("email", response.data.token);
            } else {
                // localStorage.setItem("loggedIn", false);
                setErrorMessage(response.data.message)
            }
        })
    }

    const classes = useStyles();

    return (
        <div className="identification">
            <div className="registration">
                <h1>S'inscrire</h1>

                <div >
                    <TextField
                        label="Prénom"
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        value={firstNameReg} onChange={(e) => setFirstNameReg(e.target.value)}
                        type="text"
                    />
                </div>
                <div >
                    <TextField
                        label="Nom"
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        value={lastNameReg} onChange={(e) => setLastNameReg(e.target.value)}
                        type="text"
                    />
                </div>
                <div >
                    <TextField
                        label="Email"
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        value={emailReg} onChange={(e) => setEmailReg(e.target.value)}
                        type="email"
                    />
                </div>
                <div >
                    <TextField
                        label="Mot de passe"
                        id="standard-size-small"
                        size="small"
                        variant="standard"
                        value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)}
                        type="password"
                    />
                </div>
                <Button variant="contained" onClick={register} sx={{ mt: 3.5 }}>S'inscrire</Button>
            </div>
        </div>
    );
}

export default withRouter(Signup);