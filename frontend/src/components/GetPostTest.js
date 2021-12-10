import React, { useEffect, useState } from "react";
import './css/accueil.css';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { TextField, Box, Container, Typography, Link } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


function Home() {

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

    const classes = useStyles();
    const [uploads, setUploads] = useState([]);

    const token = localStorage.getItem("email")

    const config = {
                headers: {
                    "Content-Type": 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }
        

    useEffect(() => {
        Axios.get("http://localhost:3000/api/post/", config)
            .then((response) => {
                console.log(response.data)
                // setUploads(response.data)
                // setPostId(response.data[0].id)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <>
            <Container display="flex"
                justifycontent="center"
                alignitems="center" xs={6} className="home">
                {uploads.map((val, key) => (
                    <Box className={classes.postContainer} key={key}>
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
                                <Box pl='20px' pr='20px' sx={{ display: 'flex', height: '50px' }} justifyContent='space-between' border='1px solid #DEDEDE' borderColor='grey'>
                                    <Box color='#495fdb'><span> </span></Box>
                                    <Box alignSelf='flex-end'>
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
                            />
                            <Button endIcon={<SendIcon />}>Envoyer</Button>
                        </Box>
                    </Box>
                ))}
            </Container>
            {/* <Footer /> */}
        </>
    )
}

export default withRouter(Home)