import React, { useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import './css/navbar.css';
import {
    Typography,
    TextField,
    Button,
    FormControl,
    TextareaAutosize
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { borderRadius } from "@mui/system";


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

    // Au click sur "Publier"
    const upload = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("email");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("content", content);

        // console.log("credentials" + credentials)
        let config: AxiosRequestConfig = {
            baseURL: "http://localhost:3000",
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        }

        try {
            let resp = axios.post(`/api/post/upload`, formData, config);
            console.log(resp);
        }
        catch (err) {
            console.log(err)
        }
    };

    const classes = useStyles();

    return (
        <>
            <div className="upload">
                <h1>Créer une publication</h1>
                <FormControl className="form">
                    <div>
                        <TextField
                            label="Titre"
                            id="standard-size-small"
                            size="small"
                            variant="standard"
                            type="text"
                            name="title"
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
                            size="small"
                            variant="standard"
                            type="text"
                            minRows={5}
                            name="content"
                            placeholder="Quoi de neuf ?"
                            onChange={(e) => setContent(e.target.value)}
                            className={classes.inputContent}
                        />
                    </div>
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}></input>
                    <Button type="submit" className="publish" variant="contained" onClick={upload} sx={{ mt: 2.5 }}>Publier</Button>
                </FormControl>
            </div>
        </>
    )
}

export default Upload;

// const upload = (e) => {
    //     e.preventDefault()
    //     const token = localStorage.getItem("email")
    //     var userId = jwt_decode(token);
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `token ${token}`
    //         }
    //     };
    //     // const config = {
    //     //     headers: {
    //     //         // 'Content-Type': 'application/json',
    //     //         // 'Accept': 'application/json',
    //     //         // 'Access-Control-Allow-Credentials': false,
    //     //         'Authorization': `token ${token}`,
    //     //         'withCredentials' :true
    //     //     }
    //     // }
    //     // Axios.post("http://localhost:3000/api/post/upload", config, {
    //     //     title: title,
    //     //     content: content,
    //     //     image: image,
    //     //     userId: userId
    //     // })
    //     Axios("http://localhost:3000/api/post/upload",{
    //         title: title,
    //         content: content,
    //         imageUrl: imageUrl,
    //         userId: userId
    //     },{headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         Authorization: `Bearer ${token}`,
    //         credentials: 'include'
    //     }})
    // }