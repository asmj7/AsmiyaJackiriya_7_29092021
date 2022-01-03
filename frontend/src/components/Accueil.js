import React, { useCallback, useEffect, useState } from "react";
import './css/accueil.css';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getPosts, deleteOnePost } from "../redux/actions/userActions";

function Home(props) {

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    const userId = loggedInUser && loggedInUser.user.data ? loggedInUser.user.data.userId : null;

    const post = useSelector((state) => state.post.posts)

    const isAdmin = loggedInUser.user.data.isAdmin

    const dispatch = useDispatch();
    let history = useHistory();
    const useStyles = makeStyles({
        postContainer: {
            border: "1.5px solid #BCBCBC",
            height: "fit-content",
            borderRadius: "25px",
            maxWidth: 500,
            minWidth: 250,
            margin: "auto",
            marginTop: '30px'
        },
        postBox: {
            cursor: 'pointer'
        },
        iconBox: {
            cursor: 'pointer',
            fontSize: '20px',
            color: '#23394D',
            p: '20px',
        },
        deleteBox: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        thumbUp: {
            padding: '20px',
            display: 'flex',
            color: '#9DA8B2',
            cursor: 'pointer',
            alignItems: 'end',
            columnGap: '7px'
        },
        userName: {
            cursor: 'pointer',
            fontWeight: '700',
            padding: '20px',
            display: 'flex',
        }
    })

    // Récupérer les posts
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, props.loggedInUser]);

    // Supprimer un post
    const deletePost = useCallback((id) => {
        console.log(id);
        dispatch(deleteOnePost(id));
        dispatch(getPosts())
    }, [dispatch, post])

    const classes = useStyles();

    return (
        <>
            <Container display="flex"
                justifycontent="center"
                alignitems="center" xs={6} className="home">
                {post?.map((val, key) => (
                        <Box className={classes.postContainer} key={val.id} >
                            <Box className={classes.deleteBox}>
                                {/* {uploads && uploads.user && */}
                                <Box className={classes.userName} onClick={() => history.push(`/profile/${val.user.id}`)}>
                                    {val.user.firstName} {val.user.lastName}
                                </Box>
                                {/* } */}
                                {userId == val.userId || isAdmin ? (
                                    <Box className={classes.iconBox} onClick={() => deletePost(val.id)}>
                                        <HighlightOffIcon sx={{ p: '20px' }} />
                                    </Box>) : (false)
                                }
                            </Box>
                            <Box className={classes.postBox} onClick={() => history.push(`/post/${val.id}`)}>
                                <h2 className="title">{val.title}</h2>
                                <div className="content">
                                    <div className="description">
                                        {val.content}
                                    </div>
                                </div>
                                {val.imageUrl ? (
                                    <div className="imgContainer">
                                        <img className="image" maxwidth="xs" src={val.imageUrl} alt="img"></img>
                                    </div>
                                ) : (false)}
                            </Box>
                            <Box display='flex' alignItems='end'>
                                <Box color='#828286' height='fit-content' p='20px'>{val.createdAt}</Box>
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

            <Grid container mt={6} rowGap={5} mb='30px' columnGap={3} mt={0}>
                <Grid item md={7}>
                    <Typography variant='h1' fontSize='40px' fontWeight='medium' color='#e81f63'>Communication interne</Typography>
                    <Typography variant='h2' fontSize='40px' m='auto' mt='20px' className={classes.titleTwo}>Communiquer plus directement avec vos collègues</Typography>
                </Grid>
                <Grid item md={4.7}>
                    <img className='social-media-img' src="./assets/social-media.jpg" alt="Social media" />
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
                ) : (
                    <GuestHome />
                )
            }
        </>
    )
}

export default withRouter(HomePage);