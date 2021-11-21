import React, { useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import jwt from "jsonwebtoken";
import './navbar.css';

function Upload() {

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
            console.log("Failed")
        }
    };
    
    return (
        <>
            <div className="upload">
                <h1>Créer une publication</h1>
                <form className="form">
                    <input type="text" placeholder="Titre..." name="title" className="inputTitle" onChange={(e) => setTitle(e.target.value)}></input>
                    <input type="text" placeholder="Quoi de neuf ?" className="inputContent" name="content" onChange={(e) => setContent(e.target.value)}></input>
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}></input>
                    <button type="submit" className="publish" onClick={upload}>Publier</button>
                </form>
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