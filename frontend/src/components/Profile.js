import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useLocation } from 'react-router-dom'
import './css/navbar.css'
import { Typography, Box, autocompleteClasses } from '@mui/material';
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Footer from './Footer';
// import CryptoAES from 'crypto-js/aes';

function Profile() {

    const useStyles = makeStyles({
        userInfo: {
            justifyContent: "center",
            margin: 'auto',
            overflowWrap: 'anywhere',
            paddingLeft: "0",
            paddingRight: "0"
        },
        modifMessage: {
            color: '#e53935',
        },
    })

const params = useParams();
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");

const token = localStorage.getItem("email")
const config = {
    headers: {
        'Authorization': `token ${token}`
    }
};
useEffect(() => {
    Axios.get(`http://localhost:3000/api/auth/${params.id}`, config)
        .then((response) => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            console.log(response);
        })
}, [])

const classes = useStyles();

return (
    <>
        <h1 className="profile">À propos de moi</h1>
        <Grid container sx={{ display: 'flex', border: '1px dashed grey' }} className={classes.userInfo}>
            <Grid xs={8} sm={6} md={4} item>
                <Typography className={classes.userFirstname} fontWeight='600' variant="subtitle1">Prénom</Typography>
                <Typography variant="subtitle1">{firstName}</Typography>
            </Grid>
            <Grid xs={8} sm={6} md={4} item>
                <Typography className={classes.userLastname} fontWeight='600' variant="subtitle1">Nom</Typography>
                <Typography variant="subtitle1">{lastName}</Typography>
            </Grid>
            <Grid xs={8} sm={6} md={4} item >
                <Typography className={classes.userEmail} fontWeight='600' variant="subtitle1">E-mail</Typography>
                <Typography variant="subtitle1">{email}</Typography>
            </Grid>
        </Grid>
        <Typography mt={2} sm={8} className={classes.modifMessage} variant="subtitle1">Vous ne pouvez pas modifier ces informations</Typography>
        <Footer/>
    </>
)
}

export default Profile;