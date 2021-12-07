import React, { useEffect, useState } from "react";
import './css/accueil.css';
import Axios from 'axios';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { TextField, Box, Container, Typography, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
    const [comment, setComment] = useState("");
    const [commentId, setCommentId] = useState("");
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
                console.log(response.data)
                setUploads(response.data)
                setPostId(response.data[0].id)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [props.loggedInUser]);

    // Créer un commentaire
    const createComment = () => {
        Axios.post("http://localhost:3000/api/comment/create", { postId: postId, comment: comment }, config)
    }

    // Récupérer un commentaire
    useEffect(() => {
        try {
            Axios({
                method: "GET",
                url: "http://localhost:3000/api/comment/",
                headers: {
                    "Content-Type": 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    postId: postId,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setCommentId(response.data)
                    setComments(response.data)
                })
            console.log()
        } catch (err) {
            console.log(
                "here is the error on a post request from the python server  ",
                err
            );
        }
    }, [postId])

    // Supprimer un commentaire
    function GetCommentId(e) {
        useEffect(() => {
            Axios.delete("http://localhost:3000/api/comment/delete",
                {
                    commentId: commentId,
                    headers: {
                        "Content-Type": 'application/json',
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then((response) => {
                    console.log(response.data[e.target.id]);
                })
        }, [])
    }

    const classes = useStyles();

    return (
        <>
            <Container display="flex"
                justifycontent="center"
                alignitems="center" xs={6} className="home">
                {uploads.map(val => (
                    <Box className={classes.postContainer}>
                        <Box fontWeight='700' p='20px' display='flex' className={classes.userName}>{val.user.firstName}{val.user.lastName}</Box>
                        <h2 className="title">{val.title}</h2>
                        <div className="content">
                            <div className="description">
                                {val.content}
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img className="image" maxwidth="xs" src={val.imageUrl} alt="img"></img>
                        </div>
                        <Box className={classes.showComments}>
                            {comments.map(val => (
                                <Box pl='20px' pr='20px' sx={{ display: 'flex', height: '50px' }} justifyContent='space-between' border='1px solid #DEDEDE' borderColor='grey'>
                                    <Box color='#495fdb' className={classes.commentUserInfo}>{val.user.firstName}<span> </span>{val.user.lastName}</Box>
                                    <Box alignSelf='flex-end'>
                                        {val.comment}
                                    </Box>
                                    <Box onClick={GetCommentId}sx={{ cursor: 'pointer', height: 'fit-content' }}>
                                        <HighlightOffIcon />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
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
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button onClick={createComment} endIcon={<SendIcon />}>Envoyer</Button>
                        </Box>
                    </Box>
                ))}
            </Container>
            <Footer />
        </>
    )
}


// Home page before auth
function GuestHome() {

    const useStyles = makeStyles({
        span: {
            color: '#e81f63',
        },
        signupLink: {
            color: '#004d40'
        },
        boxSpan: {
            backgroundColor: '#fce4ec',
            paddingTop: '20px',
            paddingBottom: '20px'
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur neque augue, imperdiet at tortor at, malesuada convallis felis. <span className={classes.span}>Morbi viverra enim eget porta suscipit. Praesent vulputate egestas purus sit amet vulputate.</span> Mauris id suscipit neque, id pulvinar lorem.
                    </Typography>
                </Grid>
                <Grid item md={4} m='auto'>
                    <Typography variant='subtitle1'>
                        Vivamus lacinia orci ipsum, at vehicula risus euismod a. Curabitur venenatis ultrices tortor, in tempus quam vehicula eu.
                    </Typography>
                </Grid>
                <Grid item md={4} m='auto'>
                    <Typography variant='subtitle1'>
                        Suspendisse ultrices ligula lacus, eget porttitor ligula placerat a.<span className={classes.span}>Vivamus pretium eget odio vel aliquam.</span>
                    </Typography>
                </Grid>
            </Grid>
            <Box m='auto' className={classes.boxSpan}>
                <Typography m='auto' variant='subtitle1' color='#263238'>Vous êtes nouveau sur le site ?</Typography>
                <Button href="/signup">Inscrivez-vous !
                </Button>
            </Box>
            <Footer />
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