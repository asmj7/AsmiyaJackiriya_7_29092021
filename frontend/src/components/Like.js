import React from 'react';
import Axios from 'axios';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { useParams, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Like({post}) {

    const loggedInUser = useSelector((state) => state.loggedInUser.user)
    const userId = loggedInUser.data.userId

    const useStyles = makeStyles({
        thumbUp: {
            padding: '20px',
            display: 'flex',
            color: '#9DA8B2',
            cursor: 'pointer',
            width: 'fit-content'
        }
    })

    const token = localStorage.getItem("email")

    const config = {
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    const likePost = (id) => {
        Axios.post(`http://localhost:3000/api/post/like/${post.id}`,{userId: userId},config)
        .then((response)=> {
            console.log(response);
        })
    }

    const classes = useStyles();

    return (
        <>
            <Box className={classes.thumbUp} onClick={()=> likePost(post.id)}>
                <ThumbUpOutlinedIcon />
            </Box>
        </>

    )
}

export default withRouter(Like)