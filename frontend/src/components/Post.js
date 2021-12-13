import React, { useEffect, useState } from "react";
import './css/accueil.css';
import Axios from 'axios';
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { TextField, Box, Container, Typography, Link } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Footer from "./Footer"

// After auth
function Post({ post }) {

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

    const [comment, setComment] = useState("");
    const token = localStorage.getItem("email")

    const config = {
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    // Créer un commentaire
    const createComment = () => {
        Axios.post("http://localhost:3000/api/comment/create", { postId: post.id, comment: comment }, config)
            .then((response) => {
                console.log(response.config.data);
            })
    }



    const classes = useStyles();

    return (


        <Box className={classes.postContainer}>
            <Box fontWeight='700' p='20px' display='flex' className={classes.userName}>{post.user.firstName}{post.user.lastName}</Box>
            <h2 className="title">{post.title}</h2>
            <div className="content">
                <div className="description">
                    {post.content}
                </div>
            </div>
            <div className="imgContainer">
                <img className="image" maxwidth="xs" src={post.imageUrl} alt="img"></img>
            </div>
            <Box className={classes.showComments}>
                {post.comments.map((val, key) => (
                    <Box pl='20px' pr='20px' sx={{ display: 'flex', height: '50px' }} justifyContent='space-between' border='1px solid #DEDEDE' borderColor='grey' key={key}>
                        <Box color='#495fdb' className={classes.commentUserInfo}>{val.user.firstName}<span> </span>{val.user.lastName}</Box>
                        <Box alignSelf='flex-end'>
                            {val.comment}
                        </Box>
                        <Box sx={{ cursor: 'pointer', height: 'fit-content', fontSize: '20px', color: '#BAC0E1' }}>
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
                <Button onClick={() => createComment()} endIcon={<SendIcon />}>Envoyer</Button>
            </Box>
        </Box>

    )
}

export default Post;
