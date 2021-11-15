import React, { useState } from "react";
import { AxiosRequestConfig } from 'axios';
import Axios from 'axios';
import jwt_decode from "jwt-decode";
import { NtlmClient } from 'axios-ntlm';
import './navbar.css';

function Upload() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")

    // Au click sur "Publier"
    const upload = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("email")
        const userId = jwt_decode(token);

        let credentials: NtlmCredentials = {
            title: title,
            content: content,
            image: image,
            userId: userId
        };
        // console.log("credentials" + credentials)
        let config: AxiosRequestConfig = {
            baseURL: "http://localhost:3000",
            method: "POST",
            headers: {
                Accept: 'application/json',
                Authorization: `token ${token}`,
                credentials: 'include'
            }
        }
        // console.log(config)
        let client = NtlmClient(credentials, config)
        // console.log(client)
        try {
            let resp = client.post("/api/post/upload")
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
                <div className="form">
                    <input type="text" placeholder="Titre..." name="title" className="inputTitle" onChange={(e) => setTitle(e.target.value)}></input>
                    <input type="text" placeholder="Quoi de neuf ?" className="inputContent" name="content" onChange={(e) => setContent(e.target.value)}></input>
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0].name)}></input>
                    <button className="publish" onClick={upload}>Publier</button>
                </div>
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
    //         image: image,
    //         userId: userId
    //     },{headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         Authorization: `Bearer ${token}`,
    //         credentials: 'include'
    //     }})
    // }