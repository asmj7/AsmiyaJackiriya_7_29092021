import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useLocation } from 'react-router-dom'
import './css/navbar.css'
import { Typography, Box, autocompleteClasses } from '@mui/material';
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';


function Profile() {

    const useStyles = makeStyles({
        userInfo: {
            justifyContent: "center",
            margin: 'auto',
            overflowWrap: 'anywhere'
        },
        modifMessage: {
            color: '#e53935',
        }

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
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: 'flex', p: 2, border: '1px dashed grey' }} className={classes.userInfo}>
            <Grid xs={4} item className={classes.userFirstname}>
                <Typography variant="subtitle1">Prénom</Typography>
                <Typography variant="subtitle1">{firstName}</Typography>
            </Grid>
            <Grid xs={4} item className={classes.userLastname}>
                <Typography variant="subtitle1">Nom</Typography>
                <Typography variant="subtitle1">{lastName}</Typography>
            </Grid>
            <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }} item className={classes.userLastname}>
                <Typography variant="subtitle1">E-mail</Typography>
                <Typography variant="subtitle1">{email}</Typography>
            </Grid>
        </Grid>
        <Typography mt={2} className={classes.modifMessage} variant="subtitle1">Vous ne pouvez pas modifier ces informations</Typography>

    </>
)
}

export default Profile;