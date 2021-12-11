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

    const [uploads, setUploads] = useState([]);
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
            cursor: 'pointer'
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
    })

    const token = localStorage.getItem("email")

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
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    // Créer un commentaire
    const createComment = () => {
        Axios.post("http://localhost:3000/api/comment/create", { postId: postId, comment: comment }, config)
            .then((response) => {
                console.log(response.data);
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
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id]);

    console.log(uploads.user);

    const classes = useStyles();

    return (
        <>
            <Box className={classes.postContainer}>
                <Box fontWeight='700' p='20px' display='flex' className={classes.userName}>{uploads.firstName}{uploads.lastName}</Box>
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
                     <Box pl='20px' pr='20px' sx={{ display: 'flex', height: '50px' }} justifyContent='space-between' border='1px solid #DEDEDE' borderColor='grey'>
                         <Box color='#495fdb' className={classes.commentUserInfo}><span> </span></Box>
                         <Box alignSelf='flex-end'>{val.comment}</Box>
                         <Box sx={{ cursor: 'pointer', height: 'fit-content', fontSize: '20px', color: '#BAC0E1' }}>
                             <HighlightOffIcon />
                         </Box>
                     </Box>
                 </Box>
                 ))
                ): false}
                
                 

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