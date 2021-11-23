import React, { useState } from "react";
import Axios from 'axios';
import './css/navbar.css';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerSuccess} from '../redux/actions/userActions';

function Signup() {

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

return (
    <div className="identification">
        <div className="registration">
            <h1>S'inscrire</h1>
            <label>Prénom</label>
            <input type="text" value={firstNameReg} onChange={(e) => setFirstNameReg(e.target.value)}></input>
            <label>Nom</label>
            <input type="text" value={lastNameReg} onChange={(e) => setLastNameReg(e.target.value)}></input>
            <label>E-mail</label>
            <input type="email" value={emailReg} onChange={(e) => setEmailReg(e.target.value)}></input>
            <label>Mot de passe</label>
            <input type="password" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)}></input>
            <button onClick={register}>S'inscrire</button>
        </div>
    </div>
);
}

export default withRouter(Signup);