import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useLocation } from 'react-router-dom'
import './css/navbar.css'
import { Typography, Box } from '@mui/material';
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';


function Profile() {

    const useStyles = makeStyles({
        userInfo: {
            justifyContent: "center",
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
                console.log(response);
            })
    }, [])

    const classes = useStyles();

    return (
        <>

            <h1 className="profile">À propos de moi</h1>
            <Box sx={{ display: 'flex' }} className={classes.userInfo}>
                <Typography variant="subtitle1">{firstName}</Typography>
                <Typography variant="subtitle1">{lastName}</Typography>
            </Box>

        </>
    )
}

export default Profile;