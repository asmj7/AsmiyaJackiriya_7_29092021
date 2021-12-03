import React, { useEffect, useState } from "react";
import './css/accueil.css';
import Axios from 'axios';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import Footer from "./Footer"

// After auth
function Home(props) {

    const useStyles = makeStyles({
        comment: {
            width: "90%"
        },
        commentBox: {
            width: "90%",
            margin: "auto",
            marginTop: "10px",
            marginBottom: "20px"
        },
        postContainer: {
            border: "1.5px solid #BCBCBC",
            height: "fit-content",
            borderRadius: "25px",
            maxWidth: 500,
            minWidth: 250,
            margin: "auto",
        },
    })

    const [postId, setPostId] = useState("");
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("");
    const [uploads, setUploads] = useState([]);
    const token = localStorage.getItem("email")

    const config = {
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    // Récupérer les posts
    useEffect(() => {
        Axios.get("http://localhost:3000/api/post/", config)
            .then((response) => {
                console.log(response)
                setUploads(response.data)
                setPostId(response.data[0].id)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [props.loggedInUser]);

    // Créer un commentaire
    const createComment = () => {
        Axios.post("http://localhost:3000/api/comment/create", { postId, newComment }, config)
    }

    console.log("postId: " + postId)

    // Récupérer un commentaire
    useEffect(() => {
        console.log("postId : " + postId);
        Axios.get('http://localhost:3000/api/comment/', {
            params: {
                postId: postId,
            }
        }, config)
            .then(function (response) {
                console.log(response);
                console.log(postId);

            })
            .catch(function (error) {
                console.log(error);
            })
    }, [postId])


    const classes = useStyles();

    return (
        <>
            <Container display="flex"
                justifycontent="center"
                alignitems="center" xs={6} className="home">
                {uploads.map(val => (
                    <Box className={classes.postContainer}>
                        <Box className={classes.userName}></Box>
                        <h2 className="title">{val.title}</h2>
                        <div className="content">
                            <div className="description">
                                {val.content}
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img className="image" maxwidth="xs" src={val.imageUrl} alt="img"></img>
                        </div>
                        <Box sx={{ display: 'flex' }} className={classes.commentBox}>
                            <TextField
                                label="Commentaire"
                                id="standard-size-small"
                                size="small"
                                variant="standard"
                                type="comment"
                                name="comment"
                                placeholder="Écrivez quelque chose"
                                className={classes.comment}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button onClick={createComment} endIcon={<SendIcon />}>Envoyer</Button>
                        </Box>
                    </Box>
                ))}
            </Container>
        </>
    )
}


// Home page before auth
function GuestHome() {

    const useStyles = makeStyles({
        Typography: {
            // titleTwo: {
            //     fontSize: '35px',
            //     width: '87%',
            //     margin: 'auto',
            // }
        }
    })

    const classes = useStyles();
    return (
        <>
            <Grid container mt={6} rowGap={10} mb='30px' columnGap={5} >
                <Grid item md={6}>
                    <Typography variant='h1' fontSize='40px' fontWeight='medium' color='#e81f63'>Communication interne</Typography>
                    <Typography variant='h2' fontSize='40px' m='auto' mt='20px' className={classes.titleTwo}>Communiquer plus directement avec vos collègues</Typography>
                </Grid>
                <Grid item md={4}>
                    <Typography variant='subtitle1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur neque augue, imperdiet at tortor at, malesuada convallis felis. Morbi viverra enim eget porta suscipit. Praesent vulputate egestas purus sit amet vulputate. Mauris id suscipit neque, id pulvinar lorem.
                    </Typography>
                </Grid>
                <Grid item md={4} m='auto'>
                    <Typography variant='subtitle1'>
                        Vivamus lacinia orci ipsum, at vehicula risus euismod a. Curabitur venenatis ultrices tortor, in tempus quam vehicula eu.
                    </Typography>
                </Grid>
                <Grid item md={4} m='auto'>
                    <Typography variant='subtitle1'>
                        Suspendisse ultrices ligula lacus, eget porttitor ligula placerat a. Vivamus pretium eget odio vel aliquam.
                    </Typography>
                </Grid>
            </Grid>
            <Typography m='auto'>Vous êtes nouveau ? Inscrivez-vous</Typography>
        </>
    )
}

function HomePage() {

    const [loggedIn, setLoggedIn] = useState(false);
    const loggedInUser = useSelector((state) => state.loggedInUser.user)

    useEffect(() => {
        if (!loggedInUser || Object.keys(loggedInUser).length === 0) {
            setLoggedIn(false)
        }
        else {
            setLoggedIn(true)
        }
    }, [loggedInUser])

    return (
        <>
            {
                loggedIn ? (
                    <Home loggedInUser={loggedInUser} />
                    // <Footer/>
                ) : (
                    <GuestHome />
                    // <Footer/>
                )
            }
        </>
    )
}

export default withRouter(HomePage);