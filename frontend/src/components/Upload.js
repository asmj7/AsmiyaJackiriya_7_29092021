import React, { useState } from "react";
import Axios from 'axios';
import './css/navbar.css';
import {
    TextField,
    Button,
    FormControl,
    TextareaAutosize,
    Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';


function Upload() {

    const useStyles = makeStyles({
        inputContent: {
            width: "99%",
            borderRadius: "4px"
        },
        contentContainer: {
            marginTop: "11px",
        }
    })

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    const [message, setMessage] = useState("");
    const disableButton = content.length === 0;

    // Au click sur "Publier"
    const upload = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("email");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("content", content);

        // console.log("credentials" + credentials

        const config = {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        }

        Axios.post("http://localhost:3000/api/post/upload", formData, config)
            .then((response) => {
                console.log(response.data);
                setContent("");
                setImage("");
                setTitle("");
            })
            .catch((error) => { setMessage('Un problème est survenu merci de réessayer plutard') });
    };

    const classes = useStyles();

    return (
        <>
            <div className="upload">
                <h1>Créer une publication</h1>
                <Typography color='red'>{message}</Typography>
                <FormControl className="form">
                    <div>
                        <TextField
                            label="Titre"
                            id="standard-size-small"
                            size="small"
                            variant="standard"
                            type="text"
                            name="title"
                            value={title}
                            sx={{ width: '100%' }}
                            placeholder="Titre..."
                            onChange={(e) => setTitle(e.target.value)}
                            className="inputTitle"
                        />
                    </div>
                    <div className={classes.contentContainer}>
                        <TextareaAutosize
                            label="Contenu"
                            id="standard-size-small"
                            required='true'
                            size="small"
                            variant="standard"
                            type="text"
                            minRows={5}
                            name="content"
                            value={content}
                            placeholder="Quoi de neuf ?"
                            onChange={(e) => setContent(e.target.value)}
                            className={classes.inputContent}
                        />
                    </div>
                    <input accept="image/*" id="imgInp" type="file" name="image" onChange={(e) => setImage(e.target.files[0])}></input>
                    <Button type="submit" className="publish" variant="contained" onClick={upload} sx={{ mt: 2.5 }} disabled={disableButton}>Publier</Button>
                </FormControl>
            </div>
        </>
    )
}

export default Upload;