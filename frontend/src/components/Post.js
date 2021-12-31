import React, { useCallback, useEffect, useState } from "react";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Footer from "./Footer";
import { getPost } from "../redux/actions/userActions";

function Post() {
    let { id } = useParams();

    const post = useSelector((state) => state.post.post)

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    const userId = loggedInUser.user.data.userId

    const isAdmin = loggedInUser.user.data.isAdmin

    const [comment, setComment] = useState([]);
    const disableButton = comment.length === 0;

    const history = useHistory();
    const dispatch = useDispatch();

    const useStyles = makeStyles({
        postContainer: {
            border: "1.5px solid #BCBCBC",
            height: "fit-content",
            borderRadius: "25px",
            maxWidth: 500,
            minWidth: 250,
            margin: "auto",
            marginTop: '50px',
            marginBottom: '50px',
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
        },
        userName: {
            cursor: 'pointer'
        }
    })

    const token = localStorage.getItem("email");

    const config = {
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    // Récupérer un post
    useEffect(() => {
        dispatch(getPost(id));
        
    }, [dispatch, id]);


    // Créer un commentaire
    const createComment = useCallback(() => {
        Axios.post("http://localhost:3000/api/comment/create",
            { postId: id, comment: comment }, config)
            .then((response) => {
                setComment("")
                dispatch(getPost(id))
            })
    }, [id, comment, config])
    
    // Supprimer un post
    const deletePost = useCallback(() => {
        Axios.delete(`http://localhost:3000/api/post/delete/${id}`, config)
            .then((response) => {
                history.push('/')
            })
            .catch((error) => {
                console.log(error);
            })
    }, [config, id, history])

    // supprimer un commentaire
    const deleteComment = useCallback((commentId) => {
        Axios.delete(`http://localhost:3000/api/comment/delete/${commentId}`, config)
            .then((response) => {
                dispatch(getPost(id))
            })
            .catch((error) => {
                console.log(error);
            })
    }, [config, id, dispatch])

    const classes = useStyles();

    if (!post) {
        return <div>loading</div>
    }
    return (
        <>
            <Box className={classes.postContainer}>
                <Box className={classes.postBoxContainer}>
                    {post?.user &&
                        <Box fontWeight='700' className={classes.userName} onClick={() => history.push(`/profile/${post?.user.id}`)}>{post?.user.firstName}{" "}{post?.user.lastName}</Box>
                    }
                    <Box color='#828286'>{post?.createdAt}</Box>
                    {userId == post?.userId || isAdmin ? (
                        <Box sx={{ cursor: 'pointer', height: 'fit-content', fontSize: '20px', color: '#23394D' }} onClick={() => deletePost(post?.id)}>
                            <HighlightOffIcon />
                        </Box>
                    ) : (false)}
                </Box>
                <h2 className="title">{post?.title}</h2>
                <div className="content">
                    <div className="description">
                        {post?.content}
                    </div>
                </div>
                {post?.imageUrl ? (
                    <div className="imgContainer">
                        <img className="image" maxwidth="xs" src={post?.imageUrl} alt="img"></img>
                    </div>
                ) : (false)}
                {post?.comments ? (
                    post?.comments.map((val, key) => (
                        <Box className={classes.post?.comments} key={key}>
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
                    <Button onClick={() => createComment(id)} endIcon={<SendIcon />} disabled={disableButton}>Envoyer</Button>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default withRouter(Post)