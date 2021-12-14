import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { TextField, Box, Container, Typography, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Footer from "./Footer"

function Post() {
    let { id } = useParams();

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    const userId = loggedInUser.data.userId

    const [uploads, setUploads] = useState([]);
    // const [userId, setUserId] = useState("");
    const [postData, setPostData] = useState("");
    const [postId, setPostId] = useState("");
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState("");

    const useStyles = makeStyles({
        postContainer: {
            border: "1.5px solid #BCBCBC",
            height: "fit-content",
            borderRadius: "25px",
            maxWidth: 500,
            minWidth: 250,
            margin: "auto",
            marginTop: '50px',
        },
        comment: {
            width: "90%"
        },
        commentBox: {
            width: "90%",
            margin: "auto",
            marginTop: "10px",
            marginBottom: "20px"
        },
        postBoxContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: "90%",
            margin: "auto",
            paddingTop: '20px'
        }
    })

    const token = localStorage.getItem("email");
    console.log(postData.userId);
    console.log(userId);

    const config = {
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    // Récupérer un post
    useEffect(() => {
        Axios.get(`http://localhost:3000/api/post/${id}`, config)
            .then((response) => {
                setUploads(response.data)
                setPostId(response.data.id);
                setPostData(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    // Créer un commentaire
    const createComment = () => {
        Axios.post("http://localhost:3000/api/comment/create",
            { postId: postId, comment: comment }, config)
            .then((response) => {
                console.log(response.config.data);
            })
    }

    // Récupérer un commentaire
    useEffect(() => {
        Axios({
            method: "GET",
            url: `http://localhost:3000/api/comment/${id}`,
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setShowComments(response.data);
                console.log(response.data);
                let array = response.data
                const results = array.filter(obj => {
                    return obj.user.id == userId
                });
                console.log(results)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id]);

    // Supprimer un post
    const deletePost = () => {
        Axios.delete(`http://localhost:3000/api/post/delete/${id}`, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // supprimer un commentaire
    const deleteComment = (id) => {
        Axios.delete(`http://localhost:3000/api/comment/delete/${id}`, config)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // console.log(uploads.user.firstName);
    const classes = useStyles();

    if (!uploads) {
        return <div>loading</div>
    }
    return (
        <>
            <Box className={classes.postContainer}>
                <Box className={classes.postBoxContainer}>
                    {uploads && uploads.user &&
                        <Box fontWeight='700' className={classes.userName}>{uploads.user.firstName}</Box>}
                    {userId == postData.userId ? (
                        <Box sx={{ cursor: 'pointer', height: 'fit-content', fontSize: '20px', color: '#BAC0E1' }} onClick={() => deletePost()}>
                            <HighlightOffIcon />
                        </Box>
                    ) : (false)}
                </Box>
                <h2 className="title">{uploads.title}</h2>
                <div className="content">
                    <div className="description">
                        {uploads.content}
                    </div>
                </div>
                <div className="imgContainer">
                    <img className="image" maxwidth="xs" src={uploads.imageUrl} alt="img"></img>
                </div>
                {showComments ? (
                    showComments.map((val, key) => (
                        <Box className={classes.showComments}>
                            <Box pl='20px' pr='20px' sx={{ display: 'block', border: '1px solid #DEDEDE', borderColor: 'grey' }}>
                                <Box color='#495fdb' className={classes.commentUserInfo}><span>{val.user.firstName} {val.user.lastName}</span></Box>
                                <Box className={classes.postBoxContainer}>
                                    <Box alignSelf='flex-end'>{val.comment}</Box>
                                    {userId == val.user.id &&
                                        <Box sx={{ cursor: 'pointer', fontSize: '20px', color: '#BAC0E1' }} onClick={() => deleteComment(val.id)}>
                                            <HighlightOffIcon />
                                        </Box>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    ))
                ) : false}



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
                    <Button onClick={() => createComment(postId)} endIcon={<SendIcon />}>Envoyer</Button>
                </Box>
            </Box>
        </>
    )
}

export default withRouter(Post)