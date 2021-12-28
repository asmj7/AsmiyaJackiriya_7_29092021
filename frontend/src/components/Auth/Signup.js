import React, { useState } from "react";
import Axios from 'axios';
import '../css/navbar.css';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../../redux/actions/userActions';
import { Typography, TextField, Button, Box } from '@mui/material';
import Footer from "../Footer";

function Signup() {

    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    function Validation(e) {

        let errorMessageBox = document.querySelector('.errorMessageBox');
        let email = document.querySelector('#email').value
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        let firstName = document.querySelector('#firstName').value
        let lastName = document.querySelector('#lastName').value
        let password = document.querySelector('#password').value

        if (!email.match(pattern) || email === '' || firstName === '' || lastName === '' || password === '') {
            errorMessageBox.innerText = 'Veuillez renseigner tous les champs obligatoires au format valide';
            errorMessageBox.style.color = '#F04824';
        } else {
            errorMessageBox.innerText = ''
            Axios.post("http://localhost:3000/api/auth/signup", {
                firstName: firstNameReg,
                lastName: lastNameReg,
                email: emailReg,
                password: passwordReg
            }).then((response) => {
                if (response.data.loggedIn) {
                    console.log(response.data.message);
                    setMessage(response.data.message)
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("email", response.data.token);
                } else {
                    // localStorage.setItem("loggedIn", false);
                    console.log(response.data)
                    // setErrorMessage(response.data.message)
                }
            })
                .catch((error) => { setErrorMessage(error.response.data.message) });
        }

    }

    return (
        <>
            <Box sx={{ color: 'red', mt: '20px' }}>{errorMessage}</Box>
            <Box className="errorMessageBox"></Box>
            <div className="identification">
                <div className="registration">
                    <h1>S'enregistrer</h1>
                    <div >
                        <TextField
                            width="100%"
                            label="Prénom"
                            id="firstName"
                            size="small"
                            variant="standard"
                            value={firstNameReg} onChange={(e) => setFirstNameReg(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div >
                        <TextField
                            label="Nom"
                            id="lastName"
                            size="small"
                            variant="standard"
                            value={lastNameReg} onChange={(e) => setLastNameReg(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div >
                        <TextField
                            label="Email"
                            id="email"
                            size="small"
                            variant="standard"
                            value={emailReg} onChange={(e) => setEmailReg(e.target.value)}
                            type="email"
                        />
                    </div>
                    <div >
                        <TextField
                            label="Mot de passe"
                            id="password"
                            size="small"
                            variant="standard"
                            value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)}
                            type="password"
                        />
                    </div>
                    <Button variant="contained" onClick={() => Validation()} sx={{ mt: 3.5 }}>S'enregistrer</Button>
                </div>
            </div>
            <Typography mt='10px' mb='50px'>{message}</Typography>
            <Footer/>
        </>
    );
}

export default withRouter(Signup);