import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from 'axios';
import './css/navbar.css'
import { Box, Typography, Button } from '@mui/material';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Footer from './Footer';
import { useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import CryptoAES from 'crypto-js/aes';

function Profile() {

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    const userId = loggedInUser && loggedInUser.user.data ? loggedInUser.user.data.userId : null;

    let history = useHistory();
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
        postContainer: {
            border: "1.5px solid #BCBCBC",
            height: "fit-content",
            borderRadius: "25px",
            paddingBottom: '30px',
            cursor: 'pointer',
            width: "90%",
            margin: 'auto',
        },
        container: {
            columnGap: '10px',
            width: "90%",
            margin: 'auto',
            rowGap: '20px',
            marginBottom: '30px'
        },
        profile: {
            color: "#1C2833",
            backgroundColor: '#D6DBDF'
        },
        button: {
            marginTop: '30px'
        }
    })

    const params = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    const token = localStorage.getItem("email")
    const config = {
        headers: {
            'Authorization': `token ${token}`
        }
    };

    // get user info
    useEffect(() => {
        Axios.get(`http://localhost:3000/api/auth/${params.id}`, config)
            .then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setId(response.data.id)
                console.log(response);
            })
    }, [])

    // Récupérer les posts de l'utilisateur
    useEffect(() => {
        Axios.get(`http://localhost:3000/api/post/user/${params.id}`, config)
            .then((response) => {
                setUserPosts(response.data);
                // setId(response.data.id)
            })
    }, [])

    // supprimer un utilisateur
    const deleteUser = (id) => {
        Axios.delete(`http://localhost:3000/api/auth/delete/${id}`, config)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const classes = useStyles();

    return (
        <>

            {userId == params.id ? (
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
                    <Popup trigger={
                        <Button sx={{ mt: '20px', mb: '10px' }} variant='contained' className={classes.button}>
                            Supprimer mon compte
                        </Button>
                    }>
                        <Typography>Voulez-vous vraiment supprimer votre compte ?</Typography>
                        <Button variant='outlined' onClick={() => deleteUser(id)}>Oui</Button>
                    </Popup>

                </>
            ) : (
                <>
                    <h1 className="profile">À propos de {firstName} {lastName}</h1>
                    <Grid container sx={{ display: 'flex', border: '1px dashed grey' }} className={classes.userInfo}>
                        <Grid xs={8} sm={6} md={4} item>
                            <Typography className={classes.userFirstname} fontWeight='600' variant="subtitle1">Prénom</Typography>
                            <Typography variant="subtitle1">{firstName}</Typography>
                        </Grid>
                        <Grid xs={8} sm={6} md={4} item>
                            <Typography className={classes.userLastname} fontWeight='600' variant="subtitle1">Nom</Typography>
                            <Typography variant="subtitle1">{lastName}</Typography>
                        </Grid>
                    </Grid>
                </>
            )}
            {params.id == userId ? (<h1 className={classes.profile}>Mes publications</h1>) : (<h1 className={classes.profile}>Les publications de {firstName} {lastName}</h1>)}
            <Grid container className={classes.container}>
                {userPosts.map((val, key) => (
                    <Grid margin='auto' item className={classes.postContainer} sm={6} md={4} xs={8}>
                        <Box onClick={() => history.push(`/post/${val.id}`)}>
                            <h2 className="title">{val.title}</h2>
                            <div className="content">
                                <div className="description">
                                    {val.content}
                                </div>
                            </div>
                            <div className="imgContainer">
                                <img className="image" src={val.imageUrl} alt="img"></img>
                            </div>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Footer />
        </>
    )
}

export default Profile;